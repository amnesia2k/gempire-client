"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useCreateCategory } from "@/lib/hooks/useCategory";
import { toast } from "sonner";
import { extractApiError } from "@/lib/axios";

export const AddCategoryModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const { mutateAsync } = useCreateCategory();

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsPending(true);

    if (!name.trim()) return;

    const createPromise = mutateAsync(name)
      .then((s) => toast.success(s.message))
      .finally(() => {
        setIsPending(false);
      });

    toast.promise(createPromise, {
      loading: "Creating category...",
      error: (err) => extractApiError(err),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent forceMount className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <DialogFooter>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full justify-center"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Creating..." : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
