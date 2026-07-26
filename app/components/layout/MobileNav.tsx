"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  History,
  BarChart3,
  Trophy,
  Calendar,
  Settings,
  Menu,
  X,
  Dumbbell,
  Sparkles,
  BookmarkPlus,
} from "lucide-react";

const navItems = [
  { title: "Home", href: "/", icon: House },
  { title: "Custom", href: "/custom", icon: BookmarkPlus },
  { title: "History", href: "/history", icon: History },
  { title: "Stats", href: "/statistics", icon: BarChart3 },
  { title: "Calendar", href: "/calendar", icon: Calendar },
];

const menuItems = [
  { title: "Dashboard", href: "/", icon: House },
  { title: "Custom Plan Builder", href: "/custom", icon: BookmarkPlus },
  { title: "History Logs", href: "/history", icon: History },
  { title: "Statistics & Progress", href: "/statistics", icon: BarChart3 },
  { title: "Personal Records", href: "/prs", icon: Trophy },
  { title: "Workout Calendar", href: "/calendar", icon: Calendar },
  { title: "Settings & Themes", href: "/settings", icon: Settings },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Mobile Header Bar (visible < md) */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-slate-950/80 p-4 backdrop-blur-xl md:hidden">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20">
            <Dumbbell className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-black text-white leading-none tracking-tight">
              Workout<span className="text-blue-500">Tracker</span>
            </h1>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">
              Pro Edition
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/custom"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-300 backdrop-blur-md active:scale-95 transition"
          >
            <BookmarkPlus className="h-4 w-4 text-blue-400" />
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-300 backdrop-blur-md active:scale-95 transition"
            aria-label="Open Navigation Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (fixed bottom < md) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-slate-950/90 p-2 backdrop-blur-2xl md:hidden">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-all ${
                  active
                    ? "text-blue-400 font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
                    active
                      ? "bg-blue-600/20 border border-blue-500/40 text-blue-400 shadow-md shadow-blue-500/20 scale-110"
                      : ""
                  }`}
                >
                  <Icon size={18} />
                </div>
                <span className="text-[10px] font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Full-screen Mobile Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-2xl md:hidden animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">Navigation</h2>
                <p className="text-xs text-slate-400">Workout Tracker Pro</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-900 text-slate-400"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto p-5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 rounded-2xl border p-4 font-medium transition-all ${
                    active
                      ? "border-blue-500/40 bg-blue-600/20 text-white shadow-lg shadow-blue-500/10"
                      : "border-white/5 bg-slate-900/40 text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      active ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <span className="text-base font-semibold">{item.title}</span>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-white/10 p-5 text-center text-xs text-slate-500">
            Workout Tracker Pro • Custom Plan Creator
          </div>
        </div>
      )}
    </>
  );
}
