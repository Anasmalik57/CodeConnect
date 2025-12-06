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

export default function SoftwareDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch project
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${API_BASE}/project/${id}`);
        const result = await res.json();

        if (result.success) {
          const projectData = {
            ...result.data,
            tech: result.data.tech.join(", "),
            platforms: result.data.platforms || [],
            // description is already HTML string from DB (or plain if new)
            description: result.data.description || "",
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
      // description already HTML string from ReactQuill
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
      const res = await fetch(`${API_BASE}/project/${id}`, { method: "DELETE" });
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
        <p className="text-2xl text-red-400">Project not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/10 backdrop-blur-xl bg-white/2">
        <div className="px-8 py-6 flex items-center gap-4">
          <Link href="/admin/softwares" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" /> Back to Projects
          </Link>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        <form onSubmit={handleUpdate} className="space-y-10">

          {/* Screenshots - unchanged */}
          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-4">Screenshots (Max 3)</label>
            {project.screenshots?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {project.screenshots.map((url, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden border-2 border-blue-500/50 hover:border-blue-500">
                    <Image src={url} alt="" width={400} height={300} className="w-full h-48 object-cover" />
                    <button type="button" onClick={() => removeScreenshot(i)}
                      className="absolute top-2 right-2 p-2 bg-red-600/90 rounded-lg opacity-0 group-hover:opacity-100">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {project.screenshots.length < 3 && (
              <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleUploadSuccess}
                onQueuesStart={() => setIsUploading(true)}
                onQueuesEnd={() => setIsUploading(false)}>
                {({ open }) => (
                  <div onClick={open} className="border-2 border-dashed border-white/20 rounded-2xl p-10 text-center cursor-pointer hover:border-blue-500/60 hover:bg-white/5">
                    {isUploading ? (
                      <>Uploading...</>
                    ) : (
                      <>
                        <Upload className="w-16 h-16 mx-auto text-gray-400" />
                        <p className="text-white text-xl font-medium">Click to Upload Screenshot</p>
                        <p className="text-gray-500">{project.screenshots.length}/3 uploaded</p>
                      </>
                    )}
                  </div>
                )}
              </CldUploadWidget>
            )}
          </div>

          {/* Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="name" value={project.name} onChange={handleChange} placeholder="Project Name"
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl" required />
            <select name="category" value={project.category} onChange={handleChange}
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl">
              {["Food","E-commerce","Health","Education","Finance","Social","Other"].map(c => (
                <option key={c} value={c} className="bg-black">{c}</option>
              ))}
            </select>
          </div>

          {/* RICH TEXT DESCRIPTION - NEW */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-300">Project Description (supports bold, lists, headings, etc.)</label>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <ReactQuill
                theme="snow"
                value={project.description}
                onChange={(html) => setProject(prev => ({ ...prev, description: html }))}
                placeholder="Write rich description here..."
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'clean']
                  ]
                }}
                className="bg-transparent text-white"
                style={{ minHeight: '180px' }}
              />
            </div>
            <p className="text-sm text-gray-500">Formatting will be saved & displayed exactly as you see</p>
          </div>

          {/* Platforms */}
          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-4">Platforms</label>
            <div className="flex flex-wrap gap-4">
              {["Android", "iOS", "Web", "Desktop"].map(p => (
                <label key={p} className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10">
                  <input type="checkbox" checked={project.platforms.includes(p)}
                    onChange={() => togglePlatform(p)} className="w-5 h-5 accent-blue-500" />
                  <span>{p}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tech Stack & Demo Link */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="tech" value={project.tech} onChange={handleChange}
              placeholder="Tech Stack (comma separated)" className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl" required />
            <input type="url" name="demoLink" value={project.demoLink || ""} onChange={handleChange}
              placeholder="Demo Link (optional)" className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl" />
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["price","customization","deployment","branding","payment","gateway","whatsapp","multiLanguage"].map(field => (
              <input key={field} type="number" name={field} value={project[field]} onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g,' $1') + " (₹)"}
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl" min="0" />
            ))}
          </div>

          {/* Active Toggle */}
          <label className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl w-fit">
            <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange}
              className="w-5 h-5 accent-green-500" />
            <span>Active Project</span>
          </label>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-white/10">
            <button type="button" onClick={handleDelete}
              className="px-8 py-4 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl flex items-center gap-3">
              <Trash2 className="w-5 h-5" /> Delete Project
            </button>
            <button type="submit"
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl flex items-center gap-3">
              <Save className="w-5 h-5" /> Update Project
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}