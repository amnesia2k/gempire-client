"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import CartIcon from "./cart-icon";
import { cn } from "@/lib/utils"; // assuming you're using ShadCN's `cn` util
import { ModeToggle } from "./mode-toggle";

const navLinks = [
  { id: 1, title: "Home", to: "" },
  { id: 2, title: "Products", to: "products" },
  { id: 3, title: "Contact", to: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-background relative z-50 flex items-center justify-between px-4 py-4 lg:px-8">
      <Link href="/" className="text-2xl font-bold">
        Gempire
      </Link>

      {/* Desktop nav */}
      <div className="hidden items-center gap-x-10 lg:flex">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={`/${link.to}`}
            className={cn(
              "hover:text-primary text-sm transition-colors",
              pathname === `/${link.to}` && "text-lg font-bold",
            )}
          >
            {link.title}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-x-4">
        <ModeToggle />
        {/* Desktop cart */}
        <div className="hidden lg:block">
          <CartIcon variant="outline" />
        </div>

        {/* Mobile menu button */}
        <button
          className="flex cursor-pointer items-center lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300 lg:hidden",
          isOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0",
          // conditional styles based on dark/light mode
          "bg-black/50 dark:bg-white/10 dark:backdrop-blur-sm",
        )}
      />

      {/* Sidebar */}
      {isOpen && (
        <div
          ref={sidebarRef}
          className="bg-background fixed top-0 right-0 z-50 h-full w-64 px-6 py-6 shadow-lg lg:hidden"
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xl font-bold">Menu</span>
            <button
              onClick={toggleMenu}
              aria-label="Close menu"
              className="cursor-pointer"
            >
              <X size={28} />
            </button>
          </div>

          <nav className="flex flex-col gap-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`/${link.to}`}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "hover:text-primary text-base transition-colors",
                  pathname === `/${link.to}` && "font-bold",
                )}
              >
                {link.title}
              </Link>
            ))}

            <div className="mt-6">
              <CartIcon />
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
}
