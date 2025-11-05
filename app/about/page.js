import Image from "next/image";
import ContactForm from "../../components/ContactForm";

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
                At ModLab, we believe every gamer and professional deserves equipment that feels like it was built just for them. Our mission is to provide high-quality
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
                We focus on precision, attention to detail, and customer satisfaction. Whether you are booking a service appointment or purchasing accessories, our goal is to give you a setup that not only works better but feels uniquely yours.
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
        <ContactForm />
      </section>
    </div>
  );
}
