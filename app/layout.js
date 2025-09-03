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
        <header className="bg-white/90 sticky top-0 z-50 border-b">
          <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold">
              ModLab
            </Link>

            {/* Use a nav, not an <a> wrapper */}
            <nav className="hidden sm:flex items-center gap-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/services" className="hover:underline">
                Services
              </Link>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </nav>

            {/* Auth */}
            <Link
              href="/login"
              className="rounded-md bg-black text-white text-xs px-3 py-1.5 hover:bg-neutral-800"
            >
              Sign In/Register
            </Link>
          </div>
        </header>

        <main>{children}</main>

        {/* Footer */}
        <footer className="mt-16 border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div>
              <div className="font-semibold mb-2">ModLab</div>
              <p className="text-neutral-600">Custom mouse mods & accessories.</p>
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
