"use client";

import { useCategories } from "@/lib/hooks/useCategory";
import { useEditProduct, useProductBySlug } from "@/lib/hooks/useProduct";
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
import { Plus, Trash, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/loader";
import { extractApiError } from "@/lib/axios";

interface Props {
  slug: string;
}

export default function EditProductForm({ slug }: Props) {
  const { data: productData, isLoading } = useProductBySlug(slug);
  const { data: categories } = useCategories();
  const { mutateAsync } = useEditProduct();
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    price: "",
    unit: "",
    description: "",
  });

  const [existingImages, setExistingImages] = useState<
    { _id: string; imageUrl: string }[]
  >([]);

  useEffect(() => {
    if (productData) {
      setFormState({
        name: productData.name,
        price: productData.price,
        unit: productData.unit.toString(),
        description: productData.description,
      });
      setExistingImages(productData.images || []);
      setCategoryId(productData.categoryId ?? "");
    }
  }, [productData]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const selected = Array.from(input.files ?? []);
    if (!selected.length) return;

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

  const removeExistingImage = (id: string) => {
    setDeletedImageIds((prev) => [...prev, id]);
    setExistingImages((prev) => prev.filter((img) => img._id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending || !productData) return;

    setIsPending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("categoryId", categoryId);
    deletedImageIds.forEach((id) => formData.append("deletedImageIds", id));

    if (files) {
      Array.from(files).forEach((file) => formData.append("files", file));
    }

    const updatePromise = mutateAsync({
      slug: productData.slug,
      formData,
    })
      .then((res) => {
        toast.success(res.message);
        setDeletedImageIds([]);
        setFiles(null);
        setPreviewImages([]);
        router.push(`/admin-product/${res.data.slug}`);
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setIsPending(false);
      });

    toast.promise(updatePromise, {
      loading: "Updating product...",
      error: (err) => extractApiError(err),
    });
  };

  if (isLoading || !categories || !productData) {
    return <Loader />;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-2">
          <FormField
            label="Product Name"
            id="name"
            name="name"
            defaultValue={formState.name}
            placeholder="Enter Product Name"
            type="text"
            required
            disabled={isPending}
          />

          <div className="space-y-3">
            <Label>Category</Label>
            <Select
              value={categoryId}
              onValueChange={(val) =>
                val === "__new__" ? setShowModal(true) : setCategoryId(val)
              }
              disabled={isPending}
              required
            >
              <SelectTrigger className="w-full p-5">
                <SelectValue placeholder="Choose a Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
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
            defaultValue={formState.price}
            placeholder="e.g., 4000"
            type="number"
            required
            disabled={isPending}
          />
          <FormField
            label="Unit"
            id="unit"
            name="unit"
            defaultValue={formState.unit}
            placeholder="e.g., 100"
            type="number"
            required
            disabled={isPending}
          />
        </div>

        <FormField
          label="Product Description"
          id="description"
          name="description"
          defaultValue={formState.description}
          placeholder="Enter Product Description"
          variant="textarea"
          required
          disabled={isPending}
        />

        <div>
          <Label>Product Images</Label>
          <div className="scrollbar-thin scrollbar-thumb-muted mt-2 flex gap-4 overflow-x-auto">
            {existingImages.map((img, index) => (
              <div
                key={img._id}
                className="relative aspect-square w-full max-w-[160px] flex-shrink-0"
              >
                <Image
                  src={img.imageUrl}
                  alt={`existing-${index}`}
                  fill
                  className="rounded-md border object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(img._id)}
                  className="absolute top-1 right-1 z-10 rounded-full bg-red-600 p-1 text-white"
                  disabled={isPending}
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}

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
                  className="absolute top-1 right-1 z-10 rounded-full bg-red-600 p-1 text-white"
                  disabled={isPending}
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}

            {existingImages.length + previewImages.length < 5 && (
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
          variant="outline"
          size="lg"
          type="submit"
          className="w-full justify-center"
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Updating..." : "Update Product"}
        </Button>
      </form>

      <AddCategoryModal open={showModal} setOpen={setShowModal} />
    </>
  );
}
