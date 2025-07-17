"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  const [currentPromo, setCurrentPromo] = useState(0);

  const promotions = [
    {
      _id: "promo-1",
      name: "25% Off Summer Collection",
      code: "SUMMER25",
      discount: 25.0,
      isPercentage: true,
      isActive: true,
      createdAt: new Date("2025-07-01"),

      title: "25% OFF",
      subtitle: "Summer Collection",
      description: "Discover our exclusive summer fragrances",
      ctaText: "Shop Now",
      urgent: false,
    },
    {
      _id: "promo-2",
      name: "₦1000 OFF Midnight Edition",
      code: "MIDNIGHT",
      discount: 1000.0,
      isPercentage: false,
      isActive: true,
      createdAt: new Date("2025-07-05"),

      title: "₦1000 OFF",
      subtitle: "Midnight Elegance",
      description: "Only 100 bottles available",
      ctaText: "Get Yours",
      urgent: true,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const promo = promotions[currentPromo];
  if (!promo?.isActive) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 lg:px-8">
      <Card className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        {/* Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-x-2">
              <span className="text-lg font-semibold">{promo.title}</span>
              <span className="hidden text-sm opacity-60 sm:inline">•</span>
              <span className="text-sm font-medium">{promo.subtitle}</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground text-sm">
                {promo.description}
              </span>
              {promo.code && (
                <span className="bg-muted text-foreground rounded px-2 py-0.5 font-mono text-xs">
                  Code: {promo.code}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          {promo.urgent && (
            <div className="hidden animate-pulse items-center gap-1 text-xs sm:flex">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span>Limited Time</span>
            </div>
          )}

          <button className="group bg-primary hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition">
            {promo.ctaText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Pagination */}
          <div className="hidden gap-1 sm:flex">
            {promotions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPromo(index)}
                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                  index === currentPromo ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Code for mobile display */}
      {/* {promo.code && (
        <div className="mt-3 text-center sm:hidden">
          <span className="bg-muted text-foreground inline-block rounded px-3 py-1 font-mono text-xs">
            Use code: {promo.code}
          </span>
        </div>
      )} */}
    </div>
  );
}
