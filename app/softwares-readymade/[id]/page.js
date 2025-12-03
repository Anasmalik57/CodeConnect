"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  PlayCircle,
  Copy,
  Smartphone,
  Monitor,
  Check,
} from "lucide-react";
import Link from "next/link";
import { API_BASE } from "@/lib/api";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0); // Track main image index

  // Form & Addons State
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });
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
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/project/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const result = await res.json();

        if (result.success && result.data) {
          setProduct(result.data);
        } else {
          throw new Error("Invalid response");
        }
      } catch (err) {
        console.error("Product fetch error:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-xl font-semibold text-blue-400 animate-pulse">
          Loading Product...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center flex-col gap-4">
        <p className="text-lg text-red-400 font-semibold">Product Not Found</p>
        <Link
          href="/softwares-readymade"
          className="px-6 py-2.5 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          Back to Apps
        </Link>
      </div>
    );
  }

  // Pricing Calculations
  const basePrice = Number(product.price) || 0;

  const addonsList = [
    {
      key: "deployment",
      label: "Installation & Deployment",
      cost: Number(product.deployment) || 0,
    },
    {
      key: "branding",
      label: "Branding (logo/colors)",
      cost: Number(product.branding) || 0,
    },
    {
      key: "payment",
      label: "Payment Gateway",
      cost: Number(product.payment) || 0,
    },
    {
      key: "gateway",
      label: "Admin Custom Fields",
      cost: Number(product.gateway) || 0,
    },
    {
      key: "multiLanguage",
      label: "Multi-language",
      cost: Number(product.multiLanguage) || 0,
    },
    {
      key: "whatsapp",
      label: "WhatsApp Integration",
      cost: Number(product.whatsapp) || 0,
    },
  ];

  const selectedAddons = addonsList.filter((a) => addons[a.key]);
  const addonsTotal = selectedAddons.reduce((acc, a) => acc + a.cost, 0);
  const serviceFee = (basePrice + addonsTotal) * 0.05;
  const total = basePrice + addonsTotal + serviceFee;

  const handleCopyQuote = () => {
    let quote = `${product.name}\nBase Price: ₹${basePrice.toLocaleString()}`;

    if (selectedAddons.length > 0) {
      quote += `\n\nSelected Add-ons:`;
      selectedAddons.forEach((addon) => {
        quote += `\n• ${addon.label}: ₹${addon.cost.toLocaleString()}`;
      });
      quote += `\n\nAdd-ons Total: ₹${Math.round(
        addonsTotal
      ).toLocaleString()}`;
    }

    quote += `\nService Fee (5%): ₹${Math.round(serviceFee).toLocaleString()}`;
    quote += `\n\nTotal Amount: ₹${Math.round(total).toLocaleString()}`;

    navigator.clipboard.writeText(quote);
    alert("Quote copied to clipboard!");
  };

