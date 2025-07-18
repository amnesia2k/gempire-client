"use client";

import { useEffect, useState } from "react";
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
import { useUpdatePromoCode } from "@/lib/hooks/usePromo";
import { toast } from "sonner";
import { extractApiError } from "@/lib/axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  promo: PromoCode;
};

export default function PromoDetailsModal({ isOpen, onClose, promo }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState<Partial<PromoCode>>(promo);
  const [isPending, setIsPending] = useState(false);

  const { mutateAsync } = useUpdatePromoCode();

  useEffect(() => {
    if (isOpen) setFormState(promo);
  }, [isOpen, promo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    if (!formState?._id) return;

    setIsPending(true);

    const updatePromise = mutateAsync({
      id: formState._id,
      updates: formState,
    })
      .then((r) => {
        toast.success(r.message);
        setIsEditing(false);
        onClose();
      })
      .finally(() => setIsPending(false));

    toast.promise(updatePromise, {
      loading: "Updating promo...",
      error: (err) => extractApiError(err),
    });
  };

  const toggleEdit = () => setIsEditing((prev) => !prev);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Promo Code Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            disabled={!isEditing || isPending}
            name="name"
            value={formState.name ?? ""}
            onChange={handleChange}
            placeholder="Promo Name"
          />
          <Input
            disabled={!isEditing || isPending}
            name="code"
            value={formState.code ?? ""}
            onChange={handleChange}
            placeholder="Promo Code"
          />
          <Input
            disabled={!isEditing || isPending}
            name="description"
            value={formState.description ?? ""}
            onChange={handleChange}
            placeholder="Description"
          />
          <Input
            disabled={!isEditing || isPending}
            name="discount"
            value={String(formState.discount ?? "")}
            onChange={handleChange}
            placeholder="Discount %"
            type="number"
          />
          <Input
            disabled={!isEditing || isPending}
            name="ctaText"
            value={formState.ctaText ?? ""}
            onChange={handleChange}
            placeholder="CTA Text"
          />
          <Input
            disabled={!isEditing || isPending}
            name="subtitle"
            value={formState.subtitle ?? ""}
            onChange={handleChange}
            placeholder="Subtitle"
          />

          {/* isActive Toggle */}
          <div className="flex items-center justify-between rounded-md border px-3 py-2">
            <Label htmlFor="isActive">Status</Label>
            <div className="flex items-center gap-2">
              <Switch
                id="isActive"
                checked={formState.isActive ?? false}
                onCheckedChange={(checked: boolean) =>
                  setFormState((prev) => ({ ...prev, isActive: checked }))
                }
                disabled={!isEditing || isPending}
              />
              <span className="text-muted-foreground text-sm">
                {formState.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Urgent Toggle */}
          <div className="flex items-center justify-between rounded-md border px-3 py-2">
            <Label htmlFor="urgent">Urgent</Label>
            <div className="flex items-center gap-2">
              <Switch
                id="urgent"
                checked={formState.urgent}
                onCheckedChange={(checked: boolean) =>
                  setFormState((prev) => ({ ...prev, urgent: checked }))
                }
                disabled={!isEditing || isPending}
              />
              <span className="text-muted-foreground text-sm">
                {formState.urgent ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-2 pt-4">
          <Button variant="ghost" onClick={onClose} disabled={isPending}>
            Close
          </Button>

          {!isEditing ? (
            <Button onClick={toggleEdit}>Edit</Button>
          ) : (
            <div className="flex items-center gap-x-3">
              <Button
                variant="outline"
                onClick={toggleEdit}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
