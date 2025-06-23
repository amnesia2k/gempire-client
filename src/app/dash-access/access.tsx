"use client";

import { useLoginAdmin } from "../lib/hooks/useAdmin";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Access() {
  const [code, setCode] = useState("");
  const { mutate, isPending, isError, error } = useLoginAdmin();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending) return;

    mutate(
      { code },
      {
        onSuccess: (data) => {
          if (data.success && data.valid) {
            const token = data.data.token;
            const oneWeekInSeconds = 7 * 24 * 60 * 60;

            // ✅ Updated for prod-safe cookie
            document.cookie = `admin-token=${token}; path=/; max-age=${oneWeekInSeconds}; secure; samesite=None`;

            router.push("/admin-dashboard");
          } else {
            alert("Invalid access code");
          }
        },

        onError: () => {
          alert("Something went wrong during login.");
        },
      },
    );
    setCode(""); // Clear the input after submission
  };

  return (
    <form
      className="p-4e flex min-h-screen flex-col items-center justify-center space-y-5"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="code">Enter Access Code</label>
        <input
          type="password"
          name="code"
          id="code"
          placeholder="Access Code here..."
          className="rounded-xl border px-4 py-2"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={isPending}
          required
          autoFocus
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        className="cursor-pointer rounded-xl border px-4 py-2"
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Access Dashboard"}
      </button>

      {isError && (
        <div className="text-sm text-red-500">
          {error instanceof Error
            ? error.message
            : "Failed to access dashboard"}
        </div>
      )}
    </form>
  );
}
