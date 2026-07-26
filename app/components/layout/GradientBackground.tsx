"use client";

import { useEffect, useState } from "react";
import { useThemeMode } from "../../context/ThemeModeContext";

export type GradientTheme =
  | "cosmic"
  | "cyber"
  | "emerald"
  | "sunset"
  | "obsidian";

export const THEMES: Record<
  GradientTheme,
  {
    name: string;
    description: string;
    badge: string;
    primary: string;
    secondary: string;
    accent: string;
    orb1: string;
    orb2: string;
    orb3: string;
  }
> = {
  cosmic: {
    name: "Cosmic Violet",
    description: "Deep space purple & neon violet mesh glow",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    primary: "#6366f1",
    secondary: "#a855f7",
    accent: "#ec4899",
    orb1: "rgba(99, 102, 241, 0.25)",
    orb2: "rgba(168, 85, 247, 0.20)",
    orb3: "rgba(236, 72, 153, 0.18)",
  },
  cyber: {
    name: "Cyber Cyan",
    description: "Electric cyan & neon blue futuristic pulse",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    primary: "#06b6d4",
    secondary: "#3b82f6",
    accent: "#6366f1",
    orb1: "rgba(6, 182, 212, 0.25)",
    orb2: "rgba(59, 130, 246, 0.20)",
    orb3: "rgba(99, 102, 241, 0.18)",
  },
  emerald: {
    name: "Emerald Titan",
    description: "Vibrant emerald & neon mint energy surge",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    primary: "#10b981",
    secondary: "#06b6d4",
    accent: "#84cc16",
    orb1: "rgba(16, 185, 129, 0.25)",
    orb2: "rgba(6, 182, 212, 0.20)",
    orb3: "rgba(132, 204, 22, 0.18)",
  },
  sunset: {
    name: "Sunset Flare",
    description: "High-intensity crimson & amber workout aura",
    badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    primary: "#f97316",
    secondary: "#ef4444",
    accent: "#eab308",
    orb1: "rgba(249, 115, 22, 0.25)",
    orb2: "rgba(239, 68, 68, 0.20)",
    orb3: "rgba(234, 179, 8, 0.18)",
  },
  obsidian: {
    name: "Obsidian Glow",
    description: "Sleek monochrome dark mode with subtle slate aura",
    badge: "bg-slate-500/20 text-slate-300 border-slate-500/30",
    primary: "#64748b",
    secondary: "#475569",
    accent: "#38bdf8",
    orb1: "rgba(100, 116, 139, 0.20)",
    orb2: "rgba(71, 85, 105, 0.18)",
    orb3: "rgba(56, 189, 248, 0.15)",
  },
};

export default function GradientBackground() {
  const { isDark } = useThemeMode();
  const [activeTheme, setActiveTheme] = useState<GradientTheme>("cosmic");
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const savedTheme = localStorage.getItem("workout_theme") as GradientTheme;
    if (savedTheme && THEMES[savedTheme]) {
      setActiveTheme(savedTheme);
    }

    const handleThemeChange = (e: CustomEvent<GradientTheme>) => {
      if (e.detail && THEMES[e.detail]) {
        setActiveTheme(e.detail);
      }
    };

    window.addEventListener(
      "theme-change" as any,
      handleThemeChange as EventListener
    );

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener(
        "theme-change" as any,
        handleThemeChange as EventListener
      );
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const themeConfig = THEMES[activeTheme];

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[-1] overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-slate-950" : "bg-slate-100"
      }`}
    >
      {/* Dynamic Mouse Highlight */}
      <div
        className="absolute inset-0 transition-all duration-700 opacity-40 blur-[120px]"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, ${themeConfig.orb1}, transparent 80%)`,
        }}
      />

      {/* Floating Animated Mesh Orbs */}
      <div
        className="absolute -left-20 -top-20 h-96 w-96 rounded-full blur-[140px] animate-pulse duration-10000"
        style={{
          backgroundColor: themeConfig.primary,
          opacity: isDark ? 0.3 : 0.2,
        }}
      />
      <div
        className="absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full blur-[160px] animate-bounce duration-12000"
        style={{
          backgroundColor: themeConfig.secondary,
          opacity: isDark ? 0.25 : 0.15,
        }}
      />
      <div
        className="absolute bottom-[-10%] left-1/3 h-[28rem] w-[28rem] rounded-full blur-[150px] animate-pulse duration-8000"
        style={{
          backgroundColor: themeConfig.accent,
          opacity: isDark ? 0.2 : 0.15,
        }}
      />

      {/* Ambient Grid Overlay */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] ${
          isDark ? "opacity-40" : "opacity-15 bg-[radial-gradient(#00000010_1px,transparent_1px)]"
        }`}
      />

      {/* Dynamic Vignette Overlay */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80"
            : "bg-gradient-to-b from-slate-100/30 via-transparent to-slate-200/60"
        }`}
      />
    </div>
  );
}
