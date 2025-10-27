"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/axios";

type ServerHealthResponse = {
  status: "success" | "error";
  message: string;
  redis?: string;
  timestamp?: string;
};

export default function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isServerUp, setIsServerUp] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  // Check browser network availability
  const updateNetworkStatus = useCallback(() => {
    setIsOnline(navigator.onLine);
  }, []);

  // Check server health via Axios
  const checkServerStatus = useCallback(async () => {
    try {
      const res = await api.get<ServerHealthResponse>("/", {
        timeout: 5000, // prevent hanging requests
      });

      // Axios type-safety ensures this isn't `any`
      const data = res.data;

      if (res.status === 200 && data.status === "success") {
        setIsServerUp(true);
      } else {
        setIsServerUp(false);
      }
    } catch (err) {
      setIsServerUp(false);
    } finally {
      setLastChecked(new Date());
    }
  }, []);

  useEffect(() => {
    updateNetworkStatus();
    if (navigator.onLine) void checkServerStatus();

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    const interval = setInterval(() => {
      if (navigator.onLine) void checkServerStatus();
    }, 30_000);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
      clearInterval(interval);
    };
  }, [updateNetworkStatus, checkServerStatus]);

  return { isOnline, isServerUp, lastChecked };
}
