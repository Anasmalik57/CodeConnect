"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Code, AlertCircle } from "lucide-react";
import { API_BASE } from "@/lib/api";

export default function AdminDevEnquires() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(`${API_BASE}/enquiries`);
        const data = await response.json();
        if (data.success) {
          setEnquiries(data.data);
        } else {
          setError("Failed to load enquiries");
        }
      } catch (err) {
        setError("Network error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Reviewed":
        return "bg-blue-500/10 border-blue-500/20 text-blue-400";
      case "Contacted":
        return "bg-green-500/10 border-green-500/20 text-green-400";
      case "Closed":
        return "bg-purple-500/10 border-purple-500/20 text-purple-400";
      default:
        return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block size-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-xl">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-400 text-xl">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enquiries.map((enquiry) => (
          <div
            key={enquiry._id}
            className="relative bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            {/* Glow Effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative space-y-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {enquiry.clientName}
                  </h3>
                  <p className="text-sm text-gray-400">Client</p>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(
                    enquiry.status
                  )}`}
                >
                  {enquiry.status}
                </span>
              </div>

              {/* Developer Info */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <Code className="size-5 text-purple-400" />
                <div>
                  <p className="text-sm text-white font-medium">
                    {enquiry.developer.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    Developer ({enquiry.developer.level})
                  </p>
                </div>
              </div>

              {/* Project Quick Stats */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Project Type</p>
                  <p className="text-sm text-white font-medium">
                    {enquiry.projectType}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="size-4" />
                <span>{new Date(enquiry.createdAt).toLocaleDateString()}</span>
              </div>

              {/* View Details Button */}
              <button
                onClick={() =>
                  router.push(`/admin/bookings/dev-enquiries/${enquiry?._id}`)
                }
                className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {enquiries.length === 0 && (
        <div className="text-center text-gray-400 mt-12">
          <AlertCircle className="size-12 mx-auto mb-4" />
          <p>No enquiries found</p>
        </div>
      )}
    </>
  );
}
