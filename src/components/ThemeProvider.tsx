"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "portfolio-theme";
export const DEFAULT_THEME: Theme = "light";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  /** False until the client has read the persisted theme. */
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // Private mode / blocked storage - fall through to the default.
  }
  return DEFAULT_THEME;
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // The server always renders DEFAULT_THEME; the effect below reconciles with
  // whatever the pre-paint script in layout.tsx already put on <html>.
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setThemeState(readStoredTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore - the theme still applies for this session.
    }
  }, [theme, mounted]);

  useEffect(() => {
    return () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, []);

  const setTheme = useCallback((next: Theme) => {
    // Colour transitions are opt-in so they only run while toggling.
    const root = document.documentElement;
    root.classList.add("theme-switching");
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      root.classList.remove("theme-switching");
    }, 300);

    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return context;
};
