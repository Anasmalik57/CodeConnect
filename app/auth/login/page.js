"use client";

import { useState } from "react";
import { Mail, Lock, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/api";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Step 1: Try Login First
      let res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim(), password }),
        credentials: "include",
      });

      let data = await res.json();

      // If login success → redirect
      if (res.ok && data.success) {
        const role = data.user?.role || "user";
        router.push(role === "admin" ? "/admin/dashboard" : "/");
        return;
      }

      // Step 2: If login fails → Try Register (only if "User not found" type error)
      if (res.status === 401 || data.message?.toLowerCase().includes("invalid")) {
        const registerRes = await fetch(`${API_BASE}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.toLowerCase().trim(), password }),
          credentials: "include",
        });

        const registerData = await registerRes.json();

        if (registerRes.ok && registerData.success) {
          const role = registerData.user?.role || "user";
          router.push(role === "admin" ? "/admin/dashboard" : "/");
          return;
        } else {
          setError(registerData.message || "Registration failed");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Network error. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] bg-linear-to-br from-gray-950 via-blue-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-linear-to-r from-blue-400 via-sky-400 to-teal-400 bg-clip-text text-transparent">
            Welcome to NoDeskDeveloper
          </h1>
          <p className="text-blue-300/70 text-sm mt-2">
            Login or create account instantly
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />

          <div className="relative bg-black/60 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 shadow-2xl">
            <div className="space-y-6">
              {/* Error Alert */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm animate-pulse">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-blue-300/90">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="you@example.com"
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-blue-500/30 rounded-2xl text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-blue-300/90">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/60" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-blue-500/30 rounded-2xl text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full relative px-8 py-4 bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 rounded-2xl font-bold text-white shadow-2xl shadow-sky-500/40 hover:shadow-sky-500/70 transition-all duration-300 hover:scale-[1.02] active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Continue with Email
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-blue-300/50">
                Secured by{" "}
                <span className="font-bold bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  NoDeskDeveloper
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}