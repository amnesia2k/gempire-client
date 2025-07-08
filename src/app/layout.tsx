import "@/styles/globals.css";

import { QueryProvider } from "./utils/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Script from "next/script";

import { Macondo, Zain } from "next/font/google";

const macondo = Macondo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--display-family",
});

const zain = Zain({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--text-family",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>
      <html
        lang="en"
        className={`${macondo.variable} ${zain.variable}`}
        suppressHydrationWarning
      >
        <head>
          {/* JSON-LD: Organization Structured Data */}
          <Script
            id="jsonld-org"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Gempire",
                url: "https://store.olatilewa.dev",
                logo: "https://store.olatilewa.dev/logo.png",
                sameAs: [
                  "https://instagram.com/gempire.ng",
                  "https://facebook.com/gempire.ng",
                ],
              }),
            }}
          />
        </head>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-center" richColors closeButton />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
