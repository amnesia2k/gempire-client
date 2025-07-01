"use client";

import { useCategories } from "@/lib/hooks/useCategory";
import { useCreateProduct } from "@/lib/hooks/useProduct";
import { AddCategoryModal } from "@/components/add-category-modal";
import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { extractApiError } from "@/lib/axios";

export default function ProductForm() {
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { mutateAsync } = useCreateProduct();
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const selected = Array.from(input.files ?? []);
    if (selected.length === 0) return;

    if ((files?.length ?? 0) + selected.length > 5) {
      toast.error("You can only upload up to 5 images.");
      input.value = "";
      return;
    }

    const dataTransfer = new DataTransfer();
    Array.from(files ?? []).forEach((f) => dataTransfer.items.add(f));
    selected.forEach((f) => dataTransfer.items.add(f));
    setFiles(dataTransfer.files);

    const newPreviews = selected.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);

    input.value = "";
  };

  const removeImageAt = (index: number) => {
    if (!files) return;
    const updatedFiles = Array.from(files).filter((_, i) => i !== index);
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((f) => dataTransfer.items.add(f));
    setFiles(dataTransfer.files);
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    setIsPending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (files) {
      Array.from(files).forEach((file) => formData.append("files", file));
    }

    formData.append("categoryId", categoryId);

    const createPromise = mutateAsync(formData)
      .then((res) => {
        toast.success(res.message);
        form.reset();
        setFiles(null);
        setPreviewImages([]);
        setCategoryId("");
        router.push(`/admin-product/${res.data.slug}`);
      })
      .finally(() => {
        setIsPending(false);
      });

    toast.promise(createPromise, {
      loading: "Creating product...",
      error: (err) => extractApiError(err),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-2">
          <FormField
            label="Product Name"
            id="name"
            name="name"
            placeholder="Enter Product Name"
            type="text"
            disabled={isPending}
          />

          <div className="space-y-3">
            <Label>Category</Label>
            <Select
              value={categoryId}
              onValueChange={(val) => {
                if (val === "__new__") {
                  setShowModal(true);
                } else {
                  setCategoryId(val);
                }
              }}
            >
              <SelectTrigger className="w-full p-5">
                <SelectValue placeholder="Choose a Category" />
              </SelectTrigger>
              <SelectContent>
                {loadingCategories ? (
                  <div className="text-muted-foreground p-2">Loading...</div>
                ) : (
                  categories?.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))
                )}
                <SelectItem value="__new__">
                  <Plus className="mr-1 inline-block h-3 w-3" />
                  Add New Category
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-2">
          <FormField
            label="Price"
            id="price"
            name="price"
            placeholder="e.g., 4000"
            type="number"
            disabled={isPending}
          />
          <FormField
            label="Unit"
            id="unit"
            name="unit"
            placeholder="e.g., 100"
            type="number"
            disabled={isPending}
          />
        </div>

        <FormField
          label="Product Description"
          id="description"
          name="description"
          placeholder="Enter Product Description"
          variant="textarea"
          disabled={isPending}
        />

        <div>
          <Label>Product Images</Label>
          <div className="scrollbar-thin scrollbar-thumb-muted mt-2 flex gap-4 overflow-x-auto">
            {previewImages.map((src, index) => (
              <div
                key={index}
                className="relative aspect-square w-full max-w-[160px] flex-shrink-0"
              >
                <Image
                  src={src}
                  alt={`preview-${index}`}
                  fill
                  className="rounded-md border object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImageAt(index)}
                  className="absolute top-1 right-1 z-10 rounded-full bg-red-600 p-1 text-white opacity-100"
                >
                  <Trash className="h-4 w-4 cursor-pointer" />
                </button>
              </div>
            ))}

            {previewImages.length < 5 && (
              <label
                htmlFor="files"
                className={`relative flex aspect-square w-full max-w-[160px] flex-shrink-0 items-center justify-center rounded-md border-2 border-dashed text-sm transition ${
                  isPending
                    ? "border-muted-foreground cursor-not-allowed opacity-50"
                    : "cursor-pointer border-gray-300 hover:border-gray-500 hover:text-gray-700"
                }`}
              >
                <Plus size={50} />
                <Input
                  type="file"
                  id="files"
                  name="files"
                  accept="image/*"
                  multiple
                  onChange={handleFilesChange}
                  className="absolute inset-0 opacity-0"
                  disabled={isPending}
                />
              </label>
            )}
          </div>
          <p className="text-muted-foreground mt-2 text-sm">
            Upload up to 5 images. Click a preview to remove.
          </p>
        </div>

        <Button
          variant="default"
          size="lg"
          type="submit"
          className="w-full justify-center"
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Creating..." : "Create Product"}
        </Button>
      </form>

      <AddCategoryModal open={showModal} setOpen={setShowModal} />
    </>
  );
}
