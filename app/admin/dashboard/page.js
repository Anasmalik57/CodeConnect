"use client";

import { useEffect, useState } from "react";
import { Users, Boxes, TrendingUp, Home, Sparkles } from "lucide-react";
import { API_BASE } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState({
    developers: 0,
    projects: 0,
    totalUsers: 0,
    admins: 0,
    normalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, devRes, projRes, usersRes] = await Promise.all([
          fetch(`${API_BASE}/me`, { credentials: "include" }),
          fetch(`${API_BASE}/developers`),
          fetch(`${API_BASE}/projects`),
          fetch(`${API_BASE}/users`, { credentials: "include" }),
        ]);

        // Current User
        if (userRes.ok) {
          const userData = await userRes.json();
          setCurrentUser(userData.user || userData.data);
        }

        // Developers & Projects
        const devData = await devRes.json();
        const projData = await projRes.json();

        // All Users (Admin only route)
        let totalUsers = 0, admins = 0;
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          if (usersData.success && Array.isArray(usersData.data)) {
            totalUsers = usersData.data.length;
            admins = usersData.data.filter(u => u.role === "admin").length;
          }
        }

        setStats({
          developers: devData.success ? devData.data.length : 0,
          projects: projData.success ? projData.data.length : 0,
          totalUsers,
          admins,
          normalUsers: totalUsers - admins,
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const username = currentUser?.email?.split("@")[0] || "Admin";

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Welcome + Button */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold flex justify-center items-center ">
              Welcome back,{" "} <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{username}!</span>
            </h1>
            <p className="text-lg text-gray-300 mt-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Managing the future of freelance development
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 px-6 py-3.5 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105 active:scale-95"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Total Developers */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Developers</p>
                {loading ? (
                  <div className="h-12 w-20 bg-white/10 rounded-lg mt-3 animate-pulse" />
                ) : (
                  <p className="text-5xl font-black text-blue-400 mt-3">{stats.developers}</p>
                )}
              </div>
              <div className="p-4 bg-blue-600/20 rounded-2xl">
                <Users className="w-10 h-10 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Total Softwares */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Softwares</p>
                {loading ? (
                  <div className="h-12 w-20 bg-white/10 rounded-lg mt-3 animate-pulse" />
                ) : (
                  <p className="text-5xl font-black text-green-400 mt-3">{stats.projects}</p>
                )}
              </div>
              <div className="p-4 bg-green-600/20 rounded-2xl">
                <Boxes className="w-10 h-10 text-green-400" />
              </div>
            </div>
          </div>

          {/* Total Users Card (NEW) */}
          <div className="bg-linear-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-xl col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-300 text-sm font-medium">Platform Users</p>
                <p className="text-5xl font-black text-purple-400 mt-3">{stats.totalUsers}</p>
              </div>
              <Users className="w-12 h-12 text-purple-400" />
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Admins</span>
                <span className="font-bold text-pink-400">{stats.admins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Normal Users</span>
                <span className="font-bold text-cyan-400">{stats.normalUsers}</span>
              </div>
            </div>
          </div>

          {/* Platform Active */}
          <div className="bg-linear-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Status</p>
                <p className="text-2xl font-bold text-white mt-4">All Systems Active</p>
              </div>
              <TrendingUp className="w-12 h-12 text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}