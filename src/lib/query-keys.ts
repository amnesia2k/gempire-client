export const queryKeys = {
  admin: ["admin"],
  orders: ["orders"],
  order: (id: string) => ["order", id],

  categories: ["categories"],
  categoriesWithAll: ["categories-with-all"],
  category: (slug: string, page = 1, limit = 12) => [
    "category",
    slug,
    page,
    limit,
  ],

  products: ["products"],
  product: (slug: string) => ["product", slug],
};
