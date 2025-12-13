"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, IndianRupee, Link2 } from "lucide-react";
import { API_BASE } from "@/lib/api";
import AddcodeNscriptModal from "@/components/Modals/AddcodeNscriptModal";
import Link from "next/link";
import Image from "next/image";

export default function AdminCodeNscriptPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Fetch function alag se banao taaki modal use kar sake
  const fetchCards = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/code-n-script-cards`);
      const data = await res.json();
      setCards(data.data || []);
    } catch (err) {
      console.error("Error loading products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Modal success ke baad refresh + close
  const handleAddSuccess = () => {
    fetchCards(); // ye ab defined hai
    setIsModalOpen(false); // extra safety
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/95  ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-0 px-9 py-6">
          <div className="space-y-1.5">
            <h1 className="text-xl lg:text-3xl font-bold text-white tracking-tight">
              Code & Script Products
            </h1>
            <p className="text-slate-400 text-xs">
              Manage your digital products and scripts
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-slate-400">
                Total Products:{" "}
                <span className="text-teal-400 font-semibold">
                  {cards.length}
                </span>
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 rounded-xl font-bold text-white shadow-lg transition hover:scale-105"
            >
              + Add New Product
            </button>
            
          </div>
        </div>
       {/* ============================================================== */}
{/*========================== Card Here ==========================*/}
{/* ============================================================== */}
<div className="p-8">
  {cards.length === 0 ? (
    <p className="text-center text-white/60 text-lg">
      No products added yet
    </p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card._id}
          className="group relative bg-linear-to-br from-slate-900/95 to-slate-950/95 border border-teal-500/30 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm hover:shadow-teal-500/20 transition-all duration-500 hover:-translate-y-1"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-teal-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
          
          {/* Card Content */}
          <div className="relative">
            {/* Image Section with Badges */}
            <div className="relative h-52 overflow-hidden">
              <Image
                src={card.images[0] || "/productImage.webp"}
                width={1920}
                height={1080}
                alt={card.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Product Type Badge - Top Right */}
              <span className="absolute top-4 right-4 px-3 py-1.5 bg-teal-500/90 backdrop-blur-md text-white text-xs font-semibold rounded-lg shadow-lg">
                {card.productType}
              </span>

              {/* Installation Types - Bottom Right */}
              <div className="absolute bottom-4 right-4  flex flex-wrap gap-2 justify-end">
                {card.installationType.map((e, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-slate-900/90 backdrop-blur-md border border-teal-500/40 text-teal-300 text-[10px] font-semibold rounded-lg shadow-lg"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-5">
              {/* Title and Code Link */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white tracking-tight line-clamp-1">
                  {card.name}
                </h3>
                <Link href={card?.codeLink} className="flex items-center gap-2 text-teal-400 text-sm font-medium hover:text-teal-300 transition-colors group/link" >
                  <Link2 className="w-4 h-4 group-hover/link:rotate-45 transition-transform" />
                  <span className="truncate text-xs">View Code</span>
                </Link>
              </div>

              {/* Tech Stack */}
              <div className="flex gap-2 items-end">
                <div className="flex flex-wrap gap-2">
                  {card.codeLanguages.slice(0, 4).map((e, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 bg-slate-800/60 border border-slate-700 text-gray-300 text-[10px] font-mono rounded-2xl h-fit"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              {/* Base Price - Bottom */}
              <div className="flex items-end justify-between gap-2 ">
                <span className="text-gray-400 text-base font-medium">Base Price</span>
                <span className="flex items-center gap-1.5 text-cyan-300 text-base font-bold">
                  <IndianRupee className="w-4 h-4" />
                  {card.basePrice}
                </span>
              </div>

              {/* Update Button */}
              <button
                onClick={() => router.push(`/admin/codeNscripts/${card._id}`)}
                className="w-full py-3.5 bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 rounded-xl font-semibold text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Update Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
      </div>
      {/* // Add this just before the last </div> or at the end of return */}
      {isModalOpen && (
        <AddcodeNscriptModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleAddSuccess} // ab ye sahi function pass ho raha hai
        />
      )}
    </div>
  );
}
