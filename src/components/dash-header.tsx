import React from "react";

interface DashHeaderProps {
  text: string;
}

export default function DashHeader({ text }: DashHeaderProps) {
  return (
    <div>
      <h1 className="text-[32px] font-bold">{text}</h1>
    </div>
  );
}
