"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeMode = "light" | "dark" | "system";

type ThemeModeContextType = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
};

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("dark");
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const savedMode = (localStorage.getItem("workout_theme_mode") as ThemeMode) || "dark";
    setModeState(savedMode);
    applyMode(savedMode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const currentSaved = (localStorage.getItem("workout_theme_mode") as ThemeMode) || "dark";
      if (currentSaved === "system") {
        const dark = e.matches;
        setIsDark(dark);
        if (dark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  const applyMode = (newMode: ThemeMode) => {
    let dark = true;
    if (newMode === "dark") {
      dark = true;
    } else if (newMode === "light") {
      dark = false;
    } else if (newMode === "system") {
      dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem("workout_theme_mode", newMode);
    applyMode(newMode);
    window.dispatchEvent(new CustomEvent("theme-mode-change", { detail: newMode }));
  };

  return (
    <ThemeModeContext.Provider value={{ mode, setMode, isDark }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return context;
}
