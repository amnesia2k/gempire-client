import type { Metadata } from "next";
import { AdminLayoutContent } from "./admin-layout-content";
import { AdminProvider } from "../../context/admin-context";

export const metadata: Metadata = {
  title: "Gempire Dashboard",
  description: "This is the Admin Dashboard for Gempire",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}
