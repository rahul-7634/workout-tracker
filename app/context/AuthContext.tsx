"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserProfile = {
  name: string;
  email: string;
  goal: string;
  tier: "Member" | "Pro Athlete" | "VIP Elite";
  avatar: string;
};

type AuthContextType = {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string, goal: string) => boolean;
  loginAsDemo: () => void;
  logout: () => void;
  showAuthModal: boolean;
  authModalMode: "login" | "signup";
  openAuthModal: (mode?: "login" | "signup") => void;
  closeAuthModal: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const savedUser = localStorage.getItem("workout_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const login = (email: string, pass: string) => {
    // Simple authentication logic
    if (email && pass) {
      const newUser: UserProfile = {
        name: email.split("@")[0].toUpperCase(),
        email: email,
        goal: "Muscle Building & Strength",
        tier: "Pro Athlete",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      };
      setUser(newUser);
      localStorage.setItem("workout_user", JSON.stringify(newUser));
      setShowAuthModal(false);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, pass: string, goal: string) => {
    if (name && email && pass) {
      const newUser: UserProfile = {
        name: name,
        email: email,
        goal: goal || "General Fitness",
        tier: "Pro Athlete",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      };
      setUser(newUser);
      localStorage.setItem("workout_user", JSON.stringify(newUser));
      setShowAuthModal(false);
      return true;
    }
    return false;
  };

  const loginAsDemo = () => {
    const demoUser: UserProfile = {
      name: "Alex Rivera",
      email: "alex.rivera@gympro.com",
      goal: "Hypertrophy & Strength",
      tier: "VIP Elite",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    };
    setUser(demoUser);
    localStorage.setItem("workout_user", JSON.stringify(demoUser));
    setShowAuthModal(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("workout_user");
  };

  const openAuthModal = (mode: "login" | "signup" = "login") => {
    setAuthModalMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        loginAsDemo,
        logout,
        showAuthModal,
        authModalMode,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
