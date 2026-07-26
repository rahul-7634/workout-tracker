import Link from "next/link";
import { ArrowRight, Dumbbell, Play } from "lucide-react";

type WorkoutCardProps = {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  exerciseCount?: number;
};

export default function WorkoutCard({
  title,
  subtitle,
  href,
  image,
  exerciseCount = 5,
}: WorkoutCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative h-72 overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-slate-100 dark:bg-slate-900/60 shadow-md dark:shadow-none transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/40">
        {/* Cover Image */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 via-40% to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

        {/* Top Badge & Play button - Consistent alignment */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
            <Dumbbell className="h-3.5 w-3.5 text-blue-400" />
            {exerciseCount} Exercises
          </span>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-blue-600/80 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 shadow-lg shadow-blue-600/30">
            <Play className="h-4 w-4 fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom Content - Consistent padding & spacing */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
          <h2 className="text-2xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-blue-300 leading-tight">
            {title}
          </h2>

          <p className="mt-1 text-xs font-semibold text-slate-300 line-clamp-1">
            {subtitle}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-400 transition-all duration-300 group-hover:gap-3 group-hover:text-blue-300">
            <span>Start Workout Session</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}