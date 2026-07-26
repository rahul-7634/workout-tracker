import { LucideIcon } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  gradient?: string;
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  gradient = "from-blue-600 to-indigo-600",
}: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 p-6 backdrop-blur-xl shadow-md dark:shadow-none transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:hover:shadow-blue-500/10 hover:border-slate-300 dark:hover:border-white/20">
      {/* Decorative glow blob */}
      <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl opacity-20 dark:opacity-30 transition-all duration-500 group-hover:scale-150 bg-gradient-to-tr ${gradient}`} />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0 space-y-1.5">
          <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white tabular-nums">
              {value}
            </h2>
          </div>

          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr ${gradient} text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
        >
          <Icon className="h-7 w-7" />
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className={`mt-5 h-1 w-full rounded-full bg-gradient-to-r ${gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
    </div>
  );
}