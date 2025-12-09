"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link, Code2, Mail, Phone, Loader2 } from "lucide-react";
import { API_BASE } from "@/lib/api";


export default function AdminErrorFixingEnqs() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`${API_BASE}/error-fixings`);
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setRequests(data.data || []);
      } catch (err) {
        alert("Error loading requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><Loader2 className="w-12 h-12 text-red-500 animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-black/95 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
       

        {requests.length === 0 ? (
          <p className="text-center text-white/60 text-lg">No error fixing requests yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="group relative bg-linear-to-br from-slate-900/90 to-slate-950/90 border border-red-500/20 rounded-2xl p-6 shadow-2xl backdrop-blur-xl hover:border-red-500/50 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-linear-to-r from-red-600/10 to-purple-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white">{req.fullName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      req.status === "Pending" ? "bg-yellow-500/20 text-yellow-300" :
                      req.status === "Under Review" ? "bg-purple-500/20 text-purple-300" :
                      req.status === "In Progress" ? "bg-blue-500/20 text-blue-300" :
                      req.status === "Fixed" ? "bg-green-500/20 text-green-300" :
                      "bg-red-500/20 text-red-300"
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-300">
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-red-400" /> {req.email}</p>
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-red-400" /> {req.phone}</p>
                    <p className="flex items-center gap-2"><Code2 className="w-4 h-4 text-red-400" /> {req.codingLang.join(", ")}</p>
                    <p className="flex items-center gap-2 truncate"><Link className="w-4 h-4 text-red-400" /> {req.productUrl}</p>
                  </div>

                  <button
                    onClick={() => router.push(`/admin/bookings/errorFixing/${req._id}`)}
                    className="w-full py-3 bg-linear-to-r from-red-600 via-pink-500 to-purple-600 rounded-xl font-bold text-white shadow-lg hover:shadow-red-500/60 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
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