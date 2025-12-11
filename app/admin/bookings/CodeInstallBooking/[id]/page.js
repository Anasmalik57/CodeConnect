"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  Trash2,
  CheckCircle,
  Calendar,
  Mail,
  Phone,
  FileText,
  Languages,
} from "lucide-react";
import { API_BASE } from "@/lib/api";

export default function AdminCodeInstallBookingDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`${API_BASE}/code-install-booking/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setBooking(data.data);
        setStatus(data.data.status);
      } catch (err) {
        alert("Booking not found");
        router.back();
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id, router]);

  const handleUpdate = async () => {
    if (status === booking.status) return;
    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE}/code-install-booking/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setBooking(updated.data);
        alert("Status updated!");
      }
    } catch (err) {
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this booking permanently?")) return;
    setDeleting(true);
    try {
      await fetch(`${API_BASE}/code-install-booking/${id}`, {
        method: "DELETE",
      });
      alert("Deleted successfully");
      router.push("/admin/bookings/CodeInstallBooking");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-black/95 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="bg-linear-to-br from-slate-900/90 to-slate-950/90 border border-blue-500/30 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8">
            Booking Details
          </h1>

          <div className="grid md:grid-cols-2 gap-6 text-white/90">
            <div className="space-y-4">
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400" />{" "}
                <strong>Name:</strong> {booking.fullName}
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400" />{" "}
                <strong>Email:</strong> {booking.email}
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400" />{" "}
                <strong>Phone:</strong> {booking.phone}
              </p>
            </div>
            <div className="space-y-4">
              <p className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-cyan-400" />{" "}
                <strong>Callback Time:</strong> {booking.callbackTime}
              </p>
              <p className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-cyan-400" />{" "}
                <strong>Languages:</strong> {booking.languages.join(", ")}
              </p>
              <p className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : booking.status === "Confirmed"
                      ? "bg-blue-500/20 text-blue-300"
                      : booking.status === "In Progress"
                      ? "bg-purple-500/20 text-purple-300"
                      : booking.status === "Completed"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="flex items-start gap-3 text-gray-300">
              <FileText className="w-5 h-5 text-cyan-400 mt-1" />
              <span>
                <strong>Project Brief:</strong> {booking.projectBrief}
              </span>
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-5 py-3 bg-slate-800/70 border border-blue-500/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <button
              onClick={handleUpdate}
              disabled={updating || status === booking.status}
              className="px-8 py-3 bg-linear-to-r from-blue-600 to-cyan-500 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {updating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
              Update Status
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-8 py-3 bg-linear-to-r from-red-600 to-red-500 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
              Delete Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
