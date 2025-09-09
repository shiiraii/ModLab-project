import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import Link from "next/link";

export const metadata = {
  title: "ModLab",
  description: "Custom Mouse Mods & Accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-100 text-neutral-900">
        {/* Header / Nav */}
        <SiteHeader />

        <main>{children}</main>

        {/* Footer */}
        <footer className="mt-16 border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div>
              <div className="font-semibold mb-2">ModLab</div>
              <p className="text-neutral-600">Custom mouse mods & accessories.</p>
              {/* Socials */}
              <div className="flex items-center gap-4 mt-4 text-neutral-500">
                <a href="#" aria-label="Facebook" className="hover:text-neutral-700">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.94 8.44-9.94Z"/>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-neutral-700">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.34 18H6V9.64h2.34V18ZM7.17 8.57a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7ZM18 18h-2.33v-4.39c0-1.05-.02-2.4-1.46-2.4-1.46 0-1.68 1.14-1.68 2.33V18H10.2V9.64h2.24v1.15h.03c.31-.59 1.08-1.2 2.22-1.2 2.38 0 2.82 1.56 2.82 3.58V18Z"/>
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" className="hover:text-neutral-700">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M23.5 7.2s-.23-1.64-.95-2.36c-.9-.95-1.9-.95-2.36-1C16.97 3.5 12 3.5 12 3.5h-.01s-4.97 0-8.18.33c-.46.05-1.46.05-2.36 1C.73 5.56.5 7.2.5 7.2S.27 9.09.27 10.98v1.98c0 1.9.23 3.78.23 3.78s.23 1.64.95 2.36c.9.95 2.08.92 2.61 1.03 1.9.18 8 .33 8 .33s4.97-.01 8.18-.34c.46-.05 1.46-.05 2.36-1 .72-.72.95-2.36.95-2.36s.23-1.9.23-3.78v-1.98c0-1.9-.23-3.78-.23-3.78ZM9.75 13.92V7.98l6.07 2.98-6.07 2.96Z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-neutral-700">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5Zm0 9A3.5 3.5 0 1 1 15.5 13 3.5 3.5 0 0 1 12 16.5Zm6.75-10.88a1.12 1.12 0 1 0 1.12 1.12 1.12 1.12 0 0 0-1.12-1.12Z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <div className="font-semibold mb-2">Shop</div>
              <ul className="space-y-1 text-neutral-600">
                <li>
                  <Link href="/services" className="hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:underline">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/book" className="hover:underline">
                    Book Appointment
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold mb-2">Support</div>
              <ul className="space-y-1 text-neutral-600">
                <li>
                  <Link href="/faq" className="hover:underline">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:underline">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="/warranty" className="hover:underline">
                    Warranty
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold mb-2">Company</div>
              <ul className="space-y-1 text-neutral-600">
                <li>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-xs text-neutral-500 border-t py-4 text-center">
            © {new Date().getFullYear()} ModLab
          </div>
        </footer>
      </body>
    </html>
  );
}
