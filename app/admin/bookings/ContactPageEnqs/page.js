"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Loader2, CoinsIcon } from "lucide-react";
import { API_BASE } from "@/lib/api";


export default function AdminContactEnquiries() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_BASE}/contacts`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setContacts(data.data || []);
    } catch (err) {
      alert("Error loading contact enquiries");
    } finally {
      setLoading(false);
    }
  };
  fetchContacts();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/95 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">


        {contacts.length === 0 ? (
          <p className="text-center text-white/60 text-lg">No contact enquiries yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {contacts.map((item) => (
              <div
                key={item._id}
                className="group relative bg-linear-to-br from-slate-900/90 to-slate-950/90 border border-purple-500/20 rounded-2xl p-6 shadow-2xl backdrop-blur-xl hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-linear-to-r from-purple-600/10 to-pink-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white line-clamp-1">{item.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        item.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : item.status === "contacted"
                          ? "bg-blue-500/20 text-blue-300"
                          : item.status === "in-progress"
                          ? "bg-purple-500/20 text-purple-300"
                          : item.status === "completed"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-300">
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-400" /> {item.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-400" /> {item.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <CoinsIcon className="w-4 h-4 text-purple-400" /> {item.budget}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-purple-300">{item.service}</p>
                  <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>

                  <button
                    onClick={() => router.push(`/admin/bookings/ContactPageEnqs/${item._id}`)}
                    className="w-full py-3 bg-linear-to-r from-purple-600 via-pink-500 to-red-600 rounded-xl font-bold text-white shadow-lg hover:shadow-purple-500/60 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
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