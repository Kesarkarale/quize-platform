"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark"
          ? "Dark theme"
          : "Light theme"
      }
      title={
        theme === "dark"
          ? "Dark Mode"
          : "Light Mode"
      }
      className="
        group
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        border
        border-gray-200
        bg-white
        text-gray-600
        shadow-sm
        transition-all
        duration-200
        hover:scale-105
        hover:border-indigo-300
        hover:bg-indigo-50
        hover:text-indigo-600
        dark:border-white/10
        dark:bg-white/[0.05]
        dark:text-gray-300
        dark:hover:border-indigo-500/40
        dark:hover:bg-indigo-500/10
        dark:hover:text-indigo-400
      "
    >
      {theme === "dark" ? (
        <Moon
          size={18}
          className="transition-transform group-hover:-rotate-12"
        />
      ) : (
        <Sun
          size={18}
          className="transition-transform group-hover:rotate-45"
        />
      )}
    </button>
  );
}
