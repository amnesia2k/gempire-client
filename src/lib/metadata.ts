import type { Metadata } from "next";

const gempire = "./gempire-meta.jpeg";

interface Options {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export function generateMeta({
  title,
  description,
  image = gempire,
  url = "https://store.olatilewa.dev",
}: Options): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(url),
    openGraph: {
      title,
      description,
      url,
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
