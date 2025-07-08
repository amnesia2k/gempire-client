/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://store.olatilewa.dev",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: [
    "/admin-dashboard",
    "/admin-dashboard/*",
    "/admin-order",
    "/admin-order/*",
    "/admin-product",
    "/admin-product/*",
    "/dash-access",
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: "*",
        disallow: [
          "/admin-dashboard",
          "/admin-dashboard/*",
          "/admin-order",
          "/admin-order/*",
          "/admin-product",
          "/admin-product/*",
          "/dash-access",
        ],
      },
    ],
  },
};

export default config;
