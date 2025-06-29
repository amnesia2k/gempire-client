"use client";

import { extractApiError } from "@/lib/axios";
import { useLoginAdmin } from "../../lib/hooks/useAdmin";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Access() {
  const [code, setCode] = useState("");
  const [isPending, setIsPending] = useState(false); // 👈 manual pending state
  const { mutateAsync } = useLoginAdmin();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!code || isPending) return;

    setIsPending(true); // 👈 start loading

    const loginPromise = mutateAsync({ code })
      .then((data) => {
        toast.success(data.message);
        const token = data.data.token;
        const oneWeekInSeconds = 7 * 24 * 60 * 60;

        document.cookie = `admin-token=${token}; path=/; max-age=${oneWeekInSeconds}; secure; samesite=None`;

        router.push("/admin-dashboard");
      })
      .finally(() => setIsPending(false)); // 👈 reset loading regardless of result

    toast.promise(loginPromise, {
      loading: "Verifying access...",
      error: (err) => extractApiError(err),
    });

    setCode("");
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
    </form>
  );
}
