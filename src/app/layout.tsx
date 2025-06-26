import "@/styles/globals.css";

import { Poppins, Raleway } from "next/font/google";
import { QueryProvider } from "./utils/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--display-family",
});

const raleway = Raleway({
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
        className={`${poppins.variable} ${raleway.variable}`}
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
            {children}
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
