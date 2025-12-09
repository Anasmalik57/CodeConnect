"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Trash2, CheckCircle, Bug, Mail, Phone, Link, Code2, FileText, Globe } from "lucide-react";
import { API_BASE } from "@/lib/api";


export default function AdminErrorFixingDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await fetch(`${API_BASE}/error-fixing/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setRequest(data.data);
        setStatus(data.data.status);
      } catch (err) {
        alert("Request not found");
        router.push("/admin/bookings/errorFixing");
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id, router]);

  const handleUpdate = async () => {
    if (status === request.status) return;
    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE}/error-fixing/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setRequest(prev => ({ ...prev, status }));
        alert("Status updated successfully!");
      }
    } catch (err) {
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this error fixing request permanently?")) return;
    setDeleting(true);
    try {
      await fetch(`${API_BASE}/error-fixing/${id}`, { method: "DELETE" });
      alert("Deleted successfully");
      router.push("/admin/bookings/errorFixing");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><Loader2 className="w-12 h-12 text-red-500 animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-black/95 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="mb-6 flex items-center gap-2 text-red-400 hover:text-red-300">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="bg-linear-to-br from-slate-900/90 to-slate-950/90 border border-red-500/30 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-bold bg-linear-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-8">
            Error Fixing Request
          </h1>

          <div className="grid md:grid-cols-2 gap-8 text-white/90">
            <div className="space-y-5">
              <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-red-400" /> <strong>Name:</strong> {request.fullName}</p>
              <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-red-400" /> <strong>Email:</strong> {request.email}</p>
              <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-red-400" /> <strong>Phone:</strong> {request.phone}</p>
            </div>
            <div className="space-y-5">
              <p className="flex items-center gap-3"><Bug className="w-5 h-5 text-red-400" /> <strong>Type:</strong> {request.productType}</p>
              <p className="flex items-center gap-3"><Code2 className="w-5 h-5 text-red-400" /> <strong>Tech:</strong> {request.codingLang.join(", ")}</p>
              <p className="flex items-center gap-3"><Globe className="w-5 h-5 text-red-400" /> <strong>Language:</strong> {request.language}</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="flex items-center gap-3"><Link className="w-5 h-5 text-red-400" /> <strong>URL:</strong> <a href={request.productUrl} target="_blank" className="text-purple-400 hover:underline">{request.productUrl}</a></p>
            <p className="mt-6 flex items-start gap-3 text-gray-300">
              <FileText className="w-5 h-5 text-red-400 mt-1" />
              <span><strong>Issue:</strong> {request.issueDesc}</span>
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-5 py-3 bg-slate-800/70 border border-red-500/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option>Pending</option>
              <option>Under Review</option>
              <option>In Progress</option>
              <option>Fixed</option>
              <option>Closed</option>
            </select>

            <button
              onClick={handleUpdate}
              disabled={updating || status === request.status}
              className="px-8 py-3 bg-linear-to-r from-red-600 via-pink-500 to-purple-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
              Update Status
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-8 py-3 bg-linear-to-r from-red-700 to-red-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {deleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
              Delete Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}