"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, Upload } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import { API_BASE } from "@/lib/api";


export default function DeveloperDetailPage() {
  const { id } = useParams(); // ← yeh sahi tarika hai [id] folder se ID lene ka

  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter()

  // Fetch developer on mount
  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const res = await fetch(`${API_BASE}/developer/${id}`);
        const result = await res.json();

        if (result.success) {
          // Skills ko comma-separated string bana dete hain editing ke liye
          const devData = {
            ...result.data,
            skills: result.data.skills.join(", "),
          };
          setDeveloper(devData);
        } else {
          alert("Developer not found");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load developer");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDeveloper();
  }, [id]);

  const handleUploadSuccess = (result) => {
    const url = result?.info?.secure_url;
    if (url) {
      setDeveloper((prev) => ({ ...prev, photo: url }));
    }
    setIsUploading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeveloper((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const skillsArray = developer.skills.split(",").map((s) => s.trim()).filter(Boolean);

    const updatedData = {
      ...developer,
      skills: skillsArray,
      experience: Number(developer.experience),
      hourlyRate: Number(developer.hourlyRate),
    };

    try {
      const res = await fetch(`${API_BASE}/developer/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (result.success) {
        alert("Developer updated successfully!");
        router.back()

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
      const res = await fetch(`${API_BASE}/developer/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success) {
        alert("Developer deleted!");
        window.location.href = "/admin/all-developers";
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  const removePhoto = (e) => {
    e.stopPropagation();
    setDeveloper((prev) => ({ ...prev, photo: "" }));
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  if (!developer) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Developer not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="border-b border-white/10 backdrop-blur-xl bg-white/2">
        <div className="px-8 py-6 flex items-center gap-4">
          <Link href="/admin/all-developers" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Developers</span>
          </Link>
        </div>
      </div>

      <div className="p-8 max-w-5xl mx-auto">
        

        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Photo Upload */}
          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-4">Profile Photo</label>
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={handleUploadSuccess}
              onQueuesStart={() => setIsUploading(true)}
              onQueuesEnd={() => setIsUploading(false)}
            >
              {({ open }) => (
                <div
                  onClick={() => open()}
                  className="border-2 w-fit border-dashed border-white/20 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500/60 hover:bg-white/5 transition-all"
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-blue-400">Uploading...</p>
                    </div>
                  ) : developer.photo ? (
                    <div className="space-y-4">
                      <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden border-4 border-blue-500/50 shadow-2xl">
                        <Image src={developer.photo} alt="Profile" width={160} height={160} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-green-400 font-medium">Image Uploaded</p>
                      <button type="button" onClick={removePhoto} className="text-red-400 text-sm hover:text-red-300">
                        Remove Photo
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-16 h-16 mx-auto text-gray-400" />
                      <p className="text-white text-xl">Click to upload new photo</p>
                      <p className="text-gray-500">JPG, PNG • Max 10MB</p>
                    </div>
                  )}
                </div>
              )}
            </CldUploadWidget>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="name" value={developer.name} onChange={handleChange} placeholder="Full Name" className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none transition" required />
            <input type="text" name="skills" value={developer.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none transition" required />
            <input type="number" name="experience" value={developer.experience} onChange={handleChange} placeholder="Experience (years)" className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none transition" required />
            <input type="number" name="hourlyRate" value={developer.hourlyRate} onChange={handleChange} placeholder="Hourly Rate (₹)" className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none transition" required />
            <input type="text" name="state" value={developer.state} onChange={handleChange} placeholder="State" className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none transition" required />
            <input type="text" name="country" value={developer.country} onChange={handleChange} placeholder="Country" className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none transition" required />
            
            <select name="availability" value={developer.availability} onChange={handleChange} className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500/60 outline-none transition">
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>

            <select name="level" value={developer.level} onChange={handleChange} className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500/60 outline-none transition">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>

           <select name="preferredLanguage" value={developer.preferredLanguage} onChange={handleChange} className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500/60 outline-none transition">
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Telugu">Telugu</option>
                <option value="Tamil">Tamil</option>
                <option value="Spanish">Spanish</option>
                <option value="Other">Other</option>
            </select>

            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
              <span className="text-gray-300">Available for Work</span>
              <button
                type="button"
                onClick={() => setDeveloper((prev) => ({ ...prev, available: !prev.available }))}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  developer.available ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    developer.available ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-white/10">
            <button type="button" onClick={handleDelete} className="px-8 py-4 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-semibold rounded-xl flex items-center gap-3 transition-all hover:scale-105">
              <Trash2 className="w-5 h-5" />
              Delete Developer
            </button>

            <button type="submit" className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl flex items-center gap-3 shadow-xl hover:shadow-purple-500/50 transition-all hover:scale-105">
              <Save className="w-5 h-5" />
              Update Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}