"use client";

import type { ProductImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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
      <AnimatePresence>
        {viewingLargeImage && (
          <>
            {/* Backdrop and center modal */}
            <motion.div
              key="modal-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md backdrop-brightness-75"
            >
              <motion.div
                key="modal-content"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="relative p-4"
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={alt}
                    width={1200}
                    height={1200}
                    className="h-full max-h-[90vh] w-full max-w-[90vw] object-contain"
                  />
                )}
              </motion.div>
            </motion.div>

            {/* Fixed Close Button (top-right of screen, not the modal) */}
            <motion.button
              key="close-button"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => setViewingLargeImage(false)}
              className="bg-background/80 hover:bg-background focus:ring-primary fixed top-4 right-4 z-[60] rounded-full p-2 focus:ring-2 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Thumbnails */}
      <div className="scrollbar-thin scrollbar-thumb-muted flex gap-4 overflow-x-auto sm:hidden">
        {images.map((img, index) => (
          <button
            key={img._id}
            onClick={() => {
              setActiveIndex(index);
              setViewingLargeImage(true);
            }}
            className="h-[200px] w-[200px] flex-shrink-0 overflow-hidden rounded-md border"
          >
            <Image
              src={img.imageUrl}
              alt={`${alt} thumbnail ${index + 1}`}
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Desktop Grid Thumbnails */}
      <div
        className={cn(
          "hidden gap-4 sm:grid",
          images.length === 1 && "grid-cols-1",
          images.length === 2 && "grid-cols-2",
          images.length === 3 && "grid-cols-2 grid-rows-2",
          images.length === 4 && "grid-cols-2 grid-rows-2",
          images.length === 5 && "grid-cols-3 grid-rows-2",
          images.length === 6 && "grid-cols-3 grid-rows-2",
        )}
      >
        {images.map((img, index) => (
          <button
            key={img._id}
            onClick={() => {
              setActiveIndex(index);
              setViewingLargeImage(true);
            }}
            className="h-[180px] w-[180px] overflow-hidden rounded-md border"
          >
            <Image
              src={img.imageUrl}
              alt={`${alt} thumbnail ${index + 1}`}
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </>
  );
}
