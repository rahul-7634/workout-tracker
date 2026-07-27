"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  History,
  BarChart3,
  Trophy,
  Calendar,
  Settings,
  Dumbbell,
  ChevronRight,
  BookmarkPlus,
} from "lucide-react";

const menu = [
  { title: "Dashboard", href: "/", icon: House },
  { title: "Custom Plan", href: "/custom", icon: BookmarkPlus },
  { title: "History", href: "/history", icon: History },
  { title: "Statistics", href: "/statistics", icon: BarChart3 },
  { title: "PRs", href: "/prs", icon: Trophy },
  { title: "Calendar", href: "/calendar", icon: Calendar },
  { title: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen md:flex md:w-64 lg:w-72 flex-col border-r border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-950/70 backdrop-blur-2xl transition-all">
      {/* Brand */}
      <div className="flex items-center gap-3.5 border-b border-slate-200/80 dark:border-white/10 p-6">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-blue-500/25">
          <Dumbbell className="h-6 w-6 text-white" />
          <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-white dark:ring-slate-950" />
        </div>

        <div>
          <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Workout
            <span className="text-blue-600 dark:text-blue-400">
              Tracker
            </span>
          </h1>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track your workouts & progress
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1 space-y-1.5 px-4 overflow-y-auto">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                active
                  ? "border border-blue-500/40 bg-blue-600/10 dark:bg-gradient-to-r dark:from-blue-600/30 dark:to-indigo-600/20 text-blue-700 dark:text-white shadow-lg shadow-blue-600/10 font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:border-slate-200 hover:bg-slate-100 dark:hover:border-white/5 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {active && (
                <div className="absolute -left-4 top-1/2 h-8 w-1.5 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-blue-500 to-indigo-600 shadow-md shadow-blue-500/50" />
              )}

              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/30"
                      : "bg-slate-100 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-800 group-hover:text-slate-900 dark:group-hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                </div>

                <span className="text-sm tracking-wide">
                  {item.title}
                </span>
              </div>

              <ChevronRight
                size={16}
                className={`transition-transform duration-300 ${
                  active
                    ? "opacity-100 text-blue-600 dark:text-blue-400 translate-x-0.5"
                    : "opacity-0 text-slate-400 group-hover:opacity-100 group-hover:translate-x-0.5"
                }`}
              />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}