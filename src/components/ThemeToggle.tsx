"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();
  const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      aria-pressed={mounted ? theme === "light" : undefined}
      className="fixed z-50 grid text-foreground border rounded-full cursor-pointer top-4 right-4 md:top-6 md:right-6 size-11 md:size-12 place-items-center bg-blurfg-100 border-border glass hover:bg-red-400 hover:text-on-accent hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-[background-color,color,transform] duration-200"
    >
      {/* Both icons stay mounted and are swapped by the `dark` class on <html>,
          so the correct one is painted server-side with no hydration flicker. */}
      <Sun
        aria-hidden
        className="col-start-1 row-start-1 transition-all duration-300 rotate-90 scale-0 opacity-0 size-5 dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
      <Moon
        aria-hidden
        className="col-start-1 row-start-1 transition-all duration-300 rotate-0 scale-100 opacity-100 size-5 dark:-rotate-90 dark:scale-0 dark:opacity-0"
      />
    </button>
  );
};
