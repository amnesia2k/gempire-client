"use client";

import { SpinnerDotted } from "spinners-react";

interface SpinnerProps {
  classes?: string;
  text?: string;
}

export default function SplashLoader({ text, classes }: SpinnerProps) {
  return (
    <div className={classes}>
      {" "}
      {/* flex h-screen w-full items-center justify-center min-h-[calc(100vh-200px)] */}
      <div className="flex animate-pulse flex-col items-center text-center">
        {/* <Image
          src="/perfume-loader.gif" // Replace with your own animation or image
          alt="Loading perfumes"
          width={120}
          height={120}
        /> */}

        <SpinnerDotted className="text-primary size-[120px]" color="primary" />
        <p className="text-base font-medium">
          {text}
          {/* Crafting your scent experience... */}
        </p>
      </div>
    </div>
  );
}
