import Image from "next/image";
import ImageCarousel from "../components/ImageCarousel";

const PARACORD_SLIDES = [
  {
    src: "/images/Before-Paracord.jpg",
    alt: "Mouse with stock cable before paracord upgrade",
    label: "Before",
  },
  {
    src: "/images/After-Paracord.jpg",
    alt: "Mouse with flexible paracord cable after upgrade",
    label: "After",
  },
];

const WIRELESS_SLIDES = [
  {
    src: "/images/Before-WirelessConversion.jpg",
    alt: "Mouse before wireless conversion upgrade",
    label: "Before",
  },
  {
    src: "/images/After-WirelessConversion.jpg",
    alt: "Mouse converted to wireless with clean exterior",
    label: "After",
  },
  {
    src: "/images/After-WirelessConversion-Open.jpg",
    alt: "Interior view of the wireless conversion showing installed components",
    label: "Inside",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="py-8 md:py-10">
        <div className="text-center mb-4 text-sm text-neutral-600">
          ModLab: Custom Mouse Mods & Accessories
        </div>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border">
          <Image
            src="/images/homepage-hero.jpg"
            alt="Custom-modded wireless gaming mouse resting on a wooden desk"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-6">
        <h2 className="text-xl font-semibold mb-4">Featured Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <article className="bg-white rounded-md border overflow-hidden transition hover:-translate-y-0.5 hover:shadow-sm">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
              <Image
                src="/images/weight-reduction.jpg"
                alt="Hollowed-out mouse shell showing weight reduction mod"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 20rem, (min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1">Weight Reduction</h3>
              <p className="text-sm text-neutral-600">
                We reduce unnecessary weight in your mouse body for faster, smoother aim without
                sacrificing durability.
              </p>
            </div>
          </article>

          {/* Card 2 */}
          <article className="bg-white rounded-md border overflow-hidden transition hover:-translate-y-0.5 hover:shadow-sm">
            <ImageCarousel
              images={PARACORD_SLIDES}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 20rem, (min-width: 768px) 50vw, 100vw"
            />
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1">Paracord Cable Upgrades</h3>
              <p className="text-sm text-neutral-600">
                Swap your stiff stock cable for an ultra-flexible paracord, designed for drag-free movement.
              </p>
            </div>
          </article>

          {/* Card 3 */}
          <article className="bg-white rounded-md border overflow-hidden transition hover:-translate-y-0.5 hover:shadow-sm">
            <ImageCarousel
              images={WIRELESS_SLIDES}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 20rem, (min-width: 768px) 50vw, 100vw"
            />
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1">Cable to Wireless Mod (Custom Order)</h3>
              <p className="text-sm text-neutral-600">
                Turn your wired mouse into a wireless one with our custom conversion kit and long-lasting battery.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Shop Accessories */}
      <section className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shop Accessories</h2>

          <div className="space-y-5">
            <div>
              <div className="font-semibold text-sm">PTFE and Glass Skates</div>
              <p className="text-sm text-neutral-600">
                Upgrade your glide with ultra-smooth PTFE or glass skates designed for precision and durability.
              </p>
            </div>

            <div>
              <div className="font-semibold text-sm">Grip Tape</div>
              <p className="text-sm text-neutral-600">
                Add comfort and control with high-quality grip tape. Multiple textures to match your playstyle.
              </p>
            </div>

            <div>
              <div className="font-semibold text-sm">4k/8k Wireless Dongles</div>
              <p className="text-sm text-neutral-600">
                Future-proof your setup with low-latency dongles for polling rates up to 8000Hz.
              </p>
            </div>

            <div className="flex gap-3">
              <a href="/products" className="rounded-md bg-black text-white text-xs px-3 py-2 hover:bg-neutral-800">
                Button
              </a>
              <a href="/products" className="rounded-md border text-xs px-3 py-2 hover:bg-neutral-50">
                Secondary button
              </a>
            </div>
          </div>
        </div>

        {/* Accessories image */}
        <div className="relative aspect-[4/5] rounded-md border overflow-hidden">
          <Image
            src="/images/various-accesories.jpg"
            alt="Selection of ModLab accessories including skates, grip tape, and cables"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 24rem, 100vw"
          />
        </div>
      </section>

      {/* Book a Mod Appointment */}
      <section className="py-8">
        <h2 className="text-xl font-semibold mb-4">Book a Mod Appointment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A */}
          <article className="bg-white rounded-md border overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
              <Image
                src="/images/switch-replacement.jpg"
                alt="Top-down view of a custom mouse after switch replacement service"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1">Switch Replacement Service</h3>
              <p className="text-sm text-neutral-600">
                Upgrade the performance of your mouse with brand-new switches. We carefully desolder
                and install high-quality parts for improved responsiveness and feel.
              </p>
            </div>
          </article>

          {/* Card B */}
          <article className="bg-white rounded-md border overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
              <Image
                src="/images/weight-reduction.jpg"
                alt="Hollowed-out mouse shell showing weight reduction mod"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1">Weight Reduction Mod</h3>
              <p className="text-sm text-neutral-600">
                Get faster aim and lighter handling. The mod removes excess shell plastic while
                maintaining durability, reducing grams where it counts.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}