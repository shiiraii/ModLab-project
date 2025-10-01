'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ImageCarousel from "../components/ImageCarousel";
import BeforeAfterSlider from "../components/BeforeAfterSlider";

const PARACORD_SLIDES = [
  {
    src: "/images/ViperMiniParacordBefore.jpg",
    alt: "Viper Mini mouse before paracord cable upgrade",
    label: "Before",
  },
  {
    src: "/images/ViperMiniParacordAfter.jpg",
    alt: "Viper Mini mouse after paracord cable upgrade",
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

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <motion.div variants={heroVariants} initial="hidden" animate="show" className="space-y-5 text-center md:text-left">
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs uppercase tracking-wide text-neutral-500">
              Premium mouse modification studio
            </span>
            <h1 className="text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl md:text-5xl">
              Build a mouse that feels made for you
            </h1>
            <p className="text-sm text-neutral-600 sm:text-base">
              ModLab customizes gaming mice with professional switch tuning, paracord upgrades, and hand-finished accessories so every click feels dialed in.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row md:justify-start">
              <Link
                href="/book"
                className="w-full sm:w-auto rounded-md bg-black px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                Book a Mod Session
              </Link>
              <Link
                href="/products"
                className="w-full sm:w-auto rounded-md border border-neutral-200 px-6 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
              >
                Shop Accessories
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-neutral-200 shadow-sm"
          >
            <Image
              src="/images/homepage-hero.jpg"
              alt="Custom-modded wireless gaming mouse resting on a wooden desk"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-10">
        <div className="grid gap-6 md:grid-cols-[minmax(0,360px)_1fr] md:items-center">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">See the difference a ModLab paracord makes</h2>
            <p className="text-sm text-neutral-600">
              Drag the handle to compare the stiffness of a stock cable with our ultra-flexible paracord upgrade. Every mod is hand-sleeved and tuned for minimal resistance.
            </p>
          </div>
          <BeforeAfterSlider
            before={{ src: "/images/ViperMiniParacordBefore.jpg", alt: "Mouse before paracord cable upgrade" }}
            after={{ src: "/images/ViperMiniParacordAfter.jpg", alt: "Mouse after paracord cable upgrade" }}
          />
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-10">
        <h2 className="text-xl font-semibold mb-4">Featured Services</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Card 1 */}
          <motion.article
            whileHover={{ translateY: -4, boxShadow: "0px 12px 32px rgba(15,15,15,0.08)" }}
            className="bg-white rounded-md border overflow-hidden transition"
          >
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
                We remove unnecessary shell weight for quicker flicks without compromising structure.
              </p>
            </div>
          </motion.article>

          {/* Card 2 */}
          <motion.article
            whileHover={{ translateY: -4, boxShadow: "0px 12px 32px rgba(15,15,15,0.08)" }}
            className="bg-white rounded-md border overflow-hidden transition"
          >
            <ImageCarousel
              images={PARACORD_SLIDES}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 20rem, (min-width: 768px) 50vw, 100vw"
            />
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1">Paracord Cable Upgrades</h3>
              <p className="text-sm text-neutral-600">
                Swap your stiff stock cable for an ultra-flexible paracord designed for drag-free movement.
              </p>
            </div>
          </motion.article>

          {/* Card 3 */}
          <motion.article
            whileHover={{ translateY: -4, boxShadow: "0px 12px 32px rgba(15,15,15,0.08)" }}
            className="bg-white rounded-md border overflow-hidden transition"
          >
            <ImageCarousel
              images={WIRELESS_SLIDES}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 20rem, (min-width: 768px) 50vw, 100vw"
            />
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1">Cable to Wireless Conversion</h3>
              <p className="text-sm text-neutral-600">
                Convert your favorite shell to wireless with a tuned battery and precision internal fit.
              </p>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Shop Accessories */}
      <section className="py-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
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
              <div className="font-semibold text-sm">4K/8K Wireless Dongles</div>
              <p className="text-sm text-neutral-600">
                Future-proof your setup with low-latency dongles for polling rates up to 8000Hz.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="rounded-md bg-black px-4 py-2 text-center text-sm font-medium text-white hover:bg-neutral-800">
                Browse the catalog
              </Link>
              <Link href="/cart" className="rounded-md border border-neutral-200 px-4 py-2 text-center text-sm font-medium hover:bg-neutral-50">
                View your cart
              </Link>
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
      <section className="py-10">
        <h2 className="text-xl font-semibold mb-4">Book a Mod Appointment</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                Upgrade the performance of your mouse with brand-new switches, desoldered and tuned in house for your preferred tactility.
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
                We carefully trim internal plastic and reinforce key areas so you keep balance while shedding grams where it counts.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}