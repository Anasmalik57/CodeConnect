"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FolderCode, ArrowLeft, Loader2, Trash2, CheckCircle } from "lucide-react";
import { API_BASE } from "@/lib/api";


export default function AdminInstallOwnCodeDetails() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await fetch(`${API_BASE}/install-request/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch request");
        const data = await res.json();
        setRequest(data.data);
        setNewStatus(data.data.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  const handleUpdateStatus = async () => {
    if (!newStatus || newStatus === request.status) return;
    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE}/install-request/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updatedData = await res.json();
      setRequest(updatedData.data);
      alert("Status updated successfully!");
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE}/install-request/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to delete request");
      alert("Enquiry deleted successfully!");
      router.push("/admin/bookings/installcode-enquaries"); // Redirect back to list, adjust path if needed
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/90">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/90 text-red-400">
        {error || "Request not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/90 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-blue-300 hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to List
        </button>

        <div className="group relative bg-black/80 border border-blue-500/30 rounded-2xl p-8 shadow-xl shadow-blue-900/50">
          <span className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-sky-600/30 to-blue-600/20 rounded-2xl blur-xl opacity-60" />
          <div className="relative">
            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 via-sky-400 to-teal-400 bg-clip-text text-transparent mb-6 flex items-center gap-3">
              <FolderCode className="w-8 h-8 text-teal-400" />
              Enquiry Details: {request.productLinkOrName}
            </h1>

            <div className="space-y-4 text-white/90">
              <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-medium text-blue-300 min-w-[200px]">Product Link/Name:</span> {request.productLinkOrName}
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-medium text-blue-300 min-w-[200px]">Setup Type:</span> {request.setupType}
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-medium text-blue-300 min-w-[200px]">Coding Language:</span> {request.codingLanguage}
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-medium text-blue-300 min-w-[200px]">Preferred Languages:</span> {request.preferredLanguage.join(", ")}
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-medium text-blue-300 min-w-[200px]">Communication Language:</span> {request.communicationLanguage}
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-medium text-blue-300 min-w-[200px]">Preferred Time:</span> {request.preferredTime}
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-medium text-blue-300 min-w-[200px]">Additional Notes:</span> {request.additionalNotes || "None"}
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-medium text-blue-300 min-w-[200px]">Created At:</span> {new Date(request.createdAt).toLocaleString()}
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-medium text-blue-300 min-w-[200px]">Status:</span>{" "}
                <span className={`px-3 py-1 rounded-full text-sm ${request.status === "Pending" ? "bg-yellow-500/20 text-yellow-300" : request.status === "In Progress" ? "bg-blue-500/20 text-blue-300" : request.status === "Completed" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                  {request.status}
                </span>
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label className="font-medium text-blue-300 min-w-[200px]">Update Status:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="px-4 py-2 bg-black/50 border border-blue-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button
                  onClick={handleUpdateStatus}
                  disabled={updating || newStatus === request.status}
                  className="px-6 py-2 bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 rounded-2xl font-bold text-white shadow-2xl shadow-sky-500/40 hover:shadow-sky-500/70 transition-all duration-400 hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                  {updating ? "Updating...." : "Update Status"}
                </button>
              </div>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full sm:w-auto px-6 py-3 bg-linear-to-r from-red-600 via-red-500 to-red-400 rounded-2xl font-bold text-white shadow-2xl shadow-red-500/40 hover:shadow-red-500/70 transition-all duration-400 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                {deleting ? "Deleting..." : "Delete Enquiry"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}