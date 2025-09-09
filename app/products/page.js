export default function ProductsPage() {
  return (
    <div className="">
      {/* Hero */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold">ModLab</h1>
          <p className="mt-3 text-sm md:text-base text-neutral-300">
            We offer products for improving mouse performance and feel
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
              <a href="#" className="inline-flex items-center rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800">
                Add To cart
              </a>
            </div>
          </div>
          <div className="order-first md:order-none">
            <div className="placeholder-box rounded-md border aspect-square">
              <span className="relative z-10">PLACEHOLDER</span>
            </div>
          </div>

          <div className="md:hidden h-0" />

          <div className="md:col-start-2">
            <h2 className="text-xl md:text-2xl font-semibold">Glass Skates - $14.99</h2>
            <p className="mt-3 text-neutral-600">A subheading for this section, as long or as short as you like</p>
            <div className="mt-4">
              <a href="#" className="inline-flex items-center rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800">
                Add To Cart
              </a>
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
              <div className="placeholder-box rounded-md border aspect-[4/3]">
                <span className="relative z-10">PLACEHOLDER</span>
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
                  <div className="placeholder-box rounded-md border aspect-[4/3]"><span className="relative z-10">PLACEHOLDER</span></div>
                </div>
                <div className="col-span-2">
                  <h3 className="font-semibold">Paracord Mouse Cable - $12.99</h3>
                  <p className="text-sm text-neutral-600">
                    Ultra-flexible, lightweight paracord cable that eliminates cable drag. Available in
                    multiple colors.
                  </p>
                </div>
              </article>
              <article className="grid grid-cols-3 gap-4 items-center">
                <div className="col-span-1">
                  <div className="placeholder-box rounded-md border aspect-[4/3]"><span className="relative z-10">PLACEHOLDER</span></div>
                </div>
                <div className="col-span-2">
                  <h3 className="font-semibold">4K/8K Wireless Dongle  - $24.99</h3>
                  <p className="text-sm text-neutral-600">
                    Upgrade your mouse to the latest wireless technology with ultra-low latency polling rates.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12">
          <h2 className="text-2xl font-semibold">Section heading</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <div className="text-2xl">🌐</div>
              <div className="mt-2 font-medium">Free U.S. Shipping</div>
              <p className="text-neutral-600">Get free standard shipping on all orders over $25. Fast delivery straight to your setup.</p>
            </div>
            <div>
              <div className="text-2xl">🧰</div>
              <div className="mt-2 font-medium">Expert Craftsmanship</div>
              <p className="text-neutral-600">Every mod and accessory is tested by hand to ensure top performance and reliability.</p>
            </div>
            <div>
              <div className="text-2xl">🔒</div>
              <div className="mt-2 font-medium">Secure Checkout</div>
              <p className="text-neutral-600">All purchases are processed with encrypted payment methods to keep your information safe.</p>
            </div>
            <div>
              <div className="text-2xl">📅</div>
              <div className="mt-2 font-medium">Book Online Anytime</div>
              <p className="text-neutral-600">Easily schedule your mod appointments online at a time that works for you.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

