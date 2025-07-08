import type { Metadata } from "next";

const fallbackImage = "/gempire-meta.jpeg"; // Must be in /public

interface Options {
  title: string;
  description: string;
  image?: string;
  url?: string;
  canonicalPath?: string; // Optional canonical override
}

export function generateMeta({
  title,
  description,
  image = fallbackImage,
  url = "https://store.olatilewa.dev",
  canonicalPath = "/",
}: Options): Metadata {
  const fullUrl = `${url.replace(/\/$/, "")}${canonicalPath}`;

  return {
    title,
    description,
    metadataBase: new URL(url),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "Gempire",
      images: [image],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons: {
      icon: "/favicon.ico",
    },
    robots: {
      index: true,
      follow: true,
    },
    category: "ecommerce",
  };
}
