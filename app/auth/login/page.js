"use client";
import { useState } from "react";
import { Mail, Lock, Sparkles, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const handleSubmit = () => {
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (email === "dungadevteam" && password === "dungateam@aandra") {
        router.push('/admin/dashboard')
        // setEmail("");
        // setPassword("");
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-[90vh] bg-linear-to-br from-gray-950 via-blue-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
        
          <h1 className="text-4xl font-black bg-linear-to-r from-blue-400 via-sky-400 to-teal-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-blue-300/70 text-sm mt-2">Sign in to continue to your account</p>
        </div>

        {/* Form Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
          
          <div className="relative bg-black/60 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 shadow-2xl">
            <div className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm animate-pulse">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-blue-300/90">
                  Email
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-blue-400/60 group-hover/input:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-blue-500/30 rounded-2xl text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-blue-300/90">
                  Password
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-blue-400/60 group-hover/input:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-blue-500/30 rounded-2xl text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full group/btn relative px-8 py-4 bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 rounded-2xl font-bold text-white overflow-hidden shadow-2xl shadow-sky-500/40 hover:shadow-sky-500/70 transition-all duration-400 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Sign In
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-blue-300/50">
                Secured by{" "}
                <span className="font-semibold bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
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