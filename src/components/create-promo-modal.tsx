"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { PromoCode } from "@/lib/types";
import { useCreatePromoCode } from "@/lib/hooks/usePromo";
import { toast } from "sonner";
import { extractApiError } from "@/lib/axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  promo?: PromoCode;
};

export default function CreatePromoModal({ isOpen, onClose, promo }: Props) {
  const [formState, setFormState] = useState<Partial<PromoCode>>({
    isActive: true,
    ...promo,
  });
  const [isPending, setIsPending] = useState(false);

  const { mutateAsync } = useCreatePromoCode();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    setIsPending(true);
    const createPromise = mutateAsync(formState)
      .then((r) => {
        toast.success(r.message);
        onClose(); // Close modal on successful creation
        setFormState({}); // Reset form
      })
      .finally(() => {
        setIsPending(false);
      });

    toast.promise(createPromise, {
      loading: "Creating promo...",
      error: (err) => extractApiError(err),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Promo Code</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            disabled={isPending}
            name="name"
            value={formState.name ?? ""}
            onChange={handleChange}
            placeholder="Promo Name"
            required
          />
          <Input
            disabled={isPending}
            name="code"
            value={formState.code ?? ""}
            onChange={handleChange}
            placeholder="Promo Code"
            required
          />
          <Input
            disabled={isPending}
            name="description"
            value={formState.description ?? ""}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <Input
            disabled={isPending}
            name="discount"
            value={String(formState.discount ?? "")}
            onChange={handleChange}
            placeholder="Discount %"
            type="number"
            required
          />
          <Input
            disabled={isPending}
            name="ctaText"
            value={formState.ctaText ?? ""}
            onChange={handleChange}
            placeholder="CTA Text"
            required
          />
          <Input
            disabled={isPending}
            name="subtitle"
            value={formState.subtitle ?? ""}
            onChange={handleChange}
            placeholder="Subtitle"
            required
          />

          {/* isActive Toggle */}
          <div className="flex items-center justify-between rounded-md border px-3 py-2">
            <Label htmlFor="create-isActive">Status</Label>
            <div className="flex items-center gap-2">
              <Switch
                id="create-isActive"
                checked={formState.isActive ?? true}
                onCheckedChange={(checked: boolean) =>
                  setFormState((prev) => ({ ...prev, isActive: checked }))
                }
                disabled={isPending}
              />
              <span className="text-muted-foreground text-sm">
                {formState.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Urgent Toggle */}
          <div className="flex items-center justify-between rounded-md border px-3 py-2">
            <Label htmlFor="create-urgent">Urgent</Label>
            <div className="flex items-center gap-2">
              <Switch
                id="create-urgent"
                checked={formState.urgent ?? false}
                onCheckedChange={(checked: boolean) =>
                  setFormState((prev) => ({ ...prev, urgent: checked }))
                }
                disabled={isPending}
              />
              <span className="text-muted-foreground text-sm">
                {formState.urgent ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-2 pt-4">
          <Button variant="ghost" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? "Adding..." : "Add Promo Code"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
