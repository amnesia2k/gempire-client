import React from "react";

interface CatBadgeProps {
  name: string;
}

export default function CatBadge({ name }: CatBadgeProps) {
  return (
    <span className="bg-primary absolute top-3 z-10 rounded-r-full px-2 py-0.5 text-[10px] font-medium text-black capitalize sm:text-sm">
      {name}
    </span>
  );
}
