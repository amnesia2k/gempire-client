import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Macondo } from "next/font/google";

const macondo = Macondo({
  weight: "400",
  subsets: ["latin"],
});

export default function Footer() {
  return (
    <footer className="px-4 pb-5 lg:px-8">
      <div className="grid grid-cols-1 gap-5 pb-3 md:grid-cols-4">
        {/* Column 1: About */}
        <div className="flex flex-col space-y-5 md:col-span-2">
          <Link href="/" className={`text-3xl font-bold ${macondo.className}`}>
            Gempire
          </Link>
          <p className="max-w-md">
            Where scent meets identity. We handpick standout fragrances that
            express you; bold, soft, or somewhere in between. Scents that linger
            long after you’ve left the room.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-2">
          <h4 className="text-lg font-bold">Explore</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="hover:text-primary transition-colors hover:underline"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-primary transition-colors hover:underline"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors hover:underline"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social */}
        <div className="space-y-2">
          <h4 className="text-lg font-bold">Follow Us</h4>
          <div className="flex space-x-4">
            <Link
              href="#"
              aria-label="Facebook"
              className="hover:text-primary transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="hover:text-primary transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="hover:text-primary transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-border flex flex-col items-center justify-between border-t pt-5 text-sm md:flex-row">
        <p>&copy; {new Date().getFullYear()} Gempire. All rights reserved.</p>
        <div className="mt-4 flex space-x-4 md:mt-0">
          <Link
            href="/privacy-policy"
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link href="/tos" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
