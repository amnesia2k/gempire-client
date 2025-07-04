import "@/styles/globals.css";

import { QueryProvider } from "./utils/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--display-family",
});

const poppins = Poppins({
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
        className={`${inter.variable} ${poppins.variable}`}
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
