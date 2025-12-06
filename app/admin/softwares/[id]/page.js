"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, Upload, X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import { API_BASE } from "@/lib/api";

export default function SoftwareDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch project on mount
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${API_BASE}/project/${id}`);
        const result = await res.json();

        if (result.success) {
          // Tech ko comma-separated string bana dete hain
          const projectData = {
            ...result.data,
            tech: result.data.tech.join(", "),
            platforms: result.data.platforms || [],
          };
          setProject(projectData);
        } else {
          alert("Project not found");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  const handleUploadSuccess = (result) => {
    const url = result?.info?.secure_url;
    if (url && project.screenshots.length < 3) {
      setProject((prev) => ({
        ...prev,
        screenshots: [...prev.screenshots, url],
      }));
    }
    setIsUploading(false);
  };

  const removeScreenshot = (index) => {
    setProject((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePlatform = (platform) => {
    setProject((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const techArray = project.tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedData = {
      ...project,
      tech: techArray,
      price: Number(project.price) || 0,
      customization: Number(project.customization) || 0,
      deployment: Number(project.deployment) || 0,
      branding: Number(project.branding) || 0,
      payment: Number(project.payment) || 0,
      gateway: Number(project.gateway) || 0,
      whatsapp: Number(project.whatsapp) || 0,
      multiLanguage: Number(project.multiLanguage) || 0,
    };

    try {
      const res = await fetch(`${API_BASE}/project/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (result.success) {
        alert("Project updated successfully!");
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
      const res = await fetch(`${API_BASE}/project/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success) {
        alert("Project deleted!");
        window.location.href = "/admin/softwares";
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
          <p className="text-gray-400">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-2xl text-red-400">Project not found</p>
          <Link
            href="/admin/softwares"
            className="text-blue-400 hover:text-blue-300"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="border-b border-white/10 backdrop-blur-xl bg-white/2">
        <div className="px-8 py-6 flex items-center gap-4">
          <Link
            href="/admin/softwares"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Screenshots Section */}
          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-4">
              Screenshots (Max 3)
            </label>

            {/* Display Existing Screenshots */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {project.screenshots.map((url, index) => (
                  <div
                    key={index}
                    className="relative group rounded-xl overflow-hidden border-2 border-blue-500/50 hover:border-blue-500 transition-all"
                  >
                    <Image
                      src={url}
                      alt={`Screenshot ${index + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeScreenshot(index)}
                      className="absolute top-2 right-2 p-2 bg-red-600/90 rounded-lg hover:bg-red-700 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload New Screenshot */}
            {project.screenshots.length < 3 && (
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleUploadSuccess}
                onQueuesStart={() => setIsUploading(true)}
                onQueuesEnd={() => setIsUploading(false)}
              >
                {({ open }) => (
                  <div
                    onClick={() => open()}
                    className="border-2 border-dashed border-white/20 rounded-2xl p-10 text-center cursor-pointer hover:border-blue-500/60 hover:bg-white/5 transition-all"
                  >
                    {isUploading ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-blue-400 text-lg">Uploading...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-16 h-16 mx-auto text-gray-400" />
                        <p className="text-white text-xl font-medium">
                          Click to Upload Screenshot
                        </p>
                        <p className="text-gray-500">
                          {project.screenshots.length}/3 uploaded • JPG, PNG,
                          WebP
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CldUploadWidget>
            )}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
              placeholder="Project Name"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none transition"
              required
              minLength={3}
              maxLength={100}
            />

            <select
              name="category"
              value={project.category}
              onChange={handleChange}
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500/60 outline-none transition"
            >
              <option value="Food" className="bg-black">Food</option>
              <option value="E-commerce" className="bg-black">E-commerce</option>
              <option value="Health" className="bg-black">Health</option>
              <option value="Education" className="bg-black">Education</option>
              <option value="Finance" className="bg-black">Finance</option>
              <option value="Social" className="bg-black">Social</option>
              <option value="Other" className="bg-black">Other</option>
            </select>
          </div>

          {/* Description */}
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            placeholder="Project Description"
            rows={4}
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none transition resize-none"
            required
            minLength={10}
            maxLength={500}
          />

          {/* Platforms */}
          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-4">
              Platforms
            </label>
            <div className="flex flex-wrap gap-4">
              {["Android", "iOS", "Web", "Desktop"].map((platform) => (
                <label
                  key={platform}
                  className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={project.platforms.includes(platform)}
                    onChange={() => togglePlatform(platform)}
                    className="w-5 h-5 accent-blue-500"
                  />
                  <span className="text-white font-medium">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tech Stack & Demo Link */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="tech"
              value={project.tech}
              onChange={handleChange}
              placeholder="Tech Stack (comma separated)"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none transition"
              required
            />

            <input
              type="url"
              name="demoLink"
              value={project.demoLink || ""}
              onChange={handleChange}
              placeholder="Demo Link (optional)"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none transition"
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <input
              type="number"
              name="price"
              value={project.price}
              onChange={handleChange}
              placeholder="Base Price (₹)"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none transition"
              required
              min="0"
            />

            <input
              type="number"
              name="customization"
              value={project.customization}
              onChange={handleChange}
              placeholder="Customization (₹)"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none transition"
              min="0"
            />

            <input
              type="number"
              name="deployment"
              value={project.deployment}
              onChange={handleChange}
              placeholder="Deployment (₹)"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none transition"
              min="0"
            />

            <input
              type="number"
              name="branding"
              value={project.branding}
              onChange={handleChange}
              placeholder="Branding (₹)"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none transition"
              min="0"
            />

            <input
              type="number"
              name="payment"
              value={project.payment}
              onChange={handleChange}
              placeholder="Payment (₹)"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none transition"
              min="0"
            />

            <input
              type="number"
              name="gateway"
              value={project.gateway}
              onChange={handleChange}
              placeholder="Gateway (₹)"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none transition"
              min="0"
            />

            <input
              type="number"
              name="whatsapp"
              value={project.whatsapp}
              onChange={handleChange}
              placeholder="WhatsApp (₹)"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none transition"
              min="0"
            />

            <input
              type="number"
              name="multiLanguage"
              value={project.multiLanguage}
              onChange={handleChange}
              placeholder="Multi-Language (₹)"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none transition"
              min="0"
            />
          </div>

          {/* Active Status */}
          <label className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all w-fit">
            <input
              type="checkbox"
              name="isActive"
              checked={project.isActive}
              onChange={handleChange}
              className="w-5 h-5 accent-green-500"
            />
            <span className="text-white font-medium">Active Project</span>
          </label>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-white/10">
            <button
              type="button"
              onClick={handleDelete}
              className="px-8 py-4 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-semibold rounded-xl flex items-center gap-3 transition-all hover:scale-105"
            >
              <Trash2 className="w-5 h-5" />
              Delete Project
            </button>

            <button
              type="submit"
              className="px-10 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl flex items-center gap-3 shadow-xl hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              <Save className="w-5 h-5" />
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}