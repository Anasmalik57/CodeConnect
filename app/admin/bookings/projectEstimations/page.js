"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Clock, Code2, FileText, Loader2 } from "lucide-react";
import { API_BASE } from "@/lib/api";

export default function AdminProjectEstimations() {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const res = await fetch(`${API_BASE}/project-estimations`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEstimates(data.data || []);
      } catch (err) {
        alert("Error loading estimation requests");
      } finally {
        setLoading(false);
      }
    };
    fetchEstimates();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-black/95 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Project Estimation Requests
          </h1>
          <div className="p-4 bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 border border-emerald-500/30 rounded-2xl backdrop-blur-xl">
            <FileText className="w-8 h-8 text-emerald-400" />
          </div>
        </div>

        {estimates.length === 0 ? (
          <p className="text-center text-white/60 text-lg">
            No estimation requests yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {estimates.map((item) => (
              <div
                key={item._id}
                className="group relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-emerald-500/20 rounded-2xl p-6 shadow-2xl backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white line-clamp-1">
                      {item.productType}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : item.status === "Under Review"
                          ? "bg-purple-500/20 text-purple-300"
                          : item.status === "Estimated"
                          ? "bg-blue-500/20 text-blue-300"
                          : item.status === "Approved"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-300">
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-400" /> {item.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-400" />{" "}
                      {item.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-emerald-400" />{" "}
                      {item.codingLangs.join(", ")}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400" />{" "}
                      {item.discussionTime}
                    </p>
                  </div>

                  <p className="text-sm text-gray-400 line-clamp-2">
                    {item.aboutProduct}
                  </p>

                  <button
                    onClick={() =>
                      router.push(
                        `/admin/bookings/projectEstimations/${item._id}`
                      )
                    }
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 rounded-xl font-bold text-white shadow-lg hover:shadow-emerald-500/60 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
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
