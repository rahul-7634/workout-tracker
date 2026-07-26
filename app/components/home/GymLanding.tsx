"use client";

import { useAuth } from "../../context/AuthContext";
import {
  Dumbbell,
  ShieldCheck,
  Zap,
  Flame,
  Clock,
  MapPin,
  Trophy,
  Users,
  ChevronRight,
  Sparkles,
  Check,
  Star,
  ArrowRight,
  PlayCircle,
} from "lucide-react";

export default function GymLanding() {
  const { openAuthModal, loginAsDemo } = useAuth();

  const features = [
    {
      icon: Dumbbell,
      title: "Olympic Free Weights",
      desc: "5,000 sq ft dedicated weight room equipped with Eleiko plates, rogue racks, and custom dumbbells up to 150 lbs.",
      gradient: "from-blue-500/20 to-indigo-500/10 border-blue-500/30",
    },
    {
      icon: Zap,
      title: "High-Tech Cardio Zone",
      desc: "Technogym Skillruns, StairMasters, SkiErgs, and Assault Air Bikes with real-time heart rate and wattage telemetry.",
      gradient: "from-cyan-500/20 to-teal-500/10 border-cyan-500/30",
    },
    {
      icon: Flame,
      title: "Recovery & Spa Suite",
      desc: "Infrared saunas, 42°F cold plunge tubs, and Theragun massage lounges for maximum muscle recovery and hypertrophy.",
      gradient: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
    },
    {
      icon: Clock,
      title: "24/7 Keycard Access",
      desc: "Train on your schedule. Secure biometric and mobile NFC keycard entry 365 days a year, day or night.",
      gradient: "from-purple-500/20 to-pink-500/10 border-purple-500/30",
    },
  ];

  const plans = [
    {
      name: "Starter Gym Pass",
      price: "$49",
      period: "/month",
      badge: "Basic Access",
      features: [
        "Full Gym Floor & Weight Room",
        "Locker Room & Shower Facilities",
        "Mobile Workout Tracker App Access",
        "Standard Equipment Access",
      ],
      popular: false,
    },
    {
      name: "Pro Athlete Pass",
      price: "$89",
      period: "/month",
      badge: "Most Popular",
      features: [
        "Everything in Starter Pass",
        "24/7 Unlimited Keycard Entry",
        "Infrared Sauna & Cold Plunge Suite",
        "Personal Record Analytics Engine",
        "1 Monthly Personal Training Session",
      ],
      popular: true,
    },
    {
      name: "VIP Elite Membership",
      price: "$149",
      period: "/month",
      badge: "All Inclusive",
      features: [
        "Everything in Pro Athlete Pass",
        "VIP Locker Room & Towel Service",
        "Weekly 1-on-1 Coaching & Form Audits",
        "Custom Nutritional & Macro Plans",
        "Guest Passes (2 Per Month)",
      ],
      popular: false,
    },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl">
        {/* Background Image Accent */}
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-400 backdrop-blur-md">
            <Sparkles size={14} className="text-amber-400" /> Apex Athletic & Strength Club
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
            FORGE YOUR <span className="gradient-text-accent">LEGENDARY</span> PHYSIQUE
          </h1>

          <p className="text-base sm:text-lg text-slate-300">
            Welcome to Apex Fitness — a world-class training facility engineered for serious lifters, athletes, and fitness enthusiasts. Track sets, measure progressive overload, and break personal records.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => openAuthModal("signup")}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-7 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-blue-600/30 transition hover:scale-105 active:scale-95"
            >
              Join Apex Gym Now <ArrowRight size={18} />
            </button>

            <button
              onClick={loginAsDemo}
              className="inline-flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-6 py-3.5 text-sm font-extrabold text-amber-300 backdrop-blur-md transition hover:bg-amber-500/20 active:scale-95"
            >
              <Sparkles size={16} /> Instant Demo Account
            </button>
          </div>

          {/* Quick Badges */}
          <div className="flex items-center gap-6 pt-4 text-xs font-semibold text-slate-400 border-t border-white/10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" size={16} />
              <span>Certified Trainers</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-blue-400" size={16} />
              <span>Open 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="text-amber-400" size={16} />
              <span>State-of-the-Art Equipment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gym Facilities & Details Section */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs font-extrabold uppercase tracking-wider text-blue-400">
            World-Class Amenities
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Designed For Peak Performance
          </h2>
          <p className="text-sm text-slate-400">
            Everything you need for strength training, bodybuilding, cardio endurance, and active recovery.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className={`rounded-3xl border p-6 backdrop-blur-xl bg-slate-900/60 shadow-xl transition-all duration-300 hover:-translate-y-1 ${feat.gradient}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/80 border border-white/10 text-white shadow-md">
                  <Icon size={24} />
                </div>
                <h3 className="mt-4 text-lg font-black text-white">{feat.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gym Location & Operating Hours */}
      <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl grid gap-8 grid-cols-1 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <MapPin size={16} /> Location & Hours
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Apex Performance Club Headquarters
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Conveniently located in Metro City Center with dedicated private parking, locker rooms, high-speed Wi-Fi, and energy bar lounge.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <MapPin className="text-blue-400 shrink-0 mt-0.5" size={18} />
              <div>
                <strong className="text-white block">Address:</strong>
                742 Evergreen Fitness Boulevard, Suite 100, Metro City
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-slate-300">
              <Clock className="text-amber-400 shrink-0 mt-0.5" size={18} />
              <div>
                <strong className="text-white block">Facility Hours:</strong>
                Member Keycard Entry: <span className="text-emerald-400 font-bold">24 Hours / 7 Days A Week</span>
                <br />
                Staffed Front Desk: Mon - Sun (6:00 AM - 10:00 PM)
              </div>
            </div>
          </div>
        </div>

        {/* Membership Plans */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Membership Plans
          </div>
          <h3 className="text-2xl font-black text-white">Join The Apex Community</h3>

          <div className="space-y-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-4 backdrop-blur-md flex items-center justify-between transition ${
                  p.popular
                    ? "border-blue-500/50 bg-blue-600/15 shadow-lg"
                    : "border-white/10 bg-slate-950/40"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-extrabold text-white">{p.name}</h4>
                    {p.popular && (
                      <span className="rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-baseline gap-1 text-white">
                    <span className="text-xl font-black">{p.price}</span>
                    <span className="text-xs text-slate-400">{p.period}</span>
                  </div>
                </div>

                <button
                  onClick={() => openAuthModal("signup")}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 transition"
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
