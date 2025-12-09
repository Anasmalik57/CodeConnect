"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FolderCode, Eye, Loader2 } from "lucide-react";
import { API_BASE } from "@/lib/api";


export default function AdminInstallOwnCode() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`${API_BASE}/install-requests`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/90">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/90 text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/90 p-8">
      <div className="max-w-7xl mx-auto">
       

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.length === 0 ? (
            <p className="text-white/70 col-span-full text-center">No enquiries found</p>
          ) : (
            requests.map((req) => (
              <div
                key={req._id}
                className="group relative bg-black/80 border border-blue-500/30 rounded-2xl p-6 shadow-xl shadow-blue-900/50 hover:shadow-blue-900/70 transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-sky-600/30 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity" />
                <div className="relative">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <FolderCode className="w-5 h-5 text-blue-400" />
                    {req.productLinkOrName}
                  </h3>
                  <p className="text-sm text-white/70 mb-2">
                    <span className="font-medium text-blue-300">Setup Type:</span> {req.setupType}
                  </p>
                  <p className="text-sm text-white/70 mb-2">
                    <span className="font-medium text-blue-300">Coding Language:</span> {req.codingLanguage}
                  </p>
                  <p className="text-sm text-white/70 mb-2">
                    <span className="font-medium text-blue-300">Preferred Languages:</span> {req.preferredLanguage.join(", ")}
                  </p>
                  <p className="text-sm text-white/70 mb-2">
                    <span className="font-medium text-blue-300">Communication:</span> {req.communicationLanguage}
                  </p>
                  <p className="text-sm text-white/70 mb-2">
                    <span className="font-medium text-blue-300">Preferred Time:</span> {req.preferredTime}
                  </p>
                  <p className="text-sm text-white/70 mb-4">
                    <span className="font-medium text-blue-300">Status:</span>{" "}
                    <span className={`px-2 py-1 rounded-full text-xs ${req.status === "Pending" ? "bg-yellow-500/20 text-yellow-300" : req.status === "In Progress" ? "bg-blue-500/20 text-blue-300" : req.status === "Completed" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                      {req.status}
                    </span>
                  </p>
                  <button
                    onClick={() => router.push(`/admin/bookings/installcode-enquaries/${req._id}`)}
                    className="w-full py-3 bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 rounded-2xl font-bold text-white shadow-2xl shadow-sky-500/40 hover:shadow-sky-500/70 transition-all duration-400 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-5 h-5" />
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}