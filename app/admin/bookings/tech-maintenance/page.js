"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Code, Link, Clock, Globe, Loader2 } from "lucide-react";

export const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://nodeskdevbackend.onrender.com/api";

export default function AdminTechMaintenaceEnqs() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`${API_BASE}/technical-maintenances`);
        if (!res.ok) throw new Error("Failed to fetch requests");
        const data = await res.json();
        setRequests(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><Loader2 className="w-12 h-12 text-blue-500 animate-spin" /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-black text-red-400">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-black/95 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 via-sky-400 to-teal-400 bg-clip-text text-transparent">
            Technical Maintenance Enquiries
          </h1>
          <div className="p-4 bg-linear-to-br from-blue-600/20 to-teal-600/20 border border-blue-500/30 rounded-2xl backdrop-blur-xl">
            <Code className="w-8 h-8 text-teal-400" />
          </div>
        </div>

        {requests.length === 0 ? (
          <p className="text-center text-white/60 text-lg">No enquiries found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="group relative bg-linear-to-br from-slate-900/80 to-slate-950/90 border border-blue-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-xl hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-900/50"
              >
                <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-teal-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-white">{req.category}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      req.status === "Pending" ? "bg-yellow-500/20 text-yellow-300" :
                      req.status === "Under Review" ? "bg-purple-500/20 text-purple-300" :
                      req.status === "In Progress" ? "bg-blue-500/20 text-blue-300" :
                      req.status === "Completed" ? "bg-green-500/20 text-green-300" :
                      "bg-red-500/20 text-red-300"
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 flex items-center gap-2">
                    <Link className="w-4 h-4 text-blue-400" /> {req.projectLink}
                  </p>
                  <p className="text-sm text-white/70 flex items-center gap-2">
                    <Code className="w-4 h-4 text-blue-400" /> {req.codeTypes.join(", ")}
                  </p>
                  <p className="text-sm text-white/70 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" /> {req.language}
                  </p>
                  <p className="text-sm text-white/70 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" /> {req.discussionTime}
                  </p>
                  <button
                    onClick={() => router.push(`/admin/bookings/tech-maintenance/${req._id}`)}
                    className="w-full py-3 bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 rounded-2xl font-bold text-white shadow-lg hover:shadow-sky-500/70 transition-all duration-400 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
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