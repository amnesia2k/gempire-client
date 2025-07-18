import type { Metadata } from "next";
import { generateMeta } from "@/lib/metadata";
import AdminPromoWrapper from "./admin-promo-wrapper";

export const metadata: Metadata = generateMeta({
  title: "Gempire Promotion Codes",
  description: "Manage all promotion codes in the Gempire Admin Dashboard",
  canonicalPath: "/admin-promo",
});

export default function AdminPromo() {
  return <AdminPromoWrapper />;
}
