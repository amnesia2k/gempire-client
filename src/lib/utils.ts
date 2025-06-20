import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ngn = process.env.NEXT_PUBLIC_CURRENCY ?? "₦";

export const cloudinaryBlur = (url: string) =>
  url.replace("/upload/", "/upload/e_blur:1000,q_1,w_20/");
