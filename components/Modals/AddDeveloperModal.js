// components/AdminPanel/AddDeveloperModal.js

"use client";

import { useState, useEffect, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { X, Upload, Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { countrielsList } from "../AdminPanel/Data";

export default function AddDeveloperModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    photo: "/dev.webp",
    skills: "",
    experience: "",
    hourlyRate: "",
    availability: "Full-time",
    level: "Intermediate",
    country: "India",
    state: "",
    preferredLanguage: "English",
  });

  const [isUploading, setIsUploading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => e.key === "Escape" && onClose();
    const handleOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleOutside);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [isOpen, onClose]);

  const handleUploadSuccess = (result) => {
    const url = result?.info?.secure_url;
    if (url) {
      setFormData((prev) => ({ ...prev, photo: url }));
    }
    setIsUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert skills (comma separated → array)
    const skillsArray = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // Convert preferred languages (comma separated → array)
    const preferredLangArray = formData.preferredLanguage
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean);

    // Create final developer object
    const newDeveloper = {
      ...formData,
      skills: skillsArray,
      preferredLanguage: preferredLangArray,
      experience: Number(formData.experience) || 0,
      hourlyRate: Number(formData.hourlyRate) || 0,
    };

    // Send to parent
    onAdd?.(newDeveloper);

    // Reset form & close modal
    setFormData({
      name: "",
      photo: "/dev.webp",
      skills: "",
      experience: "",
      hourlyRate: "",
      availability: "Full-time",
      level: "Intermediate",
      country: "India",
      state: "",
      preferredLanguage: "English",
    });
    onClose();
  };

  const removePhoto = (e) => {
    e.stopPropagation();
    setFormData((prev) => ({ ...prev, photo: "/dev.webp" }));
  };

  if (!isOpen) return null;

  const isDefaultPhoto = formData.photo === "/dev.webp";

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl shadow-purple-600/30 p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Add New Developer
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Photo Upload */}
            <div>
              <label className="block text-lg font-semibold text-gray-300 mb-4">
                Profile Photo
              </label>

              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleUploadSuccess}
                onQueuesStart={() => setIsUploading(true)}
                onQueuesEnd={() => setIsUploading(false)}
              >
                {({ open }) => (
                  <div
                    onClick={() => open()}
                    className="border-2 border-dashed border-white/30 rounded-2xl p-10 text-center cursor-pointer hover:border-blue-500/60 hover:bg-white/5 transition-all duration-300"
                  >
                    {isUploading ? (
                      <div className="space-y-4">
                        <Loader2 className="w-14 h-14 mx-auto animate-spin text-blue-400" />
                        <p className="text-white text-lg">Uploading...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden border-4 border-blue-500/50 shadow-2xl">
                          <Image
                            src={formData.photo}
                            width={160}
                            height={160}
                            alt="Developer Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {isDefaultPhoto ? (
                          <>
                            <p className="text-gray-400 text-lg">
                              Default Photo Selected
                            </p>
                            <p className="text-gray-500 text-sm">
                              Click to upload custom photo
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-green-400 font-bold text-lg">
                              Uploaded Successfully!
                            </p>
                            <button
                              type="button"
                              onClick={removePhoto}
                              className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                            >
                              Use Default Photo
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CldUploadWidget>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name *"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none transition-colors"
              />

              <input
                type="text"
                placeholder="Skills (comma separated) *"
                required
                value={formData.skills}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, skills: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none transition-colors"
              />

              <input
                type="number"
                placeholder="Experience (years) *"
                required
                min="0"
                value={formData.experience}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, experience: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none transition-colors"
              />

              <input
                type="number"
                placeholder="Hourly Rate (₹) *"
                required
                min="0"
                value={formData.hourlyRate}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, hourlyRate: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none transition-colors"
              />

              <input
                type="text"
                placeholder="State *"
                required
                value={formData.state}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, state: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none transition-colors"
              />

              <select
                value={formData.availability}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, availability: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none transition-colors"
              >
                <option value="Full-time" className="bg-black">
                  Full-time
                </option>
                <option value="Part-time" className="bg-black">
                  Part-time
                </option>
                <option value="Contract" className="bg-black">
                  Contract
                </option>
              </select>

              <select
                value={formData.level}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, level: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none transition-colors"
              >
                <option value="Beginner" className="bg-black">
                  Beginner
                </option>
                <option value="Intermediate" className="bg-black">
                  Intermediate
                </option>
                <option value="Expert" className="bg-black">
                  Expert
                </option>
              </select>

              <select
                value={formData.country}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    country: e.target.value,
                  }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none transition-colors"
              >
                {countrielsList.map((country) => (
                  <option key={country} value={country} className="bg-black">
                    {country}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Languages (e.g., English, Hindi) *"
                required
                value={formData.preferredLanguage}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    preferredLanguage: e.target.value,
                  }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none transition-colors"
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 border border-white/20 rounded-xl text-gray-300 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-10 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white flex items-center gap-3 shadow-xl hover:shadow-purple-500/50 transition-all"
              >
                <Check className="w-5 h-5" />
                Add Developer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}