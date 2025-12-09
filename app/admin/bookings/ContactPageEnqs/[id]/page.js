"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Trash2, CheckCircle, Mail, Phone, DollarSign, FileText, Clock } from "lucide-react";
import { API_BASE } from "@/lib/api";



export default function AdminContactDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`${API_BASE}/contact/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setContact(data.data);
        setStatus(data.data.status);
      } catch (err) {
        alert("Enquiry not found");
        router.push("/admin/bookings/ContactPageEnqs");
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id, router]);

  const handleUpdate = async () => {
    if (status === contact.status) return;
    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE}/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setContact(prev => ({ ...prev, status }));
        alert("Status updated successfully!");
      }
    } catch (err) {
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this contact enquiry permanently?")) return;
    setDeleting(true);
    try {
      await fetch(`${API_BASE}/contact/${id}`, { method: "DELETE" });
      alert("Deleted successfully");
      router.push("/admin/bookings/ContactPageEnqs");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/95 p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
        >
          <ArrowLeft className="w-5 h-5" /> Back to List
        </button>

        <div className="bg-linear-to-br from-slate-900/90 to-slate-950/90 border border-purple-500/30 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-8">
            Contact Enquiry Details
          </h1>

          <div className="grid md:grid-cols-2 gap-8 text-white/90 mb-10">
            <div className="space-y-5">
              <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-purple-400" /> <strong>Name:</strong> {contact.name}</p>
              <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-purple-400" /> <strong>Email:</strong> {contact.email}</p>
              <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-purple-400" /> <strong>Phone:</strong> {contact.phone}</p>
            </div>
            <div className="space-y-5">
              <p className="flex items-center gap-3"><FileText className="w-5 h-5 text-purple-400" /> <strong>Service:</strong> {contact.service}</p>
              <p className="flex items-center gap-3"><DollarSign className="w-5 h-5 text-purple-400" /> <strong>Budget:</strong> {contact.budget}</p>
              <p className="flex items-center gap-3"><Clock className="w-5 h-5 text-purple-400" /> <strong>Submitted:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">Project Description</h3>
            <p className="text-gray-300 leading-relaxed bg-slate-800/50 p-5 rounded-xl border border-purple-500/20">
              {contact.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-6 py-3 bg-slate-800/70 border border-purple-500/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              onClick={handleUpdate}
              disabled={updating || status === contact.status}
              className="px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
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
              Delete Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}