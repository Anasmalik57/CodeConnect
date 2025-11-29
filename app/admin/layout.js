// app/admin/layout.js

"use client";

import {
  LayoutDashboard,
  Users,
  Package,
  CalendarDays,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/all-developers", label: "All Developers", icon: Users },
    { href: "/admin/softwares", label: "Softwares", icon: Package },
    { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative flex">
        {/* Sidebar */}
        <aside className="w-72 fixed inset-y-0 left-0 z-50">
          <div className="h-full bg-linear-to-b from-white/5 to-white/2 backdrop-blur-2xl border-r border-white/10 flex flex-col">
            {/* Logo */}
            <div className="h-20 flex items-center justify-center border-b border-white/10 flex px-8">
              <h1 className="text-2xl font-black bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Admin Panel
              </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-6 py-8 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative
                      ${
                        isActive
                          ? "bg-linear-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/40 shadow-lg shadow-blue-500/20"
                          : "hover:bg-white/5 border border-transparent"
                      }
                    `}
                  >
                   

                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        isActive
                          ? "text-blue-400"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        isActive
                          ? "text-white"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-6 border-t border-white/10">
              <button className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 transition-all group">
                <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                <span className="font-medium text-gray-300 group-hover:text-white">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-72 min-h-screen">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
}
