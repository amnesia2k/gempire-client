import "@/styles/globals.css";

import { QueryProvider } from "./utils/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Quicksand } from "next/font/google";
import StatusWrapper from "@/components/status-wrapper";

const quicksand = Quicksand({
  weight: "500",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>
      <html
        lang="en"
        className={`${quicksand.className}`}
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
                url: "https://gempire.vercel.app",
                logo: "https://gempire.vercel.app/gempire-meta.jpeg",
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
            <StatusWrapper>
              <Toaster position="top-center" richColors closeButton />
              <Analytics />
              <SpeedInsights />
              {children}
            </StatusWrapper>
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
