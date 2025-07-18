"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image"; // Keep this for product images
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import {
  Pencil,
  Share2,
  Trash2,
  MoreVertical,
  QrCode, // Import QrCode icon for the new option
  Download, // Import Download icon for the QR download button
} from "lucide-react";

import { useDeleteProduct, useProductBySlug } from "@/lib/hooks/useProduct";
import { cloudinaryBlur } from "@/lib/utils";
import DashHeader from "@/components/dash-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { extractApiError } from "@/lib/axios";
import SplashLoader from "@/components/splash-loader";

// Tell TS about the global QRious
declare global {
  interface Window {
    QRious?: new (config: {
      element: HTMLCanvasElement;
      value: string;
      size?: number;
      background?: string;
      foreground?: string;
      level?: "L" | "M" | "Q" | "H";
    }) => void;
  }
}

export default function Product() {
  const { slug } = useParams();
  const productSlug = typeof slug === "string" ? slug : undefined;

  const { data, isLoading, error } = useProductBySlug(productSlug);
  const { mutateAsync } = useDeleteProduct();
  const router = useRouter();

  // State for delete confirmation dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isPending, setIsPending] = useState(false);

  // State for QR code dialog
  const [openQrDialog, setOpenQrDialog] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const qrImageRef = useRef<HTMLImageElement | null>(null);

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [qrElementType, setQrElementType] = useState<"canvas" | "img" | null>(
    null,
  );
  const [qriousScriptLoaded, setQriousScriptLoaded] = useState(false); // Renamed for clarity

  const productLink = data
    ? `https://store.olatilewa.dev/product/${data.slug}`
    : "";

  const handleDeleteConfirmed = () => {
    if (!data?._id) return;

    setIsPending(true); // Set pending state
    const createPromise = mutateAsync(data._id)
      .then((r) => {
        toast.success(r.message);
        setOpenDeleteDialog(false);
        router.push("/admin-product");
      })
      .finally(() => setIsPending(false));

    toast.promise(createPromise, {
      loading: "Deleting product...",
      error: (err) => extractApiError(err),
    });
  };

  const handleShare = () => {
    const rawMessage = `Check out this product on our store:\n\n${data?.name} - ${productLink}\n\nPrice: *₦${Number(data?.price).toLocaleString()}*`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(rawMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  // --- QR Code Generation Logic ---

  // Reorder: Declare generateFallbackQR first
  const generateFallbackQR = useCallback((text: string) => {
    console.log("generateFallbackQR called with text:", text);
    const img = qrImageRef.current;
    if (!img) {
      console.error(
        "QR Image ref is null when calling generateFallbackQR (expected to be ready).",
      );
      return;
    }

    const encoded = encodeURIComponent(text);
    img.src = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encoded}&choe=UTF-8`;
    img.alt = "QR Code";
    img.className = "w-full h-auto rounded-xl shadow-lg bg-white p-4";
    img.style.maxWidth = "300px";

    img.onload = () => {
      console.log("Fallback QR image loaded successfully.");
      setQrCodeDataUrl(img.src);
    };
    img.onerror = () => {
      console.error("Fallback QR image failed to load from Google Charts.");
      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}&format=png&margin=10`;
      img.onerror = () => {
        console.error("Fallback QR image also failed from qrserver.com.");
        toast.error("Failed to generate QR code from all sources.");
        setQrCodeDataUrl(null);
        setQrElementType(null);
      };
    };
  }, []);

  // Now createQR can safely reference generateFallbackQR
  const createQR = useCallback(
    (text: string) => {
      console.log("createQR called with text:", text);
      const canvas = qrCanvasRef.current;
      if (!canvas) {
        console.error(
          "QR Canvas ref is null when calling createQR (expected to be ready).",
        );
        return;
      }

      try {
        if (typeof window.QRious === "function") {
          console.log("QRious is available. Attempting to create QR...");
          new window.QRious({
            element: canvas,
            value: text,
            size: 300,
            background: "white",
            foreground: "black",
            level: "M",
          });
          canvas.className = "w-full h-auto rounded-xl shadow-lg bg-white";
          canvas.style.maxWidth = "300px";
          const dataUrl = canvas.toDataURL("image/png");
          setQrCodeDataUrl(dataUrl);
          console.log("QR code created successfully via QRious.");
        } else {
          console.warn(
            "QRious not available in createQR path. This shouldn't happen.",
          );
          generateFallbackQR(text); // Fallback as a safeguard
        }
      } catch (err) {
        console.error("Error creating QR code with QRious:", err);
        toast.error("Failed to generate QR code. Trying fallback.");
        generateFallbackQR(text);
      }
    },
    [generateFallbackQR], // Now `generateFallbackQR` is defined when `createQR` is defined
  );

  const loadQriousScript = useCallback(() => {
    if (!qriousScriptLoaded && !window.QRious) {
      console.log("QRious script not found and not loaded, appending to head.");
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js";
      script.onload = () => {
        console.log("QRious script loaded successfully.");
        setQriousScriptLoaded(true); // Mark as loaded
      };
      script.onerror = () => {
        console.error("Failed to load QRious script from CDN.");
        toast.error(
          "Failed to load QRious script. Will proceed with fallback.",
        );
        setQriousScriptLoaded(false); // Ensure it's false if load failed
      };
      document.head.appendChild(script);
    } else {
      console.log("QRious script already loaded or initiated.");
      setQriousScriptLoaded(typeof window.QRious === "function"); // Verify if it's truly available
    }
  }, [qriousScriptLoaded]);

  // EFFECT 1: When dialog opens, initialize state and trigger script loading
  useEffect(() => {
    if (openQrDialog) {
      console.log("QR Dialog opened. Initializing QR process.");
      setQrCodeDataUrl(null); // Clear previous QR data
      setQrElementType(null); // Clear previous element type to show loading
      loadQriousScript(); // Start loading script
    } else {
      // Clean up when dialog closes
      setQrCodeDataUrl(null);
      setQrElementType(null);
      console.log("QR Dialog closed. Cleaning up.");
    }
  }, [openQrDialog, loadQriousScript]);

  // EFFECT 2: Determine element type AND generate QR code once script status is known and dialog is open
  useEffect(() => {
    if (!productLink || !openQrDialog) return;

    let targetElementType: "canvas" | "img" | null = null;

    // Logic to determine targetElementType
    if (qriousScriptLoaded && typeof window.QRious === "function") {
      targetElementType = "canvas";
    } else if (qriousScriptLoaded === false) {
      // Script failed to load or not initiated
      targetElementType = "img";
    } else if (typeof window.QRious === "function") {
      // qriousScriptLoaded might be true or not, but window.QRious is there
      targetElementType = "canvas";
    } else {
      // Fallback if script is not confirmed loaded but QRious isn't available
      targetElementType = "img";
    }

    // Update element type if needed
    if (qrElementType !== targetElementType) {
      console.log(`Setting qrElementType to: ${targetElementType}`);
      setQrElementType(targetElementType);
      return; // Let the next render cycle handle the generation
    }

    // Generate QR code if element type is already correct and refs are available
    console.log(
      `qrElementType is already ${targetElementType}. Proceeding with generation.`,
    );

    // Add a small delay to ensure the canvas/img element is properly mounted
    const generateQR = () => {
      if (targetElementType === "canvas" && qrCanvasRef.current) {
        createQR(productLink);
      } else if (targetElementType === "img" && qrImageRef.current) {
        generateFallbackQR(productLink);
      } else {
        // Refs not ready yet, try again after a short delay
        setTimeout(generateQR, 10);
      }
    };

    generateQR();
  }, [
    openQrDialog,
    productLink,
    qriousScriptLoaded,
    qrElementType,
    createQR,
    generateFallbackQR,
  ]);

  // Alternative approach: Add a separate useEffect to handle generation when element type changes
  useEffect(() => {
    if (!productLink || !openQrDialog || !qrElementType) return;

    // Small delay to ensure the DOM element is ready
    const timer = setTimeout(() => {
      if (qrElementType === "canvas" && qrCanvasRef.current) {
        createQR(productLink);
      } else if (qrElementType === "img" && qrImageRef.current) {
        generateFallbackQR(productLink);
      }
    }, 50); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, [qrElementType, productLink, openQrDialog, createQR, generateFallbackQR]);

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) {
      toast.error("No QR code to download.");
      return;
    }

    const tempLink = document.createElement("a");
    tempLink.href = qrCodeDataUrl;
    tempLink.download = `product-qr-code-${data?.slug ?? "unknown"}.png`;
    tempLink.click();

    toast.success("QR Code download initiated.");
  };

  // --- End QR Code Generation Logic ---

  if (isLoading)
    return (
      <SplashLoader
        text="Loading product..."
        classes="min-h-[calc(70vh-200px)] flex items-center justify-center"
      />
    );
  if (error) return <p>Error loading product</p>;
  if (!data) return <p>No product found with slug: {productSlug}</p>;

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <DashHeader text={`#${data.productId}`} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-[300px]">
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`/admin-product/${data.slug}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Product
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
              <Share2 className="mr-2 h-4 w-4" />
              Share Product
            </DropdownMenuItem>

            {/* New QR Code Option */}
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()} // Prevent closing dropdown immediately
            >
              <Dialog open={openQrDialog} onOpenChange={setOpenQrDialog}>
                <DialogTrigger asChild>
                  <button
                    className="flex w-full items-center"
                    // No onClick here! The useEffect handles generation when dialog opens
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    Generate QR Code
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>QR Code for {data.name}</DialogTitle>
                    <p className="text-muted-foreground text-sm">
                      Scan this QR code to access the product page.
                    </p>
                  </DialogHeader>
                  <div className="flex justify-center p-4">
                    {/* Conditionally render based on qrElementType */}
                    {!productLink ? (
                      <p className="text-gray-500">
                        Product link not available to generate QR code.
                      </p>
                    ) : qrElementType === "canvas" ? (
                      <canvas
                        ref={qrCanvasRef}
                        className="h-auto w-full rounded-xl bg-white shadow-lg"
                        style={{ maxWidth: "300px" }}
                      />
                    ) : qrElementType === "img" ? (
                      <Image
                        ref={qrImageRef as React.RefObject<HTMLImageElement>} // TS compatibility
                        src={qrCodeDataUrl ?? ""}
                        alt="QR Code"
                        width={300}
                        height={300}
                        className="h-auto w-full rounded-xl bg-white p-4 shadow-lg"
                        style={{ maxWidth: "300px" }}
                        unoptimized // Allow remote data URLs
                      />
                    ) : (
                      <p className="text-gray-500">Generating QR code...</p>
                    )}
                  </div>
                  <DialogFooter className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setOpenQrDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={downloadQRCode} disabled={!qrCodeDataUrl}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>

            {/* Delete Product Option */}
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Dialog
                open={openDeleteDialog}
                onOpenChange={setOpenDeleteDialog}
              >
                <DialogTrigger asChild>
                  <button className="flex w-full items-center text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Product
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Product</DialogTitle>
                    <p className="text-muted-foreground text-sm">
                      This action cannot be undone. Type{" "}
                      <span className="font-semibold">{data.name}</span> to
                      confirm.
                    </p>
                  </DialogHeader>
                  <Input
                    placeholder="Enter product name"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                  />
                  <DialogFooter className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setOpenDeleteDialog(false)}
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      disabled={confirmText.trim() !== data.name || isPending}
                      onClick={handleDeleteConfirmed}
                    >
                      {isPending ? "Deleting..." : "Delete"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="scrollbar-thin scrollbar-thumb-muted flex gap-4 overflow-x-auto">
        {data.images.map((img) => (
          <div key={img._id} className="flex-shrink-0">
            <Image
              src={img.imageUrl}
              alt={data.name}
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL={cloudinaryBlur(img.imageUrl)}
              className="rounded-md border object-cover"
            />
          </div>
        ))}
      </div>

      {data.category && <Badge>{data.category.name}</Badge>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="border-t pt-6">
          <p className="text-muted-foreground text-sm font-medium">
            Product Name
          </p>
          <p className="text-lg font-semibold">{data.name}</p>
        </div>

        <div className="border-t pt-6">
          <p className="text-muted-foreground text-sm font-medium">Price</p>
          <p className="text-lg">₦{Number(data.price).toLocaleString()}</p>
        </div>

        <div className="border-t pt-6">
          <p className="text-muted-foreground text-sm font-medium">Stock</p>
          <p className="text-lg">{data.unit}</p>
        </div>

        <div className="border-t pt-6">
          <p className="text-muted-foreground text-sm font-medium">
            Description
          </p>
          <p className="text-lg whitespace-pre-line">{data.description}</p>
        </div>
      </div>
    </section>
  );
}
