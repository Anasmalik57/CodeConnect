"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, MapPin, Link, FileText, Briefcase, Loader2 } from "lucide-react";

export const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://nodeskdevbackend.onrender.com/api";

export default function AdminCareerEnquiries() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`${API_BASE}/careers`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setApplications(data.data || []);
      } catch (err) {
        alert("Error loading career applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/95 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">


        {applications.length === 0 ? (
          <p className="text-center text-white/60 text-lg">No applications yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="group relative bg-linear-to-br from-slate-900/90 to-slate-950/90 border border-emerald-500/20 rounded-2xl p-6 shadow-2xl backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-linear-to-r from-emerald-600/10 to-cyan-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white">{app.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        app.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : app.status === "reviewed"
                          ? "bg-blue-500/20 text-blue-300"
                          : app.status === "accepted"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-300">
                    <p className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-400" /> {app.role}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-400" /> {app.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400" /> {app.city}, {app.state}
                    </p>
                    <p className="flex items-center gap-2 truncate">
                      <Link className="w-4 h-4 text-emerald-400" /> {app.profileLink}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-emerald-600/20 border border-emerald-500/40 rounded-lg text-center text-emerald-300 text-xs font-medium hover:bg-emerald-600/30 transition"
                    >
                      <FileText className="w-4 h-4 inline mr-1" /> {app.resumeName}
                    </a>
                  </div>

                  <button
                    onClick={() => router.push(`/admin/bookings/CareerPageEnquiries/${app._id}`)}
                    className="w-full py-3 bg-linear-to-r from-emerald-600 via-teal-500 to-cyan-600 rounded-xl font-bold text-white shadow-lg hover:shadow-emerald-500/60 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                  >
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