"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import AddToCartButton from "../../../components/AddToCartButton";
import { useProductCatalog } from "../../../lib/products/catalog";
import { formatPrice } from "../../../lib/products/data";

function StockBadge({ stock }) {
  if (typeof stock !== "number") return null;
  if (stock <= 0) return <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">Sold out</span>;
  if (stock <= 5) return <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">Only {stock} left</span>;
  return <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">In stock: {stock}</span>;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.id;
  const { productMap, loading, source } = useProductCatalog();
  const product = useMemo(() => (slug ? productMap.get(slug) ?? null : null), [productMap, slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="h-6 w-40 animate-pulse rounded bg-neutral-200" />
        <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="aspect-square rounded-lg bg-neutral-200" />
          <div className="space-y-3">
            <div className="h-4 w-1/2 rounded bg-neutral-200" />
            <div className="h-4 w-2/3 rounded bg-neutral-200" />
            <div className="h-10 w-40 rounded bg-neutral-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="mt-2 text-sm text-neutral-600">
          We couldn&apos;t find that product. Return to the <Link className="underline" href="/products">products catalog</Link>.
        </p>
      </div>
    );
  }

  const hasStock = typeof product.stock === "number";
  const soldOut = hasStock && product.stock <= 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/products" className="text-sm text-neutral-600 underline">
        ← Back to products
      </Link>
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(min-width: 768px) 32rem, 100vw" />
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-semibold text-neutral-900">{product.name}</h1>
            <div className="mt-1 text-sm text-neutral-500">{product.category}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-2xl font-semibold">{formatPrice(product.price)}</div>
            <StockBadge stock={product.stock} />
            {source === "fallback" && <span className="text-xs text-neutral-500">(Demo inventory)</span>}
          </div>
          <p className="text-neutral-700 leading-relaxed">{product.description}</p>
          <div className="rounded-md bg-neutral-50 p-4 text-sm text-neutral-700">
            <div className="font-medium text-neutral-900">What&apos;s included</div>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Quality-checked parts ready to install</li>
              <li>Support from our modding team for fitment questions</li>
              <li>Fast shipping from our Texas workshop</li>
            </ul>
          </div>
          <AddToCartButton id={product.id} label={soldOut ? "Sold Out" : `Add to Cart (${formatPrice(product.price)})`} disabled={soldOut} />
        </div>
      </div>
    </div>
  );
}
