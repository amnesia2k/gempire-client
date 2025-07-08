import type { Metadata } from "next";

const fallbackImage = "/gempire-meta.jpeg"; // Must be in /public

const defaultKeywords = [
  "Gempire",
  "perfume oils Nigeria",
  "affordable perfumes",
  "long-lasting perfumes",
  "perfume spray for women",
  "perfume spray for men",
  "roll-on perfumes",
  "scented body oils",
  "unisex perfumes Nigeria",
  "designer perfume oils",
  "oud oil Nigeria",
  "arabian perfume oils",
  "luxury perfumes Nigeria",
  "fragrance shop Nigeria",
  "oil-based perfumes",
  "body mist Nigeria",
  "perfume gifts",
  "perfume combos",
  "affordable fragrances",
  "perfume lovers Nigeria",
  "scented oils for men",
  "scented oils for women",
  "perfume bundles",
  "mini perfume bottles",
  "Gempire perfumes",
  "buy perfume oil online",
  "quality perfumes Nigeria",
  "jewelry Nigeria",
  "handmade jewelry",
  "gold plated jewelry",
  "affordable jewelry",
  "earrings Nigeria",
  "bracelets for women",
  "men's chains Nigeria",
  "trendy accessories",
  "gift box perfumes",
  "scented experience",
  "perfume store Nigeria",
  "perfume plug Naija",
];

interface Options {
  title: string;
  description: string;
  image?: string;
  url?: string;
  canonicalPath?: string;
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
    keywords: defaultKeywords,
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
