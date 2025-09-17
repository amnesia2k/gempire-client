"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCategoriesWithAll } from "@/lib/hooks/useCategory";
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
  const { data: categories, isLoading } = useCategoriesWithAll();

  // 🪄 Default to "all" if no category is selected
  useEffect(() => {
    if (!selected && categories && categories.length > 0) {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set("category", "all");
      params.set("page", "1"); // reset page
      router.replace(`?${params.toString()}`);
    }
  }, [selected, categories, searchParams, router]);

  const handleChange = (slug: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("category", slug);
    params.set("page", "1"); // 🔥 always reset page on category change
    router.push(`?${params.toString()}`);
  };

  if (isLoading || !categories) return null;

  return (
    <div className="max-w-xs">
      <Select onValueChange={handleChange} value={selected ?? "all"}>
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
