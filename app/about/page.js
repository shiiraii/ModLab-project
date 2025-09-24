import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Intro */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">About ModLab</h1>
          <div className="mt-6 space-y-5 text-neutral-700">
            <div>
              <h3 className="font-semibold">Our Mission</h3>
              <p>
                At ModLab, we believe every gamer and professional deserves equipment that
                feels like it was built just for them. Our mission is to provide high-quality
                mouse modifications and accessories that enhance performance, comfort, and style.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Who I Am</h3>
              <p>
                I have always been curious about what makes technology perform at its best. That curiosity started when I began tinkering with computer hardware, building PCs, and experimenting with modifications to improve performance and comfort. Over time, that same passion led me to focus on custom mouse modifications, from switch replacements to shell trimming and cable upgrades. Every project I take on is a chance to refine equipment so it not only works better but also feels uniquely personal. At ModLab, my goal is to combine careful craftsmanship with technical precision so that every gamer can enjoy gear that enhances their performance, comfort, and style.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Why Choose Us</h3>
              <p>
                We focus on precision, attention to detail, and customer satisfaction. Whether
                you are booking a service appointment or purchasing accessories, our goal is to give
                you a setup that not only works better but feels uniquely yours.
              </p>
            </div>
          </div>
        </div>
        <div className="order-first md:order-none">
          <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-md border bg-neutral-200">
            <Image
              src="/images/FirstGamingMouse (2).jpg"
              alt="The first gaming mouse that inspired the ModLab journey"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 28rem, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Contact / Lead Form */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Contact me</h2>
        <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-700">First name</label>
            <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white" placeholder="Jane" />
          </div>
          <div>
            <label className="block text-sm text-neutral-700">Last name</label>
            <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white" placeholder="Smitherton" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-neutral-700">Email address</label>
            <input type="email" className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white" placeholder="email@janesfakedomain.net" />
          </div>
          {/* Lead capture address fields for project requirement */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-700">Address</label>
              <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white" placeholder="123 Main St" />
            </div>
            <div>
              <label className="block text-sm text-neutral-700">City</label>
              <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white" placeholder="Springfield" />
            </div>
            <div>
              <label className="block text-sm text-neutral-700">State/Province</label>
              <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white" placeholder="CA" />
            </div>
            <div>
              <label className="block text-sm text-neutral-700">ZIP/Postal code</label>
              <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white" placeholder="94016" />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-neutral-700">Your message</label>
            <textarea rows={5} className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white" placeholder="Enter your question or message" />
          </div>
          <div className="md:col-span-2">
            <button className="inline-flex items-center rounded-md bg-black text-white text-sm px-4 py-2 hover:bg-neutral-800">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
