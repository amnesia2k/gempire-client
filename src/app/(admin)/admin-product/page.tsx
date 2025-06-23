import DashHeader from "@/components/dash-header";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import React from "react";
import ProductTable from "./product-table";

export default function AdminProduct() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <DashHeader text="Products" />

        <Button
          asChild
          variant="default"
          size="lg"
          className="text-foreground font-medium"
        >
          <Link href="/admin-product/new">
            <PlusSquare />
            <span className="hidden md:inline">Add New Product</span>
          </Link>
        </Button>
      </div>

      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"></div> */}

      {/* Product Table would be rendered here and this is a SERVER COMPONENT */}
      <ProductTable />
    </section>
  );
}
