"use client";

import { useParams } from "next/navigation";
import EditProductForm from "./edit-form";

export default function EditProductWrapper() {
  const params = useParams();

  // slug can be undefined for a moment, so be safe
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : "";

  if (!slug) return <p>Loading slug...</p>;

  return <EditProductForm slug={slug} />;
}
