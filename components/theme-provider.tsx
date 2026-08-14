"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const STORAGE_KEY = "quizmaster-theme";

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    const initialTheme: Theme =
      saved === "light" || saved === "dark"
        ? saved
        : "dark";

    setThemeState(initialTheme);

    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(initialTheme);

    root.style.colorScheme = initialTheme;

    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);

    localStorage.setItem(STORAGE_KEY, newTheme);

    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(newTheme);

    root.style.colorScheme = newTheme;
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  /*
   * Server आणि client mismatch avoid करण्यासाठी
   */
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{
          theme,
          toggleTheme,
          setTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}
