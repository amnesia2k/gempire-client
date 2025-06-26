"use client";

import { useCategories } from "@/lib/hooks/useCategory";
import React from "react";

export default function Done() {
  const { data, error, isLoading } = useCategories();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No categories found</div>;
  }

  // const done = () => {
  //   console.log(data);
  // };
  return (
    <div>
      {data.map((cat) => (
        <div key={cat._id}>{cat.name}</div>
      ))}
    </div>
  );
}
