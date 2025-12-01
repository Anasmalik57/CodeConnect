"use client";

import { useEffect, useState } from "react";
import { Users, Package2, Home, Shield, Activity, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    developers: 0,
    projects: 0,
    totalUsers: 0,
    admins: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_BASE = "https://nodeskdevbackend.onrender.com/api";

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // First: Check if user is authenticated
        const userRes = await fetch(`${API_BASE}/me`, {
          credentials: "include",
        });

        if (!userRes.ok) {
          router.push("/auth/login");
          return;
        }

        const userData = await userRes.json();
        const currentUser = userData.user || userData.data;
        setUser(currentUser);

        // Only admins can see full stats
        if (currentUser.role !== "admin") {
          setLoading(false);
          return;
        }

        // Fetch stats in parallel
        const [devRes, projRes, usersRes] = await Promise.all([
          fetch(`${API_BASE}/developers`),
          fetch(`${API_BASE}/projects`),
          fetch(`${API_BASE}/users`, { credentials: "include" }),
        ]);

        const [devData, projData, usersData] = await Promise.all([
          devRes.json(),
          projRes.json(),
          usersRes.ok ? usersRes.json() : { data: [] },
        ]);

        const totalUsers = Array.isArray(usersData.data) ? usersData.data.length : 0;
        const admins = Array.isArray(usersData.data)
          ? usersData.data.filter(u => u.role === "admin").length
          : 0;

        setStats({
          developers: devData.success ? devData.data.length : 0,
          projects: projData.success ? projData.data.length : 0,
          totalUsers,
          admins,
        });
      } catch (err) {
        console.error("Dashboard load failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  const username = user?.email?.split("@")[0] || "Admin";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-gray-950 pointer-events-none" />

      <div className="relative z-10 p-6 lg:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {username}
                </span>
              </h1>
              <p className="text-gray-400 mt-2 text-lg">
                Here's what's happening on your platform today
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 px-5 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 transition-all hover:scale-105"
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
                className="flex items-center gap-2 px-5 py-3 bg-red-900/50 hover:bg-red-800/70 rounded-xl border border-red-800/50 transition-all hover:scale-105"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Developers */}
          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-blue-400" />
              <span className="text-3xl font-bold text-blue-400">{stats.developers}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Developers</p>
          </div>

          {/* Total Projects */}
          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Package2 className="w-10 h-10 text-green-400" />
              <span className="text-3xl font-bold text-green-400">{stats.projects}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Softwares</p>
          </div>

          {/* Total Users */}
          {user.role === "admin" && (
            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Shield className="w-10 h-10 text-purple-400" />
                <span className="text-3xl font-bold text-purple-400">{stats.totalUsers}</span>
              </div>
              <p className="text-gray-400 text-sm">Platform Users</p>
              <div className="mt-3 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Admins</span>
                  <span className="text-purple-300 font-medium">{stats.admins}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Users</span>
                  <span className="text-cyan-300 font-medium">{stats.totalUsers - stats.admins}</span>
                </div>
              </div>
            </div>
          )}

          {/* System Status */}
          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 backdrop-blur border border-green-800/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-10 h-10 text-green-400" />
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-green-300 font-semibold">All Systems Active</p>
            <p className="text-gray-500 text-xs mt-1">Last update: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-600 text-sm">
          <p>NoDeskDeveloper Admin Panel © {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}