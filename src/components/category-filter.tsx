"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCategories } from "@/lib/hooks/useCategory";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect } from "react";

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("category");
  const { data: categories, isLoading } = useCategories();

  // 🪄 If no category is selected, and categories have loaded, pick the first one
  useEffect(() => {
    if (!selected && categories && categories.length > 0) {
      const firstSlug = categories[0]?.slug;
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set("category", firstSlug!);
      router.replace(`?${params.toString()}`); // don't add to history
    }
  }, [selected, categories, searchParams, router]);

  const handleChange = (slug: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("category", slug);
    router.push(`?${params.toString()}`);
  };

  if (isLoading || !categories) return null;

  return (
    <div className="max-w-xs">
      <Select
        onValueChange={handleChange}
        value={selected ?? categories[0]?.slug}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat._id} value={cat.slug}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
