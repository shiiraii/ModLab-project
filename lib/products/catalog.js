"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabase } from "../supabase/client";
import { FALLBACK_PRODUCTS } from "./data";

const META_MAP = new Map(FALLBACK_PRODUCTS.map((product) => [product.id, product]));
let cachedProducts = null;
let cachedSource = "fallback";
let pendingRequest = null;

function mergeWithMeta(row) {
  const meta = META_MAP.get(row.slug) ?? {};
  const price = Number.isFinite(row.price_cents) ? row.price_cents : meta.price ?? 0;
  const stock = Number.isFinite(row.stock) ? row.stock : meta.stock ?? 0;
  return {
    id: row.slug,
    name: row.name ?? meta.name ?? row.slug,
    description: row.description ?? meta.description ?? "",
    price,
    stock,
    category: row.category ?? meta.category ?? "accessories",
    highlight: row.highlight ?? meta.highlight ?? null,
    image: row.image_path ?? meta.image ?? "/images/product-placeholder.jpg",
    active: row.active ?? true,
  };
}

async function loadFromSupabase() {
  if (cachedProducts && cachedSource === "supabase") return cachedProducts;
  if (pendingRequest) return pendingRequest;

  const supabase = getSupabase();
  if (!supabase) {
    cachedProducts = FALLBACK_PRODUCTS;
    cachedSource = "fallback";
    return cachedProducts;
  }

  pendingRequest = supabase
    .from("products")
    .select("slug, name, description, price_cents, stock, category, highlight, image_path, active")
    .order("name", { ascending: true })
    .then(({ data, error }) => {
      pendingRequest = null;
      if (error || !data) {
        console.warn("Supabase products query failed; using fallback data.", error);
        cachedProducts = FALLBACK_PRODUCTS;
        cachedSource = "fallback";
        return cachedProducts;
      }
      const hydrated = data
        .filter((row) => row.active ?? true)
        .map(mergeWithMeta)
        .filter((product) => product.active);
      cachedProducts = hydrated.length > 0 ? hydrated : FALLBACK_PRODUCTS;
      cachedSource = hydrated.length > 0 ? "supabase" : "fallback";
      return cachedProducts;
    })
    .catch((error) => {
      console.warn("Supabase products query threw; using fallback data.", error);
      cachedProducts = FALLBACK_PRODUCTS;
      cachedSource = "fallback";
      pendingRequest = null;
      return cachedProducts;
    });

  return pendingRequest;
}

export function useProductCatalog() {
  const [state, setState] = useState(() => ({
    products: cachedProducts ?? FALLBACK_PRODUCTS,
    loading: !cachedProducts,
    source: cachedSource,
    error: null,
  }));

  useEffect(() => {
    let cancelled = false;
    loadFromSupabase().then((products) => {
      if (cancelled) return;
      const isFallback = cachedSource === "fallback" && products === FALLBACK_PRODUCTS;
      setState({
        products,
        loading: false,
        source: cachedSource,
        error: isFallback ? "Supabase product catalog unavailable; using fallback data." : null,
      });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const map = useMemo(() => {
    return new Map(state.products.map((product) => [product.id, product]));
  }, [state.products]);

  return {
    products: state.products,
    loading: state.loading,
    source: state.source,
    error: state.error,
    productMap: map,
  };
}

export function getProductById(productMap, id) {
  return productMap.get(id) ?? META_MAP.get(id) ?? null;
}
