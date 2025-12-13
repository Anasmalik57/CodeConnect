"use client";

import { useState } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });import "react-quill-new/dist/quill.snow.css";
import { API_BASE } from "@/lib/api";

export default function AddcodeNscriptModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    productType: "Other",
    codeLanguages: "",
    codeLink: "",
    codePreview: "",
    previousLink: "",
    clientSideRequirements: "",
    installationType: [],
    basePrice: "",
    additionalCharges: {
      installation: "",
      customization: "",
      branding: "",
      paymentGatewayIntegration: "",
      deployment: "",
      cloudSetup: "",
      playConsoleUpload: "",
      iosConsoleUpload: "",
    },
    description: "",
  });

  if (!isOpen) return null;

  const handleUploadSuccess = (result) => {
    const url = result?.info?.secure_url;
    if (url && images.length < 4) {
      setImages((prev) => [...prev, url]);
    }
    setIsUploading(false);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("additionalCharges.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        additionalCharges: {
          ...prev.additionalCharges,
          [field]: Number(value) || 0,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleInstallationType = (type) => {
    setFormData((prev) => ({
      ...prev,
      installationType: prev.installationType.includes(type)
        ? prev.installationType.filter((t) => t !== type)
        : [...prev.installationType, type],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    setLoading(true);
    const codeLanguagesArray = formData.codeLanguages
      .split(",")
      .map((lang) => lang.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      images,
      codeLanguages: codeLanguagesArray,
      basePrice: Number(formData.basePrice),
    };

    try {
      const res = await fetch(`${API_BASE}/code-n-script-cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        alert("Product added successfully!");
        onSuccess(); // Trigger refresh in parent
        onClose();
      } else {
        alert("Failed: " + result.message);
      }
    } catch (err) {
      // alert("Network error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-teal-500/30 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 md:p-6 border-b border-teal-500/20 bg-slate-950/90 backdrop-blur">
          <h2 className="text-[16px] md:text-2xl font-bold text-white">
            Add New Code & Script Product
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Images */}
          <div>
            <label className="block text-lg font-semibold text-teal-300 mb-4">
              Images (Max 3)
            </label>
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mb-6">
                {images.map((url, i) => (
                  <div
                    key={i}
                    className="relative group rounded-xl overflow-hidden border-2 border-teal-500/50"
                  >
                    <img
                      src={url}
                      alt=""
                      className="w-full h-40 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 p-2 bg-red-600/90 rounded-lg opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {images.length < 4 && (
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleUploadSuccess}
                onError={(error) => {
                  console.warn("Cloudinary upload warning:", error); // suppress full error
                }}
                onQueuesStart={() => setIsUploading(true)}
                onQueuesEnd={() => setIsUploading(false)}
              >
                {({ open }) => (
                  <div
                    onClick={open}
                    className="border-2 border-dashed border-teal-500/40 rounded-2xl p-12 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-500/5 transition"
                  >
                    {isUploading ? (
                      <Loader2 className="w-12 h-12 mx-auto text-teal-400 animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-16 h-16 mx-auto text-teal-400 mb-4" />
                        <p className="text-white text-xl">
                          Click to Upload Images
                        </p>
                        <p className="text-gray-400">
                          {images.length}/3 uploaded
                        </p>
                      </>
                    )}
                  </div>
                )}
              </CldUploadWidget>
            )}
          </div>

          {/* Name & Product Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="px-6 py-4 bg-white/5 border border-teal-500/30 rounded-xl text-white placeholder-gray-500"
              required
            />
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="px-6 py-4 bg-white/5 border border-teal-500/30 rounded-xl text-white"
            >
              {[
                "Automation",
                "Finance",
                "Education",
                "Healthcare",
                "Social",
                "Other",
              ].map((type) => (
                <option key={type} value={type} className="bg-slate-900">
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-semibold text-teal-300 mb-3">
              Description
            </label>
            <div className="rounded-xl overflow-hidden border border-teal-500/30">
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, description: value }))
                }
                placeholder="Write a detailed description..."
                className="bg-slate-900 text-white"
              />
            </div>
          </div>

          {/* Code Languages & Client Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="codeLanguages"
              value={formData.codeLanguages}
              onChange={handleChange}
              placeholder="Code Languages (comma separated, e.g. React, Node.js)"
              className="px-6 py-4 bg-white/5 border border-teal-500/30 rounded-xl text-white placeholder-gray-500"
              required
            />
            <input
              type="text"
              name="clientSideRequirements"
              value={formData.clientSideRequirements}
              onChange={handleChange}
              placeholder="Client Side Requirements"
              className="px-6 py-4 bg-white/5 border border-teal-500/30 rounded-xl text-white placeholder-gray-500"
              required
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="url"
              name="codeLink"
              value={formData.codeLink}
              onChange={handleChange}
              placeholder="Code Link (required)"
              className="px-6 py-4 bg-white/5 border border-teal-500/30 rounded-xl text-white placeholder-gray-500"
              required
            />
            <input
              type="url"
              name="codePreview"
              value={formData.codePreview}
              onChange={handleChange}
              placeholder="Preview Link (optional)"
              className="px-6 py-4 bg-white/5 border border-teal-500/30 rounded-xl text-white placeholder-gray-500"
            />
            <input
              type="url"
              name="previousLink"
              value={formData.previousLink}
              onChange={handleChange}
              placeholder="Previous Version Link (optional)"
              className="px-6 py-4 bg-white/5 border border-teal-500/30 rounded-xl text-white placeholder-gray-500"
            />
          </div>

          {/* Installation Types */}
          <div>
            <label className="block text-lg font-semibold text-teal-300 mb-4">
              Installation Types
            </label>
            <div className="flex flex-wrap gap-4">
              {["Web", "Android", "iOS", "Desktop", "Server"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 text-sm  md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-white/5 border border-teal-500/30 rounded-xl cursor-pointer hover:bg-teal-500/10 transition"
                >
                  <input
                    type="checkbox"
                    checked={formData.installationType.includes(type)}
                    onChange={() => toggleInstallationType(type)}
                    className="size-4 accent-teal-500"
                  />
                  <span className="text-white">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-lg font-semibold text-teal-300 mb-4">
              Pricing (₹)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                placeholder="Base Price"
                className="px-6 py-3 bg-white/5 border border-teal-500/30 rounded-xl text-white placeholder:text-xs"
                min="0"
                required
              />
              {Object.keys(formData.additionalCharges).map((key) => (
                <input
                  key={key}
                  type="number"
                  name={`additionalCharges.${key}`}
                  value={formData.additionalCharges[key]}
                  onChange={handleChange}
                  placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                  className="px-6 py-3 bg-white/5 border border-teal-500/30 rounded-xl text-white placeholder-gray-500  placeholder:text-xs placeholder:capitalize"
                  min="0"
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-6 border-t border-teal-500/20">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-3 bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 rounded-xl text-white font-bold flex items-center gap-3 transition disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
