"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import CartIcon from "./cart-icon";
import { ModeToggle } from "./mode-toggle";
import { Macondo } from "next/font/google";

const navLinks = [
  { id: 1, title: "Home", to: "" },
  { id: 2, title: "Products", to: "products" },
  { id: 3, title: "Contact", to: "contact" },
];

const macondo = Macondo({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMobileSidebar = () => setIsOpen(false);

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
      document.body.style.overflow = "hidden"; // lock scroll
    } else {
      document.body.style.overflow = ""; // restore scroll
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop Navbar (centered pill) */}
      <nav className="bg-background/80 fixed top-6 left-1/2 z-50 hidden w-[850px] -translate-x-1/2 transform items-center justify-between rounded-full border border-gray-200 px-8 py-4 shadow-lg backdrop-blur-xl lg:flex dark:border-gray-800">
        <Link href="/" className={`text-3xl font-bold ${macondo.className}`}>
          Gempire
        </Link>

        {/* Desktop nav links */}
        <div className="flex items-center gap-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`/${link.to}`}
              className={`transition-colors ${
                pathname === `/${link.to}`
                  ? "text-xl font-bold"
                  : "hover:text-primary text-base hover:font-medium"
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-x-4">
          <ModeToggle />
          <CartIcon variant="outline" />
        </div>
      </nav>

      {/* Mobile Navbar (sticky full-width) */}
      <nav className="bg-background/80 dark:bg-background/80 fixed top-0 right-0 left-0 z-50 border-b border-gray-200 px-5 py-4 backdrop-blur-xl lg:hidden dark:border-gray-800">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`text-3xl font-bold ${macondo.className}`}
            onClick={closeMobileSidebar}
          >
            Gempire
          </Link>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <button
              onClick={toggleMenu}
              className="cursor-pointer focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar + Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden dark:bg-white/10 dark:backdrop-blur-sm"
              onClick={closeMobileSidebar}
            />

            {/* Sidebar */}
            <motion.div
              key="sidebar"
              ref={sidebarRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="bg-background fixed top-0 right-0 z-50 h-full w-64 px-6 py-6 shadow-lg lg:hidden dark:bg-black"
            >
              {/* Top row: close */}
              <div className="mb-8 flex justify-end">
                <button onClick={closeMobileSidebar} className="cursor-pointer">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={`/${link.to}`}
                    onClick={closeMobileSidebar}
                    className={`hover:text-primary text-base font-medium transition-colors ${
                      pathname === `/${link.to}`
                        ? "text-primary font-semibold"
                        : ""
                    }`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
