"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Mail, Phone, FileText, Eye, Loader2 } from "lucide-react";
import { API_BASE } from "@/lib/api";


export default function AdminCodeInstallBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_BASE}/code-install-bookings`);
        if (!res.ok) throw new Error("Failed to load bookings");
        const data = await res.json();
        setBookings(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><Loader2 className="w-12 h-12 text-blue-500 animate-spin" /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-black text-red-400">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-black/95 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Code Installation Bookings
          </h1>
          <div className="p-4 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl backdrop-blur-xl">
            <Calendar className="w-8 h-8 text-cyan-400" />
          </div>
        </div>

        {bookings.length === 0 ? (
          <p className="text-center text-white/60 text-lg">No bookings found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="group relative bg-gradient-to-br from-slate-900/80 to-slate-950/90 border border-blue-500/20 rounded-2xl p-6 shadow-2xl backdrop-blur-xl hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-blue-900/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white">{booking.fullName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "Pending" ? "bg-yellow-500/20 text-yellow-300" :
                      booking.status === "Confirmed" ? "bg-blue-500/20 text-blue-300" :
                      booking.status === "In Progress" ? "bg-purple-500/20 text-purple-300" :
                      booking.status === "Completed" ? "bg-green-500/20 text-green-300" :
                      "bg-red-500/20 text-red-300"
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <p className="flex items-center gap-2 text-gray-300">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      {booking.email}
                    </p>
                    <p className="flex items-center gap-2 text-gray-300">
                      <Phone className="w-4 h-4 text-cyan-400" />
                      {booking.phone}
                    </p>
                    <p className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      {booking.callbackTime}
                    </p>
                    <p className="text-gray-400 line-clamp-2">
                      <FileText className="w-4 h-4 inline mr-2 text-cyan-400" />
                      {booking.projectBrief}
                    </p>
                  </div>

                  <button
                    onClick={() => router.push(`/admin/bookings/CodeInstallBooking/${booking._id}`)}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 rounded-xl font-bold text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                  >
                    <Eye className="w-5 h-5" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}