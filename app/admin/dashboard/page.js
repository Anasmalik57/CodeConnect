"use client";

import { useEffect, useState } from "react";
import { Users, Package2, Home, Shield, Activity, LogOut, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    developers: "-",
    projects: "-",
    totalUsers: "-",
    admins: "-",
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const API_BASE = "https://nodeskdevbackend.onrender.com/api";

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Step 1: Fetch current user
        const meRes = await fetch(`${API_BASE}/me`, {
          method: "GET",
          credentials: "include",
        });

        if (!meRes.ok) {
          router.push("/auth/login");
          return;
        }

        const meData = await meRes.json();
        const currentUser = meData.user || meData.data;
        if (!currentUser?.email) {
          router.push("/auth/login");
          return;
        }
        setUser(currentUser);

        // Step 2: Fetch public stats (developers & projects)
        const [devRes, projRes] = await Promise.all([
          fetch(`${API_BASE}/developers`),
          fetch(`${API_BASE}/projects`),
        ]);

        const devData = devRes.ok ? await devRes.json() : {};
        const projData = projRes.ok ? await projRes.json() : {};

        let totalUsers = "-", admins = "-";
        let normalUsers = "-";

        // Step 3: Only admin gets user stats
        if (currentUser.role === "admin") {
          const usersRes = await fetch(`${API_BASE}/users`, {
            credentials: "include",
          });

          if (usersRes.ok) {
            const usersData = await usersRes.json();
            if (usersData.success && Array.isArray(usersData.data)) {
              totalUsers = usersData.data.length;
              admins = usersData.data.filter(u => u.role === "admin").length;
              normalUsers = totalUsers - admins;
            }
          }
        }

        setStats({
          developers: devData.success ? devData.data?.length || 0 : 0,
          projects: projData.success ? projData.data?.length || 0 : 0,
          totalUsers,
          admins: currentUser.role === "admin" ? admins : "-",
          normalUsers: currentUser.role === "admin" ? normalUsers : "-",
        });
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  const username = user?.email?.split("@")[0] || "User";

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-gray-400 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Subtle Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-gray-950 pointer-events-none" />

      <div className="relative z-10 p-6 lg:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {username}
                </span>
                {user.role === "admin" && (
                  <span className="ml-4 inline-block px-4 py-1.5 text-sm font-bold bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/50">
                    ADMIN PANEL
                  </span>
                )}
              </h1>
              <p className="text-gray-400 mt-4 text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                {user.role === "admin"
                  ? "You have full control over the platform"
                  : "Explore developers & ready-made softwares"}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-3 px-6 py-3.5 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 transition-all hover:scale-105"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Homepage</span>
              </button>

              <button
                onClick={async () => {
                  await fetch(`${API_BASE}/logout`, {
                    method: "POST",
                    credentials: "include",
                  });
                  router.push("/");
                }}
                className="flex items-center gap-3 px-6 py-3.5 bg-red-900/30 hover:bg-red-900/50 rounded-xl border border-red-800/50 transition-all hover:scale-105"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Developers */}
          <StatCard icon={<Users className="w-10 h-10" />} title="Total Developers" value={stats.developers} color="blue" />

          {/* Softwares */}
          <StatCard icon={<Package2 className="w-10 h-10" />} title="Total Softwares" value={stats.projects} color="green" />

          {/* Admin Only: Users Stats */}
          {user.role === "admin" && (
            <div className="bg-gray-900/50 backdrop-blur border border-purple-800/30 rounded-2xl p-6 hover:border-purple-700/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Shield className="w-10 h-10 text-purple-400" />
                <span className="text-4xl font-bold text-purple-400">{stats.totalUsers}</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">Total Platform Users</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Admins</span>
                  <span className="text-purple-300 font-bold">{stats.admins}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Normal Users</span>
                  <span className="text-cyan-300 font-bold">{stats.normalUsers}</span>
                </div>
              </div>
            </div>
          )}

          {/* System Status */}
          <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-green-800/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-10 h-10 text-green-400" />
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            </div>
            <p className="text-green-300 font-bold">All Systems Active</p>
            <p className="text-gray-500 text-xs mt-1">Updated: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 text-sm">
            © 2025 NoDeskDeveloper • {user.role === "admin" ? "Full Admin Access" : "User Dashboard"}
          </p>
        </div>
      </div>
    </div>
  );
}

// Reusable Clean Stat Card
function StatCard({ icon, title, value, color }) {
  const colorClasses = {
    blue: "text-blue-400",
    green: "text-green-400",
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={colorClasses[color]}>{icon}</div>
        <span className={`text-4xl font-bold ${colorClasses[color]}`}>{value}</span>
      </div>
      <p className="text-gray-400 text-sm">{title}</p>
    </div>
  );
}