const handleSubmit = (e) => {
  e.preventDefault();

  console.log("=== CLIENT REQUEST DETAILS ===");

  // Form Fields
  console.log("Name:", formData.name);
  console.log("Contact:", formData.contact);
  console.log("Message:", formData.message);

  // Product Details
  console.log("Product Name:", product.name);
  console.log("Live Demo Link:", product.demoLink);
  console.log("Platforms:", product.platforms?.join(", "));
  console.log("Technologies:", 
    Array.isArray(product.tech) 
      ? product.tech.join(", ") 
      : product.tech
  );

  // Addons
  console.log("Selected Addons:", 
    selectedAddons.length
      ? selectedAddons.map(a => `${a.label} (₹${a.cost})`)
      : "No addons selected"
  );

  // Pricing
  console.log("Base Price: ₹", basePrice);
  console.log("Addons Total: ₹", addonsTotal);
  console.log("Service Fee: ₹", Math.round(serviceFee));
  console.log("FINAL TOTAL: ₹", Math.round(total));

  console.log("================================");

  alert("Request sent successfully! We will contact you soon.");
};


  return (
    <div className="min-h-screen bg-black text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1380px] mx-auto">
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
          {/* Header */}
          <div className="relative bg-linear-to-r from-blue-900/30 to-purple-900/30 p-6 border-b border-slate-800">
            <h1 className="text-2xl font-extrabold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {product.name}
            </h1>
            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
              {product.description}
            </p>

            <Link
              href="/softwares-readymade"
              className="absolute top-[40%] hidden  right-10 text-xs border border-white/20 px-3 py-2.5 md:inline-flex items-center gap-2 text-white hover:text-white transition-all duration-200 ease-in bg-linear-to-tl from-slate-900 via-slate-700 to-slate-600 rounded-full shadow-lg shadow-slate-900/50 hover:shadow-xl hover:shadow-slate-900/60"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Apps
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 p-6">
            {/* Left Side */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative group">
                <img
                  src={product.screenshots[mainImage]}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-xl border border-slate-800 shadow-lg"
                />
              </div>

              {/* Thumbnail Grid */}
              {product.screenshots.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.screenshots.slice(0, 4).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setMainImage(i)}
                      className={`relative w-full h-20 rounded-lg overflow-hidden border-2 transition ${
                        mainImage === i
                          ? "border-blue-500"
                          : "border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Platforms */}
              <div className="flex flex-wrap gap-2">
                {product.platforms?.map((p) => (
                  <span
                    key={p}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg border border-slate-700 text-xs font-medium"
                  >
                    {p === "Web" ? (
                      <Monitor className="w-3.5 h-3.5" />
                    ) : (
                      <Smartphone className="w-3.5 h-3.5" />
                    )}
                    {p}
                  </span>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(product.tech)
                  ? product.tech
                  : product.tech?.split(",") || []
                ).map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-slate-800/60 rounded-md text-xs border border-slate-700/50"
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-2">
                {product.demoLink && (
                  <a
                    href={product.demoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm"
                  >
                    <PlayCircle className="w-5 h-5" /> Live Demo
                  </a>
                )}
                <button
                  onClick={handleCopyQuote}
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium text-sm"
                >
                  <Copy className="w-4 h-4" /> Copy Quote
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-6">
              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-800/70 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm"
                />
                <input
                  type="text"
                  placeholder="Email or Phone *"
                  required
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-800/70 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm"
                />
                <textarea
                  placeholder="Tell us about your project (optional)"
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-800/70 border border-slate-700 rounded-lg resize-none focus:outline-none focus:border-blue-500 transition text-sm"
                />
              </form>

              {/* Pricing Card */}
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                <h3 className="text-lg font-bold mb-4">
                  Customize Your Package
                </h3>

                {/* Addons Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {addonsList.map((item) => (
                    <label
                      key={item.key}
                      className={`flex items-center gap-2 cursor-pointer p-2.5 rounded-lg border transition ${
                        addons[item.key]
                          ? "bg-purple-500/20 border-purple-500"
                          : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={addons[item.key]}
                        onChange={(e) =>
                          setAddons({ ...addons, [item.key]: e.target.checked })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                          addons[item.key]
                            ? "bg-purple-500 border-purple-500"
                            : "border-slate-600"
                        }`}
                      >
                        {addons[item.key] && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-xs text-slate-300 flex-1">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Selected Addons List */}
                {selectedAddons.length > 0 && (
                  <div className="mb-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                    <p className="text-xs font-semibold text-slate-400 mb-2">
                      Selected Add-ons:
                    </p>
                    <div className="space-y-1.5">
                      {selectedAddons.map((addon) => (
                        <div
                          key={addon.key}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-slate-300">{addon.label}</span>
                          <span className="font-medium text-white">
                            ₹{addon.cost.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-2.5 pt-4 border-t border-slate-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Base Price</span>
                    <span className="font-semibold text-white">
                      ₹{basePrice.toLocaleString()}
                    </span>
                  </div>
                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Add-ons Total</span>
                      <span className="font-semibold text-white">
                        ₹{addonsTotal.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Service Fee (5%)</span>
                    <span className="text-white">
                      ₹{Math.round(serviceFee).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-3 border-t border-slate-600">
                    <span>Total</span>
                    <span className="text-purple-400">
                      ₹{Math.round(total).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-5">
                  <button
                    type="button"
                    onClick={handleCopyQuote}
                    className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition text-sm"
                  >
                    Copy Quote
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 py-2.5 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-medium shadow-lg transition text-sm"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
