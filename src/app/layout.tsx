import "@/styles/globals.css";

import { QueryProvider } from "./utils/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

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
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-center" richColors closeButton />
            {/* <DotLottieReact src="path/to/animation.lottie" loop autoplay /> */}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
