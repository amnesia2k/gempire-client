import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PromoCode } from "@/lib/types";
import PromoActionsCell from "@/components/promo-action-cell";

export const promoColumns: ColumnDef<PromoCode>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Code <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-[200px] truncate">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "discount",
    header: "Discount (%)",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("discount")}%</div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      return (
        <Badge
          variant="outline"
          className={
            isActive
              ? "border-green-600 bg-green-100 text-green-600 hover:bg-green-200"
              : "border-red-600 bg-red-100 text-red-600 hover:bg-red-200"
          }
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const raw = row.getValue("createdAt");
      const date =
        raw &&
        (typeof raw === "string" ||
          typeof raw === "number" ||
          raw instanceof Date)
          ? new Date(raw).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "";
      return <span className="text-muted-foreground">{date}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const promo = row.original;
      return <PromoActionsCell promo={promo} />;
    },
  },
];
