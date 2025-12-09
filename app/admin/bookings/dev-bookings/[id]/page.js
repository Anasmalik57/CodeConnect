// File: app/admin/bookings/[id]/page.js
// This is the detail component that fetches a single booking by ID and allows status update

"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Phone, Code, IndianRupee, FileText, Calendar, Sparkles, Check } from "lucide-react";
import { API_BASE } from "@/lib/api";


export default function BookingDetail() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`${API_BASE}/booking/${params.id}`);
        const data = await response.json();
        if (data.success) {
          setBooking(data.data);
          setNewStatus(data.data.status);
        } else {
          setError("Booking not found");
        }
      } catch (err) {
        setError("Network error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchBooking();
    }
  }, [params.id]);

  const handleUpdateStatus = async () => {
    if (newStatus === booking.status) return;
    setUpdating(true);
    try {
      const response = await fetch(`${API_BASE}/booking/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setBooking(data.data);
        alert("Status updated successfully!");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      alert("Network error");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed": return "bg-green-500/10 border-green-500/20 text-green-400";
      case "In Progress": return "bg-blue-500/10 border-blue-500/20 text-blue-400";
      case "Completed": return "bg-purple-500/10 border-purple-500/20 text-purple-400";
      case "Cancelled": return "bg-red-500/10 border-red-500/20 text-red-400";
      default: return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block size-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-xl">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-400 text-xl">
        {error || "Booking not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16 px-4 md:px-6">
      <div className="max-w-[1380px] mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-all px-4 py-2 rounded-full bg-blue-900/40"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Bookings</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Card */}
          <div className="relative bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Sparkles className="size-6 text-blue-400" />
                <h1 className="text-3xl font-bold">Booking Details</h1>
              </div>

              {/* Client Info */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Client Information</h3>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <User className="size-5 text-blue-400" />
                  <span>{booking.clientName}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <Mail className="size-5 text-blue-400" />
                  <span>{booking.email}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <Phone className="size-5 text-blue-400" />
                  <span>{booking.phone}</span>
                </div>
              </div>

              {/* Developer Info */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Developer Information</h3>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <User className="size-5 text-purple-400" />
                  <span>{booking.developer.name} ({booking.developer.level})</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <Calendar className="size-5 text-purple-400" />
                  <span>{booking.developer.experience} Years Experience</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <IndianRupee className="size-5 text-purple-400" />
                  <span>₹{booking.developer.hourlyRate}/hr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project & Status Card */}
          <div className="relative bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative space-y-6">
              {/* Project Info */}
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-white">Project Information</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Type</p>
                  <p className="text-sm text-white">{booking.projectType}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Budget</p>
                  <p className="text-sm text-white">₹{booking.estimatedBudget}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Description</p>
                  <p className="text-sm text-white">{booking.description}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Booked On</p>
                  <p className="text-sm text-white">
                    {new Date(booking.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Status Update */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Update Status</h3>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(booking.status)} mb-4`}
                >
                  Current: {booking.status}
                </span>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="Pending" className="bg-black">Pending</option>
                  <option value="Confirmed" className="bg-black">Confirmed</option>
                  <option value="In Progress" className="bg-black">In Progress</option>
                  <option value="Completed" className="bg-black">Completed</option>
                  <option value="Cancelled" className="bg-black">Cancelled</option>
                </select>
                <button
                  onClick={handleUpdateStatus}
                  disabled={updating || newStatus === booking.status}
                  className={`w-full py-3 flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl transition-all shadow-lg ${
                    updating || newStatus === booking.status
                      ? "opacity-80 cursor-not-allowed"
                      : "hover:from-blue-500 hover:to-purple-500 shadow-blue-500/40"
                  }`}
                >
                  {updating ? (
                    <>
                      <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Check className="size-4" />
                      Update Status
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}