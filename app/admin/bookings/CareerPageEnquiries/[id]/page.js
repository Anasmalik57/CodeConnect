"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Trash2, CheckCircle, Mail, Phone, MapPin, Link, FileText, Briefcase, Globe } from "lucide-react";
import { API_BASE } from "@/lib/api";


export default function AdminCareerDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const res = await fetch(`${API_BASE}/career/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setApp(data.data);
        setStatus(data.data.status);
      } catch (err) {
        alert("Application not found");
        router.push("/admin/bookings/CareerPageEnquiries");
      } finally {
        setLoading(false);
      }
    };
    fetchApp();
  }, [id, router]);

  const handleUpdate = async () => {
    if (status === app.status) return;
    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE}/career/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setApp((prev) => ({ ...prev, status }));
        alert("Status updated successfully!");
      }
    } catch (err) {
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this application permanently?")) return;
    setDeleting(true);
    try {
      await fetch(`${API_BASE}/career/${id}`, { method: "DELETE" });
      alert("Deleted successfully");
      router.push("/admin/bookings/CareerPageEnquiries");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/95 p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition"
        >
          <ArrowLeft className="w-5 h-5" /> Back to List
        </button>

        <div className="bg-linear-to-br from-slate-900/90 to-slate-950/90 border border-emerald-500/30 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-8">
            Career Application
          </h1>

          <div className="grid md:grid-cols-2 gap-8 text-white/90 mb-10">
            <div className="space-y-5">
              <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-emerald-400" /> <strong>Name:</strong> {app.name}</p>
              <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-emerald-400" /> <strong>Phone:</strong> {app.phone}</p>
              <p className="flex items-center gap-3"><Briefcase className="w-5 h-5 text-emerald-400" /> <strong>Role:</strong> {app.role}</p>
            </div>
            <div className="space-y-5">
              <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-emerald-400" /> <strong>Location:</strong> {app.city}, {app.state}, {app.country}</p>
              <p className="flex items-center gap-3"><Link className="w-5 h-5 text-emerald-400" /> <strong>Profile:</strong> <a href={app.profileLink} target="_blank" className="text-cyan-400 hover:underline">{app.profileLink}</a></p>
              <p className="flex items-center gap-3"><FileText className="w-5 h-5 text-emerald-400" /> <strong>Resume:</strong> <a href={app.resume} target="_blank" className="text-cyan-400 hover:underline">{app.resumeName}</a></p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-6 py-3 bg-slate-800/70 border border-emerald-500/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="pending" className="bg-black">Pending</option>
              <option value="reviewed" className="bg-black">Reviewed</option>
              <option value="accepted" className="bg-black">Accepted</option>
              <option value="rejected" className="bg-black">Rejected</option>
            </select>

            <button
              onClick={handleUpdate}
              disabled={updating || status === app.status}
              className="px-8 py-3 bg-linear-to-r from-emerald-600 to-cyan-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
              Update Status
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-8 py-3 bg-linear-to-r from-red-600 to-red-500 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {deleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
              Delete Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}