"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, Upload, X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import { API_BASE } from "@/lib/api";

// React-Quill for React 19
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // default theme

export default function CodeNScriptDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch product by id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/code-n-script-card/${id}`);
        const result = await res.json();

        if (result.success) {
          const productData = {
            ...result.data,
            codeLanguages: result.data.codeLanguages.join(", "),
            // description is already HTML string from DB (or plain if new)
            description: result.data.description || "",
          };
          setProduct(productData);
        } else {
          alert("Product not found");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleUploadSuccess = (result) => {
    const url = result?.info?.secure_url;
    if (url && product.images.length < 4) {
      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, url],
      }));
    }
    setIsUploading(false);
  };

  const removeImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleInstallationType = (type) => {
    setProduct((prev) => ({
      ...prev,
      installationType: prev.installationType.includes(type)
        ? prev.installationType.filter((t) => t !== type)
        : [...prev.installationType, type],
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const codeLanguagesArray = product.codeLanguages
      .split(",")
      .map((lang) => lang.trim())
      .filter(Boolean);

    const updatedData = {
      ...product,
      codeLanguages: codeLanguagesArray,
      basePrice: Number(product.basePrice) || 1500,
      additionalCharges: {
        installation: Number(product.additionalCharges.installation) || 500,
        customization: Number(product.additionalCharges.customization) || 2000,
        branding: Number(product.additionalCharges.branding) || 1000,
        paymentGatewayIntegration:
          Number(product.additionalCharges.paymentGatewayIntegration) || 1500,
        deployment: Number(product.additionalCharges.deployment) || 800,
        cloudSetup: Number(product.additionalCharges.cloudSetup) || 1200,
        playConsoleUpload:
          Number(product.additionalCharges.playConsoleUpload) || 300,
        iosConsoleUpload:
          Number(product.additionalCharges.iosConsoleUpload) || 400,
      },
      // description already HTML string from ReactQuill
    };

    try {
      const res = await fetch(`${API_BASE}/code-n-script-card/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Product updated successfully!");
        router.back();
      } else {
        alert("Update failed: " + result.message);
      }
    } catch (err) {
      alert("Network error");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure? This cannot be undone.")) return;

    try {
     const res = await fetch(`${API_BASE}/code-n-script-card/${product._id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        alert("Product deleted!");
        
        router.back()
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-2xl text-red-400">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/10 backdrop-blur-xl bg-white/2">
        <div className="px-8 py-6 md:py-10 flex items-center gap-4">
          <Link
            href="/admin/code-n-script"
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Products
          </Link>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        <form onSubmit={handleUpdate} className="space-y-10">
          {/* Images - max 4 */}
          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-4">
              Images (Max 3)
            </label>
            {product.images?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {product.images.map((url, i) => (
                  <div
                    key={i}
                    className="relative group rounded-xl overflow-hidden border-2 border-blue-500/50 hover:border-blue-500"
                  >
                    <Image
                      src={url}
                      alt=""
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 p-2 bg-red-600/90 rounded-lg opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {product.images.length < 4 && (
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleUploadSuccess}
                onQueuesStart={() => setIsUploading(true)}
                onQueuesEnd={() => setIsUploading(false)}
              >
                {({ open }) => (
                  <div
                    onClick={open}
                    className="border-2 border-dashed border-white/20 rounded-2xl p-10 text-center cursor-pointer hover:border-blue-500/60 hover:bg-white/5"
                  >
                    {isUploading ? (
                      <>Uploading...</>
                    ) : (
                      <>
                        <Upload className="w-16 h-16 mx-auto text-gray-400" />
                        <p className="text-white text-xl font-medium">
                          Click to Upload Image
                        </p>
                        <p className="text-gray-500">
                          {product.images.length}/3 uploaded
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
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
              required
            />
            <select
              name="productType"
              value={product.productType}
              onChange={handleChange}
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
            >
              {[
                "Automation",
                "Finance",
                "Education",
                "Healthcare",
                "Social",
                "Other",
              ].map((c) => (
                <option key={c} value={c} className="bg-black">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* RICH TEXT DESCRIPTION */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-300">
              Product Description (supports bold, lists, headings, etc.)
            </label>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <ReactQuill
                theme="snow"
                value={product.description}
                onChange={(html) =>
                  setProduct((prev) => ({ ...prev, description: html }))
                }
                placeholder="Write rich description here..."
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "clean"],
                  ],
                }}
                className="bg-transparent text-white"
                style={{ minHeight: "180px" }}
              />
            </div>
            <p className="text-sm text-gray-500">
              Formatting will be saved & displayed exactly as you see
            </p>
          </div>

          {/* Installation Types */}
          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-4">
              Installation Types
            </label>
            <div className="flex flex-wrap gap-4">
              {["Web", "Android", "iOS", "Desktop", "Server"].map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-2 md:gap-3 px-4 py-2 text-sm md:px-6 md:py-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10"
                >
                  <input
                    type="checkbox"
                    checked={product.installationType.includes(t)}
                    onChange={() => toggleInstallationType(t)}
                    className="size-4 accent-blue-500"
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Code Languages & Client Side Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="codeLanguages"
              value={product.codeLanguages}
              onChange={handleChange}
              placeholder="Code Languages (comma separated)"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
              required
            />
            <input
              type="text"
              name="clientSideRequirements"
              value={product.clientSideRequirements}
              onChange={handleChange}
              placeholder="Client Side Requirements"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
              required
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="url"
              name="codeLink"
              value={product.codeLink}
              onChange={handleChange}
              placeholder="Code Link"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
              required
            />
            <input
              type="url"
              name="codePreview"
              value={product.codePreview || ""}
              onChange={handleChange}
              placeholder="Code Preview (optional)"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
            />
            <input
              type="url"
              name="previousLink"
              value={product.previousLink || ""}
              onChange={handleChange}
              placeholder="Previous Link (optional)"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
            />
          </div>

          {/* Pricing Grid */}
          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-4">
              Pricing
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <input
                type="number"
                name="basePrice"
                value={product.basePrice}
                onChange={handleChange}
                placeholder="Base Price (₹)"
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
                min="0"
                required
              />
              <input
                type="number"
                name="additionalCharges.installation"
                value={product.additionalCharges.installation}
                onChange={handleChange}
                placeholder="Installation (₹)"
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
                min="0"
              />
              <input
                type="number"
                name="additionalCharges.customization"
                value={product.additionalCharges.customization}
                onChange={handleChange}
                placeholder="Customization (₹)"
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
                min="0"
              />
              <input
                type="number"
                name="additionalCharges.branding"
                value={product.additionalCharges.branding}
                onChange={handleChange}
                placeholder="Branding (₹)"
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
                min="0"
              />
              <input
                type="number"
                name="additionalCharges.paymentGatewayIntegration"
                value={product.additionalCharges.paymentGatewayIntegration}
                onChange={handleChange}
                placeholder="Payment Gateway (₹)"
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
                min="0"
              />
              <input
                type="number"
                name="additionalCharges.deployment"
                value={product.additionalCharges.deployment}
                onChange={handleChange}
                placeholder="Deployment (₹)"
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
                min="0"
              />
              <input
                type="number"
                name="additionalCharges.cloudSetup"
                value={product.additionalCharges.cloudSetup}
                onChange={handleChange}
                placeholder="Cloud Setup (₹)"
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
                min="0"
              />
              <input
                type="number"
                name="additionalCharges.playConsoleUpload"
                value={product.additionalCharges.playConsoleUpload}
                onChange={handleChange}
                placeholder="Play Console Upload (₹)"
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
                min="0"
              />
              <input
                type="number"
                name="additionalCharges.iosConsoleUpload"
                value={product.additionalCharges.iosConsoleUpload}
                onChange={handleChange}
                placeholder="iOS Console Upload (₹)"
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl"
                min="0"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-white/10">
            <button
              type="button"
              onClick={handleDelete}
              className="px-8 py-4 text-xs md:text-sm bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl flex items-center gap-3"
            >
              <Trash2 className="size-4" /> Delete
            </button>
            <button
              type="submit"
              className="px-10 py-4 text-xs md:text-sm bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl flex items-center gap-3"
            >
              <Save className="size-4" /> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
