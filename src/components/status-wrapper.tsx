"use client";

import useNetworkStatus from "@/lib/hooks/use-network-status";
import { WifiOff, ServerCrash } from "lucide-react";

export default function StatusWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOnline, isServerUp } = useNetworkStatus();

  // If offline or server down, show appropriate screen
  if (!isOnline) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-5 text-center">
        <WifiOff className="h-20 w-20 text-red-500" />
        <h1 className="text-2xl font-bold">You are offline</h1>
        <p className="mt-2 text-gray-500">
          Please check your internet connection.
        </p>
      </div>
    );
  }

  // if (!isServerUp) {
  //   return (
  //     <div className="flex h-screen flex-col items-center justify-center gap-5 text-center">
  //       <ServerCrash className="h-20 w-20 text-red-500" />
  //       <h1 className="text-2xl font-bold">Server is down</h1>
  //       <p className="mt-2 text-gray-500">
  //         We’re having trouble connecting to the server. Please try again later.
  //       </p>
  //     </div>
  //   );
  // }

  // Otherwise, render the app normally
  return <>{children}</>;
}
