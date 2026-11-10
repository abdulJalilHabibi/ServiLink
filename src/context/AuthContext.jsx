import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContextObject";
import { DEMO_USERS } from "../data/demoUsers";

const STORAGE_AUTH_KEY = "servilink_auth_user";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_AUTH_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse auth user", e);
    }
    // Default logged in as Customer for instant rich experience
    return DEMO_USERS.customer;
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_AUTH_KEY);
      }
    } catch (e) {
      console.error("Failed to store auth user", e);
    }
  }, [currentUser]);

  const login = (email, _password, role = "customer") => {
    const demo = DEMO_USERS[role] || DEMO_USERS.customer;
    const userToSet = {
      ...demo,
      email: email || demo.email,
    };
    setCurrentUser(userToSet);
    return userToSet;
  };

  const register = (data) => {
    const role = data.role || "customer";
    const newUser = {
      id: `usr-${Date.now()}`,
      name: data.fullName || data.name || "New ServiLink User",
      email: data.email,
      phone: data.phone || "0799000000",
      role: role,
      district: data.district || "District 10 - Wazir Akbar Khan",
      address: data.address || "Kabul, Afghanistan",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
      tradeHeadline: role === "provider" ? data.tradeHeadline || "General Technician" : undefined,
      category: role === "provider" ? data.category || "electrical" : undefined,
      hourlyRate: role === "provider" ? Number(data.hourlyRate) || 35 : undefined,
      memberSince: "Just now",
    };
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role) => {
    if (role === "guest") {
      logout();
    } else if (DEMO_USERS[role]) {
      setCurrentUser(DEMO_USERS[role]);
    }
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...updatedFields } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        role: currentUser ? currentUser.role : "guest",
        login,
        register,
        logout,
        switchRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
