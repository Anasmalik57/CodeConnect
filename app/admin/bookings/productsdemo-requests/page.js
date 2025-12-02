"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, User, Mail, Phone, Clock, Sparkles, AlertCircle } from "lucide-react";
import { API_BASE } from "@/lib/api";


export default function AdminRequestProductDemo() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`${API_BASE}/demo-requests`);
        const data = await res.json();
        if (data.success) {
          setRequests(data.data);
        } else {
          setError("Failed to load demo requests");
        }
      } catch (err) {
        setError("Network error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled": return "bg-blue-500/10 border-blue-500/20 text-blue-400";
      case "Completed": return "bg-green-500/10 border-green-500/20 text-green-400";
      case "Cancelled": return "bg-red-500/10 border-red-500/20 text-red-400";
      default: return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"; // Pending
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block size-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white text-xl">Loading demo requests...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-red-400 text-xl">{error}</div>
  );

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16 px-4 md:px-6">
      <div className="max-w-[1380px] mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Sparkles className="size-6 text-blue-400" />
          <h1 className="text-3xl font-bold">Product Demo Requests</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

              <div className="relative space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{req.name}</h3>
                    <p className="text-sm text-gray-400">{req.productName}</p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="size-4 text-blue-400" />
                    <span className="text-gray-300 truncate">{req.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="size-4 text-green-400" />
                    <span className="text-gray-300">{req.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="size-4 text-purple-400" />
                    <span className="text-gray-300 capitalize">{req.availabilityTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="size-4" />
                  <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                </div>

                <button
                  onClick={() => router.push(`/admin/bookings/productsdemo-requests/${req._id}`)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {requests.length === 0 && (
          <div className="text-center text-gray-400 mt-12">
            <AlertCircle className="size-12 mx-auto mb-4" />
            <p>No demo requests found</p>
          </div>
        )}
      </div>
    </div>
  );
}