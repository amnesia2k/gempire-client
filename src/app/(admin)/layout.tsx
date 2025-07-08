import type { Metadata } from "next";
import { AdminLayoutContent } from "./admin-layout-content";
import { AdminProvider } from "../../context/admin-context";
import { generateMeta } from "@/lib/metadata";

export const metadata: Metadata = generateMeta({
  title: "Gempire Dashboard",
  description: "This is the Admin Dashboard for Gempire",
  canonicalPath: "/admin-dashboard",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const themeColor = "#000000";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}
