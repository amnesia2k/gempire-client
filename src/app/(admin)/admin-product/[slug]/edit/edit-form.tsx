"use client";

import { useCategories } from "@/app/lib/hooks/useCategory";
import { useEditProduct, useProductBySlug } from "@/app/lib/hooks/useProduct";
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
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  slug: string;
}

/**
 * Renders a form for editing an existing product, allowing updates to product details, category, and images.
 *
 * Displays the current product information, enables modification of fields such as name, price, unit, description, and category, and supports uploading new images or removing existing ones (up to five images total). On submission, updates the product and provides user feedback on success or failure.
 *
 * @param slug - The unique identifier for the product to edit
 */
export default function EditProductForm({ slug }: Props) {
  const { data: productData, isLoading } = useProductBySlug(slug);
  const { data: categories } = useCategories();
  const { mutate, isPending } = useEditProduct();
  const router = useRouter();

  const [files, setFiles] = useState<FileList | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    unit: "",
    description: "",
  });

  const [existingImages, setExistingImages] = useState<
    { _id: string; imageUrl: string }[]
  >([]);

  // 🧠 Initialize product data into form state
  useEffect(() => {
    if (productData) {
      setFormState({
        name: productData.name,
        price: productData.price,
        unit: productData.unit.toString(),
        description: productData.description,
      });
      setExistingImages(productData.images || []);
    }
  }, [productData]);

  // ✅ Set categoryId only after categories are loaded
  useEffect(() => {
    if (productData?.categoryId && (categories?.length ?? 0) > 0) {
      const match = categories!.find(
        (cat) => cat._id === productData.categoryId,
      );
      if (match) {
        setCategoryId(match._id);
      }
    }
  }, [productData?.categoryId, categories]);

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

  const removeExistingImage = (id: string) => {
    setDeletedImageIds((prev) => [...prev, id]);
    setExistingImages((prev) => prev.filter((img) => img._id !== id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending || !productData) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("categoryId", categoryId);
    deletedImageIds.forEach((id) => formData.append("deletedImageIds", id));

    if (files) {
      Array.from(files).forEach((file) => formData.append("files", file));
    }

    mutate(
      {
        slug: productData.slug,
        formData,
      },
      {
        onSuccess: (updated) => {
          toast.success("Product updated successfully!");
          setDeletedImageIds([]);
          setFiles(null);
          setPreviewImages([]);
          router.push(`/admin-product/${updated.slug}`);
        },
        onError: (err) => {
          toast.error(err.message || "Failed to update product");
        },
      },
    );
  };

  if (isLoading || !categories || !productData)
    return <p>Loading product...</p>;

  // console.log("Product:", productData);
  // console.log("Categories:", categories);
  // console.log("Current Category ID:", categoryId);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-2">
        <FormField
          label="Product Name"
          id="name"
          name="name"
          defaultValue={formState.name}
          placeholder="Enter Product Name"
          required
          type="text"
        />

        <div className="space-y-3">
          <Label>Category</Label>

          {categories && categories.length > 0 ? (
            categoryId ? (
              <Select value={categoryId} onValueChange={setCategoryId} required>
                <SelectTrigger className="w-full p-5">
                  <SelectValue placeholder="Choose a Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                  <AddCategoryModal />
                </SelectContent>
              </Select>
            ) : (
              <p className="text-muted-foreground italic">
                Loading category...
              </p>
            )
          ) : (
            <p className="text-muted-foreground italic">
              Fetching categories...
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-2">
        <FormField
          label="Price"
          id="price"
          name="price"
          defaultValue={formState.price}
          placeholder="e.g., 4000"
          required
          type="number"
        />
        <FormField
          label="Unit"
          id="unit"
          name="unit"
          defaultValue={formState.unit}
          placeholder="e.g., 100"
          required
          type="number"
        />
      </div>

      <FormField
        label="Product Description"
        id="description"
        name="description"
        defaultValue={formState.description}
        placeholder="Enter Product Description"
        required
        variant="textarea"
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
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          ))}

          {previewImages.map((src, index) => (
            <div
              key={src}
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
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          ))}

          {existingImages.length + previewImages.length < 5 && (
            <label
              htmlFor="files"
              className="text-muted-foreground relative flex aspect-square w-full max-w-[160px] flex-shrink-0 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-sm transition hover:border-gray-500 hover:text-gray-700"
            >
              <Plus size={50} />
              <Input
                type="file"
                id="files"
                name="files"
                accept="image/*"
                multiple
                onChange={handleFilesChange}
                className="absolute inset-0 cursor-pointer opacity-0"
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
        className="w-full"
        disabled={isPending}
      >
        {isPending ? "Updating..." : "Update Product"}
      </Button>
    </form>
  );
}
