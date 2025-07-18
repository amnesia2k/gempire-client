import { api } from "../axios";
import type {
  PromoCode,
  GetAllPromoCodesResponse,
  GetPromoCodeResponse,
  CreatePromoCodeResponse,
  UpdatePromoCodeResponse,
} from "../types";

// ➕ Create promo code
export const createPromoCode = async (
  data: Partial<PromoCode>,
): Promise<CreatePromoCodeResponse> => {
  const res = await api.post<CreatePromoCodeResponse>("/code", data);

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to create promo code");
};

// 📦 Get all promo codes (admin)
export const getAllPromoCodes = async (): Promise<GetAllPromoCodesResponse> => {
  const res = await api.get<GetAllPromoCodesResponse>("/code");
  console.log("API Response:", res.data);

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to fetch promo codes");
};

// 🔍 Get single promo code
export const getPromoCodeById = async (
  id: string,
): Promise<GetPromoCodeResponse> => {
  const res = await api.get<GetPromoCodeResponse>(`/code/${id}`);

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to fetch promo code");
};

// ✏️ Update promo code (PATCH)
export const updatePromoCode = async (
  id: string,
  updates: Partial<PromoCode>,
): Promise<UpdatePromoCodeResponse> => {
  const res = await api.patch<UpdatePromoCodeResponse>(`/code/${id}`, updates);

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to update promo code");
};
