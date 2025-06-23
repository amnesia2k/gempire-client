"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import { useCreateCategory } from "@/app/lib/hooks/useCategory";
import { toast } from "sonner";

export const AddCategoryModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { mutate, isPending } = useCreateCategory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!name.trim()) return;

    mutate(name, {
      onSuccess: (category) => {
        setName("");
        setOpen(false);
        toast.success(category.message || "Category created 🎉");
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong");
        console.error(error);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="hover:bg-muted text-muted-foreground w-full px-2 py-1 text-left text-sm"
        >
          <Plus className="mr-1 inline-block h-3 w-3" />
          Add New Category
        </button>
      </DialogTrigger>
      <DialogContent forceMount className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // required
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
