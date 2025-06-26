"use client";

import type { ProductImage } from "@/lib/types";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface ProductImagesProps {
  images: ProductImage[];
  alt: string;
}

export default function ProductImages({ images, alt }: ProductImagesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewingLargeImage, setViewingLargeImage] = useState(false);

  const activeImage = images[activeIndex];
  const { imageUrl } = activeImage ?? {};

  return (
    <>
      {viewingLargeImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md backdrop-brightness-75">
          <div className="relative max-h-screen max-w-screen-lg p-4">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={alt}
                width={1200}
                height={1200}
                className="h-full w-full object-contain"
              />
            )}
          </div>
          <button
            onClick={() => setViewingLargeImage(false)}
            className="bg-background/80 hover:bg-background focus:ring-primary absolute top-4 right-4 z-10 rounded-full p-2 focus:ring-2 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      ) : (
        <>
          {/* Mobile: scrollable */}
          <div className="scrollbar-thin scrollbar-thumb-muted flex gap-4 overflow-x-auto sm:hidden">
            {images.map((img, index) => (
              <button
                key={img._id}
                onClick={() => {
                  setActiveIndex(index);
                  setViewingLargeImage(true);
                }}
                className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border"
              >
                <Image
                  src={img.imageUrl}
                  alt={`${alt} thumbnail ${index + 1}`}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Desktop: wrapped flex */}
          <div className="hidden flex-wrap gap-4 sm:flex">
            {images.map((img, index) => (
              <button
                key={img._id}
                onClick={() => {
                  setActiveIndex(index);
                  setViewingLargeImage(true);
                }}
                className="h-28 w-28 overflow-hidden rounded-md border"
              >
                <Image
                  src={img.imageUrl}
                  alt={`${alt} thumbnail ${index + 1}`}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}
