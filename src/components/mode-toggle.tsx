"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      // size="icon"
      onClick={toggleTheme}
      className="size-10! rounded-full"
    >
      <Sun className="absolute size-[20px] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <Moon className="size-[20px] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
