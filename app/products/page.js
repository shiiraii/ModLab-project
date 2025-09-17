import Image from "next/image";
import AddToCartButton from "../../components/AddToCartButton";
import { formatPrice } from "../../lib/products/data";

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

function FeatureBadge({ index }) {
  return (
    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white text-sm font-semibold">
      {index.toString().padStart(2, "0")}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold">ModLab</h1>
          <p className="mt-3 text-sm md:text-base text-neutral-300">
            We offer products for improving mouse performance and feel.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* Featured Products */}
        <section className="py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">PTFE Skates - $10.99</h2>
            <p className="mt-3 text-neutral-600">
              Durable skates designed for smooth, frictionless movement on any mouse pad.
              Compatible with most gaming mice.
            </p>
            <div className="mt-4">
              <AddToCartButton id="ptfe-skates" label={`Add To Cart (${formatPrice(1099)})`} />
            </div>
          </div>
          <div className="order-first md:order-none">
            <div className="relative aspect-square rounded-md border overflow-hidden bg-neutral-200">
              <Image
                src="/images/PTFE-skates.jpg"
                alt="Close-up of PTFE skate replacements for gaming mouse"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 24rem, 100vw"
              />
            </div>
          </div>

          <div className="md:hidden h-0" />

          <div className="md:col-start-2">
            <h2 className="text-xl md:text-2xl font-semibold">Glass Skates - $14.99</h2>
            <p className="mt-3 text-neutral-600">
              Premium glass skates for maximum glide and long-lasting durability.
            </p>
            <div className="mt-4">
              <AddToCartButton id="glass-skates" label={`Add To Cart (${formatPrice(1499)})`} />
            </div>
          </div>
          <div>
            <div className="placeholder-box rounded-md border aspect-square">
              <span className="relative z-10">PLACEHOLDER</span>
            </div>
          </div>
        </section>

        {/* Other Products */}
        <section className="py-8">
          <h2 className="text-2xl font-semibold">Other Products</h2>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <article className="lg:col-span-2">
              <div className="relative aspect-[4/3] rounded-md border overflow-hidden bg-neutral-200">
                <Image
                  src="/images/grip-tape.jpg"
                  alt="Grip tape accessories laid out on a desk"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40rem, 100vw"
                />
              </div>
              <div className="mt-3">
                <h3 className="font-semibold">Grip Tape Set - $7.99</h3>
                <p className="text-sm text-neutral-600">
                  Anti-slip textured grip tape to give you better control and comfort during long
                  gaming sessions.
                </p>
              </div>
            </article>
            <div className="space-y-6">
              <article className="grid grid-cols-3 gap-4 items-center">
                <div className="col-span-1">
                  <div className="relative aspect-[4/3] rounded-md border overflow-hidden bg-neutral-200">
                    <Image
                      src="/images/After-Paracord.jpg"
                      alt="Paracord mouse cable coiled neatly"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 12rem, 100vw"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <h3 className="font-semibold">Paracord Mouse Cable - $12.99</h3>
                  <p className="text-sm text-neutral-600">
                    Ultra-flexible, lightweight paracord cable that eliminates cable drag. Available in
                    multiple colors.
                  </p>
                  <div className="mt-2">
                    <AddToCartButton id="paracord-cable" label={`Add To Cart (${formatPrice(1299)})`} />
                  </div>
                </div>
              </article>
              <article className="grid grid-cols-3 gap-4 items-center">
                <div className="col-span-1">
                  <div className="relative aspect-[4/3] rounded-md border overflow-hidden bg-neutral-200">
                    <Image
                      src="/images/4k-8k-wireless-dongle.jpg"
                      alt="4K/8K wireless dongle displayed on desk"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 12rem, 100vw"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <h3 className="font-semibold">4K/8K Wireless Dongle - $24.99</h3>
                  <p className="text-sm text-neutral-600">
                    Upgrade your mouse to the latest wireless technology with ultra-low latency polling rates.
                  </p>
                  <div className="mt-2">
                    <AddToCartButton id="wireless-dongle" label={`Add To Cart (${formatPrice(2499)})`} />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12">
          <h2 className="text-2xl font-semibold">Why ModLab</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            {FEATURE_ITEMS.map((feature, index) => (
              <div key={feature.title}>
                <FeatureBadge index={index + 1} />
                <div className="font-medium">{feature.title}</div>
                <p className="mt-2 text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}