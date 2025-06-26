"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import CartIcon from "./cart-icon";

const navLinks = [
  {
    id: 1,
    title: "Home",
    to: "",
  },

  {
    id: 2,
    title: "Products",
    to: "products",
  },

  {
    id: 3,
    title: "Contact",
    to: "contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between p-5">
      <span className={`text-4xl font-bold`}>Gempire</span>

      <div className="flex items-center gap-x-10">
        {navLinks.map((link) => (
          <Link
            href={`/${link.to}`}
            key={link.id}
            className={`${
              pathname === `/${link.to}`
                ? "text-lg font-bold"
                : "text-foreground font-medium"
            }`}
          >
            {link.title}
          </Link>
        ))}
      </div>

      <div>
        <CartIcon />
      </div>
    </div>
  );
}
