import axios, { type AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function extractApiError(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    (error as AxiosError).response
  ) {
    const axiosError = error as AxiosError;

    const message =
      (axiosError.response?.data as { message: string })?.message ??
      axiosError.response?.statusText ??
      "Unknown server error";

    return message;
  }

  if (error instanceof Error) return error.message;

  return "Something went wrong";
}
