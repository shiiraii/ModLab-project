'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AddToCartButton from "../../components/AddToCartButton";
import { formatPrice } from "../../lib/products/data";
import { useProductCatalog } from "../../lib/products/catalog";

const FEATURE_ITEMS = [
  {
    title: "Free U.S. Shipping",
    description: "Get free standard shipping on all orders over $25. Fast delivery straight to your setup.",
  },
  {
    title: "Expert Craftsmanship",
    description: "Every mod and accessory is tested by hand to ensure top performance and reliability.",
  },
  {
    title: "Secure Checkout",
    description: "All purchases are processed with encrypted payment methods to keep your information safe.",
  },
  {
    title: "Book Online Anytime",
    description: "Easily schedule your mod appointments online at a time that works for you.",
  },
];

function titleCase(text) {
  return text
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function FilterPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm transition ${
        active ? "border-black bg-black text-white" : "border-neutral-300 text-neutral-700 hover:border-black/50"
      }`}
    >
      {label}
    </button>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-neutral-200 bg-white">
      <div className="aspect-square bg-neutral-200" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-2/3 rounded bg-neutral-200" />
        <div className="h-3 w-full rounded bg-neutral-200" />
        <div className="h-8 w-1/2 rounded bg-neutral-300" />
      </div>
    </div>
  );
}

function StockBadge({ stock }) {
  if (typeof stock !== "number") return null;
  if (stock <= 0) {
    return <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">Sold out</span>;
  }
  if (stock <= 5) {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
        Only {stock} left
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
      In stock: {stock}
    </span>
  );
}

function ProductCard({ product }) {
  const hasStock = typeof product.stock === "number";
  const soldOut = hasStock && product.stock <= 0;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 16rem, (min-width: 768px) 33vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">{product.name}</h3>
            <p className="mt-1 text-sm text-neutral-600">{product.description}</p>
          </div>
          <div className="text-sm font-semibold text-neutral-900">{formatPrice(product.price)}</div>
        </div>
        <div className="mt-4 flex-1">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <div>{product.category ? titleCase(product.category) : "Accessory"}</div>
            <StockBadge stock={product.stock} />
          </div>
        </div>
        <div className="mt-4">
          <AddToCartButton
            id={product.id}
            label={soldOut ? "Sold Out" : `Add To Cart (${formatPrice(product.price)})`}
            className="w-full justify-center"
            disabled={soldOut}
          />
        </div>
      </div>
    </motion.article>
  );
}

function HeroProduct({ product, delay = 0 }) {
  if (!product) return <div className="h-40 animate-pulse rounded-lg border border-white/10 bg-white/10" />;
  const hasStock = typeof product.stock === "number";
  const soldOut = hasStock && product.stock <= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative h-32 w-full overflow-hidden rounded md:w-40">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(min-width: 768px) 10rem, 100vw" />
        </div>
        <div className="space-y-2 text-left">
          <div className="text-sm uppercase tracking-wide text-neutral-300">Featured</div>
          <h2 className="text-xl font-semibold text-white">{product.name}</h2>
          <p className="text-sm text-neutral-300">{product.description}</p>
          <div className="flex items-center gap-2 text-xs text-neutral-200">
            <StockBadge stock={product.stock} />
            <span>{formatPrice(product.price)}</span>
          </div>
          <AddToCartButton
            id={product.id}
            label={soldOut ? "Sold Out" : `Add (${formatPrice(product.price)})`}
            disabled={soldOut}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductsPage() {
  const { products, loading, source } = useProductCatalog();
  const [filter, setFilter] = useState("all");

  const filters = useMemo(() => {
    const byCategory = new Map();
    products.forEach((product) => {
      if (!product.category) return;
      byCategory.set(product.category, titleCase(product.category));
    });
    return [
      { id: "all", label: "All" },
      ...Array.from(byCategory, ([id, label]) => ({ id, label })),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((item) => item.category === filter);
  }, [products, filter]);

  const heroPrimary = useMemo(() => {
    return products.find((item) => item.highlight === "primary") ?? products[0] ?? null;
  }, [products]);

  const heroSecondary = useMemo(() => {
    return products.find((item) => item.highlight === "secondary") ?? products[1] ?? null;
  }, [products]);

  const isFallback = source === "fallback";

  return (
    <div>
      <section className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          {loading ? (
            <div className="space-y-4">
              <div className="h-8 w-48 animate-pulse rounded bg-white/20" />
              <div className="h-4 w-80 animate-pulse rounded bg-white/10" />
              <div className="h-10 w-36 animate-pulse rounded bg-white/20" />
            </div>
          ) : (
            <div className="text-center md:text-left">
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-3xl font-bold md:text-5xl">
                ModLab Accessories
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mt-3 text-sm md:text-base text-neutral-300">
                Everything you need to dial in your mouse-skates, cables, grips, and high-speed wireless upgrades.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }} className="mt-6 inline-flex gap-3">
                <a href="#shop" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-900">
                  Browse catalog
                </a>
                <a href="/book" className="rounded-md border border-white/40 px-4 py-2 text-sm font-medium text-white">
                  Book a mod
                </a>
              </motion.div>
            </div>
          )}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <HeroProduct product={loading ? null : heroPrimary} />
            <HeroProduct product={loading ? null : heroSecondary} delay={0.05} />
          </div>
          {isFallback && (
            <div className="mt-6 rounded-md border border-white/10 bg-white/5 p-4 text-sm text-neutral-200">
              Live inventory updates appear here once Supabase environment variables are configured.
            </div>
          )}
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">Shop the lineup</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <FilterPill key={item.id} label={item.label} active={filter === item.id} onClick={() => setFilter(item.id)} />
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }, (_, index) => <ProductSkeleton key={`s-${index}`} />)
            : filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          {!loading && filteredProducts.length === 0 && (
            <div className="col-span-full rounded-lg border border-neutral-200 bg-white p-10 text-center text-sm text-neutral-600">
              Nothing to show for this filter yet. Check back soon!
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-semibold">Why ModLab</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 text-sm md:grid-cols-2 lg:grid-cols-4">
          {FEATURE_ITEMS.map((feature, index) => (
            <div key={feature.title} className="rounded-lg border border-neutral-200 bg-white p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                {(index + 1).toString().padStart(2, "0")}
              </div>
              <div className="font-medium text-neutral-900">{feature.title}</div>
              <p className="mt-2 text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
