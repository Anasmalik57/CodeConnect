"use client";

import { useEffect, useState } from "react";
import { Users, Boxes, TrendingUp, UserCog } from "lucide-react";
import { API_BASE } from "@/lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    developers: 0,
    projects: 0,
    users: 0,
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [devRes, projRes, userRes, meRes] = await Promise.all([
          fetch(`${API_BASE}/developers`),
          fetch(`${API_BASE}/projects`),
          fetch(`${API_BASE}/users`, { credentials: "include" }),
          fetch(`${API_BASE}/me`, { credentials: "include" }),
        ]);

        const devData = await devRes.json();
        const projData = await projRes.json();
        const userData = await userRes.json();
        const meData = await meRes.json();

        setStats({
          developers: devData.success ? devData.data.length : 0,
          projects: projData.success ? projData.data.length : 0,
          users: userData.success ? userData.count : 0,
        });

        if (meData.success) {
          setCurrentUser(meData.user);
        }
      } catch (err) {
        console.error("Dashboard stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-mono font-bold flex justify-start items-center">
            Welcome!{" "}
            <span className="ml-2 italic bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
             
              {currentUser?.email.split("@")[0]}
            </span>{" "}
            😃
          </h1>
          <p className="text-gray-400 mt-2">Overview of your platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Total Developers */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  Total Developers
                </p>
                {loading ? (
                  <div className="h-12 w-20 bg-white/10 rounded-lg mt-3 animate-pulse" />
                ) : (
                  <p className="text-5xl font-black text-blue-400 mt-3">
                    {stats.developers}
                  </p>
                )}
              </div>
              <div className="p-4 bg-blue-600/20 rounded-2xl">
                <Users className="w-10 h-10 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Total Projects */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  Total Softwares
                </p>
                {loading ? (
                  <div className="h-12 w-20 bg-white/10 rounded-lg mt-3 animate-pulse" />
                ) : (
                  <p className="text-5xl font-black text-green-400 mt-3">
                    {stats.projects}
                  </p>
                )}
              </div>
              <div className="p-4 bg-green-600/20 rounded-2xl">
                <Boxes className="w-10 h-10 text-green-400" />
              </div>
            </div>
          </div>

          {/* Admin Welcome / Total Users Card */}
          <div className="bg-linear-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-xl hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {loading ? (
                  <div className="space-y-3">
                    <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                    <div className="h-8 w-32 bg-white/10 rounded animate-pulse" />
                  </div>
                ) : (
                  currentUser?.role === "admin" && (
                    <>
                      <p className="text-purple-300 text-sm font-medium">
                        Total Users
                      </p>
                      <p className="text-5xl font-black text-purple-400 mt-3">
                        {stats?.users}
                      </p>
                    </>
                  )
                )}
              </div>
              <div className="p-4 bg-purple-600/20 rounded-2xl">
                {currentUser?.role === "admin" ? (
                  <UserCog className="w-10 h-10 text-purple-400" />
                ) : (
                  <TrendingUp className="w-10 h-10 text-purple-400" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
