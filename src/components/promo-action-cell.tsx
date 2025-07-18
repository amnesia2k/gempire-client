"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import type { PromoCode } from "@/lib/types";
import PromoDetailsModal from "@/components/promo-details-modal";

type Props = {
  promo: PromoCode;
};

export default function PromoActionsCell({ promo }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            View Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PromoDetailsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        promo={promo}
      />
    </>
  );
}
