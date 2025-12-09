// File: app/admin/bookings/productsbuying-requests/[id]/page.js
// Single Buy Enquiry Detail + Update Status + Delete

"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Phone, Package, IndianRupee, Calendar, Sparkles, Check, Trash2, Plus } from "lucide-react";
import { API_BASE } from "@/lib/api";


export default function BuyEnquiryDetail() {
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
        const res = await fetch(`${API_BASE}/buy-enquiry/${params.id}`);
        const data = await res.json();
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
    if (params.id) fetchEnquiry();
  }, [params.id]);

  const handleUpdateStatus = async () => {
    if (newStatus === enquiry.status) return;
    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE}/buy-enquiry/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiry(data.data);
        alert("Status updated successfully!");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this buy enquiry?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE}/buy-enquiry/${params.id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        alert("Enquiry deleted successfully!");
        router.push("/admin/bookings/productsbuying-requests");
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Review": return "bg-blue-500/10 border-blue-500/20 text-blue-400";
      case "Contacted": return "bg-cyan-500/10 border-cyan-500/20 text-cyan-400";
      case "Quoted": return "bg-purple-500/10 border-purple-500/20 text-purple-400";
      case "Closed": return "bg-green-500/10 border-green-500/20 text-green-400";
      default: return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400";
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block size-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white text-xl">Loading enquiry details...</p>
      </div>
    </div>
  );

  if (error || !enquiry) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-red-400 text-xl">
      {error || "Enquiry not found"}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16 px-4 md:px-6">
      <div className="max-w-[1380px] mx-auto">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-all px-4 py-2 rounded-full bg-blue-900/40"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Enquiries</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Client & Product Info */}
          <div className="relative bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Sparkles className="size-6 text-blue-400" />
                <h1 className="text-3xl font-bold">Buy Enquiry Details</h1>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <User className="size-5 text-blue-400" />
                  <span>{enquiry.name}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <Mail className="size-5 text-green-400" />
                  <span>{enquiry.contact}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <Package className="size-5 text-purple-400" />
                  <span className="font-medium">{enquiry.productName}</span>
                </div>
                {enquiry.demoLink && (
                  <div className="text-sm text-cyan-400 break-all">
                    Demo: <a href={enquiry.demoLink} target="_blank" rel="noreferrer" className="underline hover:text-cyan-300">
                      {enquiry.demoLink}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Status */}
          <div className="relative bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative space-y-6">
              {/* Pricing Breakdown */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white mb-4">Pricing Details</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Base Price</span>
                    <span className="text-white font-medium">₹{enquiry.basePrice.toLocaleString()}</span>
                  </div>
                  {enquiry.selectedAddons.length > 0 && (
                    <>
                      <div className="flex justify-between text-purple-400">
                        <span>Addons ({enquiry.selectedAddons.length})</span>
                        <span>+₹{enquiry.addonsTotal.toLocaleString()}</span>
                      </div>
                      {enquiry.selectedAddons.map((addon, i) => (
                        <div key={i} className="flex justify-between text-sm text-gray-300 pl-4">
                          <span className="flex items-center gap-1"><Plus className="size-3" /> {addon.label}</span>
                          <span>₹{addon.cost.toLocaleString()}</span>
                        </div>
                      ))}
                    </>
                  )}
                  {enquiry.serviceFee > 0 && (
                    <div className="flex justify-between text-cyan-400">
                      <span>Service Fee</span>
                      <span>+₹{enquiry.serviceFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total Amount</span>
                      <span className="text-green-400">₹{enquiry.finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platforms & Tech */}
              <div className="space-y-3">
                {enquiry.platforms.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Platforms</p>
                    <div className="flex flex-wrap gap-2">
                      {enquiry.platforms.map(p => (
                        <span key={p} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {enquiry.technologies.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {enquiry.technologies.slice(0, 6).map(t => (
                        <span key={t} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-xs text-purple-300">
                          {t}
                        </span>
                      ))}
                      {enquiry.technologies.length > 6 && <span className="text-xs text-gray-400">+{enquiry.technologies.length - 6} more</span>}
                    </div>
                  </div>
                )}
              </div>

              {/* Status Update */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Update Status</h3>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(enquiry.status)} mb-4`}>
                  Current: {enquiry.status}
                </span>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Review">In Review</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Quoted">Quoted</option>
                  <option value="Closed">Closed</option>
                </select>

                <button
                  onClick={handleUpdateStatus}
                  disabled={updating || newStatus === enquiry.status}
                  className={`w-full py-3 flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl transition-all shadow-lg ${updating || newStatus === enquiry.status ? "opacity-80 cursor-not-allowed" : "hover:from-blue-500 hover:to-purple-500 shadow-blue-500/40"}`}
                >
                  {updating ? <><div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Updating...</> : <><Check className="size-4" /> Update Status</>}
                </button>

                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className={`w-full py-3 flex items-center justify-center gap-2 bg-linear-to-r from-red-600 to-red-700 text-white font-medium rounded-xl transition-all shadow-lg ${deleting ? "opacity-80 cursor-not-allowed" : "hover:from-red-500 hover:to-red-600 shadow-red-500/40"}`}
                >
                  {deleting ? <><div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Deleting...</> : <><Trash2 className="size-4" /> Delete Enquiry</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}