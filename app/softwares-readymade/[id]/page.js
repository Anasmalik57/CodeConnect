// app/softwares-readymade/[id]/page.js

"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, PlayCircle, Copy, Smartphone, Monitor } from "lucide-react";
import Link from "next/link";
import { API_BASE } from "@/lib/api";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });

  const [addons, setAddons] = useState({
    deployment: false,
    branding: false,
    payment: false,
    gateway: false,
    customFields: false,
    multiLanguage: false,
    whatsapp: false,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/project/${id}`, { cache: "no-store" });
        const result = await res.json();
        if (result.success) setProduct(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-black flex-center"><p className="text-3xl text-blue-400 animate-pulse">Loading...</p></div>;
  if (!product) return <div className="min-h-screen bg-black flex-center"><p className="text-2xl text-red-400">Product not found</p></div>;

  const basePrice = product.price;

  const addonsList = [
    { key: "deployment", label: "Installation & Deployment", cost: product.deployment || 0 },
    { key: "branding", label: "Branding (logo/colors)", cost: product.branding || 0 },
    { key: "payment", label: "Payment Gateway", cost: product.payment || 0 },
    { key: "gateway", label: "Admin Custom Fields", cost: product.gateway || 0 },
    { key: "multiLanguage", label: "Multi-language", cost: product.multiLanguage || 0 },
    { key: "whatsapp", label: "WhatsApp Integration", cost: product.whatsapp || 0 },
  ];

  const selectedAddons = addonsList.filter(a => addons[a.key]);
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.cost, 0);
  const serviceFee = (basePrice + addonsTotal) * 0.05;

  // YE LINE MISSING THI → AB ADD KAR DI
  const total = basePrice + addonsTotal + serviceFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Request:", { product: product.name, client: formData, selectedAddons, total: Math.round(total) });
    alert("Request sent! We’ll contact you soon.");
  };

  const handleCopyQuote = () => {
    const quote = `${product.name}\nBase: ₹${basePrice}\nAdd-ons: ₹${Math.round(addonsTotal)}\nService Fee: ₹${Math.round(serviceFee)}\nTotal: ₹${Math.round(total)}`;
    navigator.clipboard.writeText(quote);
    alert("Quote copied!");
  };

  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/softwares-readymade" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 text-lg font-medium">
          <ArrowLeft className="w-5 h-5" /> Back to All Apps
        </Link>

        <div className="bg-slate-900 rounded-3xl max-w-6xl mx-auto overflow-hidden border border-slate-700 shadow-2xl">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 border-b border-slate-700">
            <h1 className="text-4xl md:text-5xl font-black text-center">{product.name}</h1>
            <p className="text-center text-blue-300 mt-3 text-lg">{product.description}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 p-6 md:p-10">
            {/* Left */}
            <div className="space-y-8">
              <img src={product.screenshots[0]} alt={product.name} className="w-full h-80 object-cover rounded-2xl border border-slate-700" />
              <div className="grid grid-cols-3 gap-4">
                {product.screenshots.slice(0, 3).map((img, i) => (
                  <img key={i} src={img} className="w-full h-40 object-cover rounded-xl border border-slate-700" />
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                {product.platforms?.map(p => (
                  <span key={p} className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-sm border border-slate-700">
                    {p === "Web" ? <Monitor className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
                    {p}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {(Array.isArray(product.tech) ? product.tech : product.tech?.split(", ") || []).map(t => (
                  <span key={t} className="px-4 py-2 bg-slate-800/70 rounded-lg text-sm border border-slate-700">
                    {t.trim()}
                  </span>
                ))}
              </div>
              <div className="flex gap-6">
                {product.demoLink && (
                  <a href={product.demoLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-blue-400 hover:text-blue-300 font-semibold text-lg">
                    <PlayCircle className="w-6 h-6" /> Open Live Demo
                  </a>
                )}
                <button onClick={handleCopyQuote} className="flex items-center gap-3 text-purple-400 hover:text-purple-300 font-semibold text-lg">
                  <Copy className="w-6 h-6" /> Copy Quote
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" placeholder="Your Name *" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-4 bg-slate-800/70 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500" />
                <input type="text" placeholder="Email or Phone *" required value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="w-full px-5 py-4 bg-slate-800/70 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500" />
                <textarea placeholder="Tell us about your project (optional)" rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-5 py-4 bg-slate-800/70 border border-slate-700 rounded-xl resize-none focus:outline-none focus:border-blue-500" />
              </form>

              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 space-y-6">
                <h3 className="text-2xl font-bold">Customize Package</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addonsList.map(item => (
                    <label key={item.key} className="flex items-center gap-4 cursor-pointer">
                      <input type="checkbox" checked={addons[item.key]} onChange={e => setAddons({...addons, [item.key]: e.target.checked})} className="w-5 h-5 rounded accent-purple-500" />
                      <span className="text-slate-300">{item.label}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-700">
                  <div className="flex justify-between text-lg"><span className="text-slate-400">Base Price</span><span className="font-bold">₹{basePrice.toLocaleString()}</span></div>
                  {selectedAddons.length > 0 && <div className="flex justify-between text-lg"><span className="text-slate-400">Add-ons</span><span className="font-bold">₹{Math.round(addonsTotal).toLocaleString()}</span></div>}
                  <div className="flex justify-between text-lg"><span className="text-slate-400">Service Fee (5%)</span><span>₹{Math.round(serviceFee).toLocaleString()}</span></div>
                  <div className="flex justify-between text-2xl font-black pt-4 border-t border-slate-600">
                    <span>Total</span>
                    <span className="text-purple-400">₹{Math.round(total).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={handleCopyQuote} className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold">Copy Quote</button>
                  <button onClick={handleSubmit} className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold shadow-lg">Send Request</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}