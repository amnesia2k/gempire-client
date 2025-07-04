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
import type { Order } from "@/lib/types"; // 👈 uses your refined Order type
import { Badge } from "@/components/ui/badge";

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-[120px] truncate">
        #{row.getValue("orderId")}
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
    accessorKey: "telephone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("telephone")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-[180px] truncate">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const colorMap: Record<string, string> = {
        ordered: "text-yellow-600",
        shipped: "text-blue-600",
        delivered: "text-green-600",
        cancelled: "text-red-600",
      };

      return (
        <div className={`${colorMap[status as string]} font-medium`}>
          {String(status).toUpperCase()}
        </div>
      );
    },
  },
  {
    accessorKey: "deliveryMethod",
    header: "Delivery",
    cell: ({ row }) => {
      const delivery = row.getValue("deliveryMethod");
      const label = delivery === "pickup" ? "Pickup" : "Delivery";

      const badgeColor = delivery === "pickup" ? "bg-amber-200" : "bg-sky-200";

      return (
        <Badge className={`text-xs ${badgeColor} capitalize`}>{label}</Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
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
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin-order/${order._id}`}>View Details</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem asChild>
              <Link href={`/admin-order/${order._id}/edit-status`}>
                Update Status
              </Link>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
