"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// ✅ React Icons
import { SiGmail, SiInstagram, SiTiktok, SiWhatsapp } from "react-icons/si";
import { Macondo } from "next/font/google";

const macondo = Macondo({
  weight: "400",
  subsets: ["latin"],
});

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/tos" },
];

// ✨ React Icons-based socials
const socialLinks = [
  // { label: "Facebook", icon: FaFacebookF, color: "#1877F2" },
  {
    label: "Instagram",
    icon: SiInstagram,
    color: "#E4405F",
    link: "https://www.instagram.com/_gempire?igsh=d252dGtwNGQ2YjYx&utm_source=qr",
  },

  // { label: "X", icon: FaXTwitter, color: "#000000" },
  {
    label: "WhatsApp",
    icon: SiWhatsapp,
    color: "#25D366",
    link: "https://wa.me/2348133769036",
  },

  {
    label: "TikTok",
    icon: SiTiktok,
    color: "#010101",
    link: "https://www.tiktok.com/@ovieeee3?_t=ZM-8y8Z6xXDvBl&_r=1",
  },

  {
    label: "Email",
    icon: SiGmail,
    color: "#FF0000",
    link: "mailto:graceovie06@gmail.com",
  },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="px-4 py-5 lg:px-8">
      <div className="grid grid-cols-1 gap-5 pb-5 md:grid-cols-4">
        {/* Column 1: About */}
        <div className="flex flex-col space-y-4 md:col-span-2">
          <Link href="/" className={`text-3xl font-bold ${macondo.className}`}>
            Gempire
          </Link>
          <p className="max-w-md">
            Where scent meets identity. We handpick standout fragrances that
            express you; bold, soft, or somewhere in between. Scents that linger
            long after you’ve left the room.
          </p>
        </div>

        {/* Column 2: Explore */}
        <div>
          <h4 className="mb-4 font-semibold">Explore</h4>
          <ul className="space-y-2">
            {exploreLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "transition-colors hover:underline",
                    pathname === href ? "text-primary" : "hover:text-primary",
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Social */}
        <div>
          <h4 className="mb-4 font-semibold">Follow Us</h4>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map(({ label, link, icon: Icon, color }) => (
              <Link
                key={label}
                href={link}
                aria-label={label}
                className="transition-transform duration-200 hover:scale-110"
              >
                <Icon
                  className="h-6 w-6 transition-colors duration-300"
                  style={{
                    color: "var(--foreground)",
                  }}
                  onMouseEnter={(e) => {
                    // 🧠 Skip hover color if it's black (so it stays visible)
                    if (color !== "#000000" && color !== "#010101") {
                      e.currentTarget.style.color = color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--foreground)";
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-border flex flex-col items-center justify-between border-t pt-5 text-sm md:flex-row">
        <p>&copy; {new Date().getFullYear()} Gempire. All rights reserved.</p>
        <div className="mt-4 flex space-x-4 md:mt-0">
          {legalLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "transition-colors",
                pathname === href ? "text-primary" : "hover:text-primary",
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
