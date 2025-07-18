"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import DashHeader from "@/components/dash-header";
import PromoTable from "./promo-table";
import CreatePromoModal from "@/components/create-promo-modal";

export default function AdminPromoWrapper() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  return (
    <section>
      <div className="flex items-center justify-between">
        <DashHeader text="All Promo Codes" />

        <Button
          onClick={openCreateModal}
          variant="default"
          size="lg"
          className="text-foreground font-medium"
        >
          <PlusSquare />
          <span className="hidden md:inline">Add New Promo Code</span>
        </Button>
      </div>

      <PromoTable />

      <CreatePromoModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />
    </section>
  );
}
