// @/components/navbar.tsx - MODIFIED CODE
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import CartIcon from "./cart-icon";
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

  // Function to close the sidebar
  const closeMobileSidebar = () => {
    setIsOpen(false);
  };

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
      // Only prevent body scroll if the sidebar is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-background relative z-50 flex items-center justify-between px-4 py-4 lg:px-8">
      <Link
        href="/"
        className="text-2xl font-bold"
        onClick={closeMobileSidebar}
      >
        Gempire
      </Link>

      {/* Desktop nav */}
      {/* No changes needed here, as the sidebar is mobile-only */}
      <div className="hidden items-center gap-x-10 lg:flex">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={`/${link.to}`}
            className={`hover:text-primary text-sm transition-colors ${
              pathname === `/${link.to}` ? "text-lg font-bold" : ""
            }`}
          >
            {link.title}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-x-4">
        <ModeToggle />
        <div className="hidden lg:block">
          {/* Desktop CartIcon - no changes needed for closing the mobile sidebar */}
          <CartIcon variant="outline" />
        </div>

        {/* Mobile menu button */}
        <button
          className="flex items-center lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* AnimatePresence handles unmounting animations */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden dark:bg-white/10 dark:backdrop-blur-sm"
              onClick={closeMobileSidebar} // Close on backdrop click
            />

            {/* Sidebar */}
            <motion.div
              key="sidebar"
              ref={sidebarRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="bg-background fixed top-0 right-0 z-50 h-full w-64 px-6 py-6 lg:hidden"
            >
              {/* Top row: Close + Cart */}
              <div className="mb-6 flex items-center justify-between">
                <button
                  onClick={toggleMenu} // This already closes the menu
                  aria-label="Close menu"
                  className="cursor-pointer"
                >
                  <X size={28} />
                </button>
                {/*
                  Pass closeMobileSidebar as onClick to CartIcon.
                  CartIcon's Button component will receive it.
                  Since CartIcon uses Button asChild and wraps a Link,
                  the Button component should correctly forward the onClick.
                */}
                <CartIcon variant="outline" onClick={closeMobileSidebar} />
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={`/${link.to}`}
                    onClick={closeMobileSidebar} // Use the dedicated close function
                    className={`hover:text-primary text-base transition-colors ${
                      pathname === `/${link.to}` ? "font-bold" : ""
                    }`}
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
