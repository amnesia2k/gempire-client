"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { PromoCode } from "@/lib/types";
import { usePromoCodes } from "@/lib/hooks/usePromo";
import Link from "next/link";

export default function PromoBanner() {
  const [currentPromo, setCurrentPromo] = useState(0);
  const { data, isLoading, isError } = usePromoCodes();

  const activePromotions = useMemo(() => {
    return data?.data?.filter((promo: PromoCode) => promo.isActive) ?? [];
  }, [data]);

  useEffect(() => {
    if (activePromotions.length === 0) return;

    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % activePromotions.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [activePromotions]);

  if (isLoading || activePromotions.length === 0) return null;
  if (isError) return null;

  const promo = activePromotions[currentPromo];
  if (!promo) return null;

  return (
    <Card className="flex flex-col items-start justify-between gap-4 bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-500 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
      {/* Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <div className="text-white">
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="text-lg font-semibold">{promo.name}</span>
            <span className="hidden text-sm opacity-60 sm:inline">•</span>
            <span className="text-sm font-medium">{promo.subtitle}</span>
          </div>
          <div className="mt-1 flex flex-col items-start gap-2 md:flex-row">
            <span className="text-sm">{promo.description}</span>
            {promo.code && (
              <Badge className="px-2 py-0.5 font-mono text-xs">
                Code: {promo.code}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
        {promo.urgent && (
          <div className="hidden animate-pulse items-center gap-1 text-xs sm:flex">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Limited Time</span>
          </div>
        )}

        <Button className="rounded-full">
          <Link href="/products">{promo.ctaText}</Link>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>

        {/* Pagination */}
        <div className="hidden gap-1 sm:flex">
          {activePromotions.map((_, index) => (
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
  );
}
