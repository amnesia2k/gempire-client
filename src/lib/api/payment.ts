/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../axios";

export type InitPaymentResponse = {
  success: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

export const initPayment = async (payload: {
  email: string;
  amount: number;
  subaccount: string;
  orderId: string;
  metadata: {
    name: string;
    email: string;
    orderId: string;
  };
}): Promise<InitPaymentResponse> => {
  const res = await api.post<InitPaymentResponse>(`/payment`, payload);

  if (res.data.success) {
    return res.data;
  }

  throw new Error(res.data.message || "Payment init failed");
};

export type VerifyTransactionResponse = {
  success: boolean;
  message: string;
  data: {
    status: string; // e.g. "success", "failed", "pending"
    reference: string;
    amount: number; // amount paid in kobo
    transaction_date: string;
    customer: {
      email: string;
      name?: string;
      phone?: string;
    };
    metadata: {
      orderId: string;
      name: string;
      email: string;
      [key: string]: any;
    };
  };
};

export const verifyTransaction = async (
  reference: string,
): Promise<VerifyTransactionResponse["data"]> => {
  const res = await api.get<VerifyTransactionResponse>(`/verify/${reference}`);

  if (res.data.success) return res.data.data;

  throw new Error(res.data.message || "Failed to verify transaction");
};
