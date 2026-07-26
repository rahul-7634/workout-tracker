"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../layout/Header";
import StatsCard from "./StatsCard";
import WorkoutCard from "./WorkoutCard";
import { Flame, Calendar, History, Sparkles, Dumbbell, Plus } from "lucide-react";
import { getDashboardStats } from "../../lib/stats";

export default function Dashboard() {
  const [stats, setStats] = useState({
    streak: 0,
    thisWeek: 0,
    totalSessions: 0,
  });

  useEffect(() => {
    setStats(getDashboardStats());
  }, []);

  const workouts = [
    {
      title: "Push A",
      subtitle: "Chest • Shoulders • Triceps Focus",
      href: "/push-a",
      image: "/images/push-a.png",
      exerciseCount: 6,
    },
    {
      title: "Pull A",
      subtitle: "Lat Width • Biceps • Upper Back",
      href: "/pull-a",
      image: "/images/pull-a.png",
      exerciseCount: 7,
    },
    {
      title: "Leg A",
      subtitle: "Quads Focus • Hamstrings • Calves",
      href: "/legs-a",
      image: "/images/leg-a.png",
      exerciseCount: 5,
    },
    {
      title: "Push B",
      subtitle: "Upper Chest • Side Delts • Triceps",
      href: "/push-b",
      image: "/images/push-b.png",
      exerciseCount: 6,
    },
    {
      title: "Pull B",
      subtitle: "Back Thickness • Rear Delts • Biceps",
      href: "/pull-b",
      image: "/images/pull-b.png",
      exerciseCount: 6,
    },
    {
      title: "Leg B",
      subtitle: "Hamstring Focus • Glutes • Quads",
      href: "/legs-b",
      image: "/images/leg-b.png",
      exerciseCount: 5,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <Header />

      {/* ─── Stats Section ─── */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Your Progress
            </p>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              At a Glance
            </h2>
          </div>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-3">
          <StatsCard
            title="Current Streak"
            value={String(stats.streak)}
            subtitle="Consecutive Days"
            icon={Flame}
            color="bg-orange-500"
            gradient="from-amber-500 via-orange-500 to-red-500"
          />
          <StatsCard
            title="This Week"
            value={String(stats.thisWeek)}
            subtitle="Sessions Logged"
            icon={Calendar}
            color="bg-emerald-500"
            gradient="from-emerald-500 via-teal-500 to-cyan-500"
          />
          <StatsCard
            title="All Time"
            value={String(stats.totalSessions)}
            subtitle="Total Workouts"
            icon={History}
            color="bg-blue-500"
            gradient="from-blue-600 via-indigo-600 to-purple-600"
          />
        </div>
      </section>

      {/* ─── Custom Plan CTA Banner ─── */}
      <section className="rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-blue-900/40 dark:via-indigo-900/30 dark:to-purple-900/30 p-6 backdrop-blur-xl shadow-sm dark:shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-1.5 flex-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Sparkles size={14} className="text-amber-500" /> Custom Training
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Build Your Own Workout Plan
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Mix & match from 30+ exercises across Chest, Back, Arms, and Legs. Set your own sets and rep targets.
          </p>
        </div>

        <Link
          href="/custom"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition whitespace-nowrap shrink-0"
        >
          <Plus size={16} /> Open Plan Builder →
        </Link>
      </section>

      {/* ─── Workout Programs Grid ─── */}
      <section>
        <div className="mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              <Dumbbell size={13} className="inline -mt-0.5 mr-1" />
              Preset Programs
            </p>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              Push / Pull / Legs Split
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Tap a card to start logging your session
          </p>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.title}
              title={workout.title}
              subtitle={workout.subtitle}
              href={workout.href}
              image={workout.image}
              exerciseCount={workout.exerciseCount}
            />
          ))}
        </div>
      </section>
    </div>
  );
}