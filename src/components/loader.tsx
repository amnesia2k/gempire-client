import React from "react";

export default function Loader() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="border-primary h-[110px] w-[110px] animate-spin rounded-full border-b-[3px]" />
    </div>
  );
}
