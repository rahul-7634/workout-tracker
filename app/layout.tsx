import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Sidebar from "./components/layout/Sidebar";
import MobileNav from "./components/layout/MobileNav";
import GradientBackground from "./components/layout/GradientBackground";
import { AuthProvider } from "./context/AuthContext";
import { ThemeModeProvider } from "./context/ThemeModeContext";
import AuthModal from "./components/auth/AuthModal";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Workout Tracker",
  description:
    "Track workouts, personal records, history, statistics, and progress.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("font-sans dark", geist.variable)}
    >
      <body className="relative min-h-screen text-slate-100 antialiased overflow-x-hidden">
        <ThemeModeProvider>
          <AuthProvider>
            {/* Dynamic Variable Gradient Backdrop */}
            <GradientBackground />

            {/* Interactive Login / Signup Modal */}
            <AuthModal />

            {/* Top Mobile Bar & Mobile Navigation Drawer (< md) */}
            <MobileNav />

            <div className="flex min-h-screen">
              {/* Desktop Fixed Glass Sidebar (>= md) */}
              <Sidebar />

              {/* Main Content Responsive Wrapper */}
              <main className="ml-0 md:ml-64 lg:ml-72 flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 transition-all duration-300 w-full max-w-7xl mx-auto">
                {children}
              </main>
            </div>
          </AuthProvider>
        </ThemeModeProvider>
      </body>
    </html>
  );
}