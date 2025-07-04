import React, { Suspense } from "react";
import Success from "./success";
import Loader from "@/components/loader";

export default function SuccessPage() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Success />
      </Suspense>
    </div>
  );
}
