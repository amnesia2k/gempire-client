import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import type { Product } from "@/lib/types";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "productId",
    header: "ID",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-[120px] truncate">
        {row.getValue("productId")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return <div>₦{price.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "unit",
    header: "Stock",
  },
  {
    accessorKey: "category.name",
    header: "Category",
    cell: ({ row }) => (
      <div>{row.original.category?.name ?? "Uncategorized"}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin-product/${product.slug}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin-product/${product.slug}/edit`}>Edit</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onClick={() => {
                // ideally trigger modal or toast confirm here
                alert(`Deleting ${product.name} (not implemented yet 😅)`);
              }}
            >
              Delete
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
