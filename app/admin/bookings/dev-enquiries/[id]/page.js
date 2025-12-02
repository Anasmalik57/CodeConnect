"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Code, Calendar, Sparkles, Check, Trash, IndianRupee } from "lucide-react";
import { API_BASE } from "@/lib/api";


export default function EnquiryDetail() {
  const params = useParams();
  const router = useRouter();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const response = await fetch(`${API_BASE}/enquiry/${params.id}`);
        const data = await response.json();
        if (data.success) {
          setEnquiry(data.data);
          setNewStatus(data.data.status);
        } else {
          setError("Enquiry not found");
        }
      } catch (err) {
        setError("Network error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchEnquiry();
    }
  }, [params.id]);

  const handleUpdateStatus = async () => {
    if (newStatus === enquiry.status) return;
    setUpdating(true);
    try {
      const response = await fetch(`${API_BASE}/enquiry/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setEnquiry(data.data);
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

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    setDeleting(true);
    try {
      const response = await fetch(`${API_BASE}/enquiry/${params.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        alert("Enquiry deleted successfully!");
        router.push("/admin/dev-enquiries"); // Redirect back to list
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (err) {
      alert("Network error");
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Reviewed": return "bg-blue-500/10 border-blue-500/20 text-blue-400";
      case "Contacted": return "bg-green-500/10 border-green-500/20 text-green-400";
      case "Closed": return "bg-purple-500/10 border-purple-500/20 text-purple-400";
      default: return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"; // New
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block size-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-xl">Loading enquiry details...</p>
        </div>
      </div>
    );
  }

  if (error || !enquiry) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-400 text-xl">
        {error || "Enquiry not found"}
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
          <span className="text-sm">Back to Enquiries</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enquiry Card */}
          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Sparkles className="size-6 text-blue-400" />
                <h1 className="text-3xl font-bold">Enquiry Details</h1>
              </div>

              {/* Client Info */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Client Information</h3>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <User className="size-5 text-blue-400" />
                  <span>{enquiry.clientName}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <Mail className="size-5 text-blue-400" />
                  <span>{enquiry.email}</span>
                </div>
              </div>

              {/* Developer Info */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Developer Information</h3>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <Code className="size-5 text-purple-400" />
                  <span>{enquiry.developer.name} ({enquiry.developer.level})</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <Calendar className="size-5 text-purple-400" />
                  <span>{enquiry.developer.experience} Years Experience</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <IndianRupee className="size-5 text-purple-400" />
                  <span>₹{enquiry.developer.hourlyRate}/hr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project & Status Card */}
          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative space-y-6">
              {/* Project Info */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Project Information</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Type</p>
                  <p className="text-sm text-white">{enquiry.projectType}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Description</p>
                  <p className="text-sm text-white">{enquiry.description}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Enquired On</p>
                  <p className="text-sm text-white">
                    {new Date(enquiry.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Status Update */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Update Status</h3>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(enquiry.status)} mb-4`}
                >
                  Current: {enquiry.status}
                </span>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="New" className="bg-black">New</option>
                  <option value="Reviewed" className="bg-black">Reviewed</option>
                  <option value="Contacted" className="bg-black">Contacted</option>
                  <option value="Closed" className="bg-black">Closed</option>
                </select>
                <button
                  onClick={handleUpdateStatus}
                  disabled={updating || newStatus === enquiry.status}
                  className={`w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl transition-all shadow-lg ${
                    updating || newStatus === enquiry.status
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

              {/* Delete Button */}
              <button
                onClick={handleDelete}
                disabled={deleting}
                className={`w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl transition-all shadow-lg ${
                  deleting ? "opacity-80 cursor-not-allowed" : "hover:from-red-500 hover:to-red-600 shadow-red-500/40"
                }`}
              >
                {deleting ? (
                  <>
                    <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash className="size-4" />
                    Delete Enquiry
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}