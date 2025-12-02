"use client"
import { X, User, Phone, Mail, Briefcase, Globe, Clock } from "lucide-react";
import { useState } from "react";
import { API_BASE } from "@/lib/api";

export const RequestDemoDialog = ({ product, isOpen, onClose }) => {


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    preferredLanguage: "",
    availabilityTime: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async () => {
  // Validation
  if (
    !formData.name ||
    !formData.phone ||
    !formData.email ||
    !formData.projectType ||
    !formData.preferredLanguage ||
    !formData.availabilityTime
  ) {
    alert("Please fill all required fields");
    return;
  }

  const demoRequestData = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    productId: product?._id || product?.id,
    productName: product?.name,
    projectType: formData.projectType,
    preferredLanguage: formData.preferredLanguage,
    availabilityTime: formData.availabilityTime,
  };

  try {
    const response = await fetch(`${API_BASE}/request-demo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(demoRequestData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      // Success
      alert("Thank you! Your demo request has been submitted successfully.");
      
      // Reset form + close dialog
      setFormData({
        name: "",
        phone: "",
        email: "",
        projectType: "",
        preferredLanguage: "",
        availabilityTime: "",
      });
      onClose();
    } else {
      alert(result.message || "Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error("Demo Request Error->", err);
    alert("Network error. Please check your connection and try again.");
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-black/60 backdrop-blur-2xl border border-blue-500/30 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 rounded-3xl blur opacity-20" />
        
        {/* Header */}
        <div className="relative p-6 border-b border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-sky-600/10 to-teal-500/10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-sky-400 to-teal-400 bg-clip-text text-transparent">
                Request Demo
              </h2>
              <p className="text-blue-300/70 text-sm mt-1 font-medium">
                {product?.name || "Get started with our product"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 bg-white/5 hover:bg-red-500/20 border border-blue-500/30 hover:border-red-500/50 rounded-xl transition-all duration-300 hover:rotate-90 group"
            >
              <X className="w-5 h-5 text-blue-300 group-hover:text-red-400 transition-colors" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="relative p-6 space-y-5">
          {/* Name & Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-blue-400/60 group-hover/input:text-blue-400 transition-colors" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-blue-500/30 rounded-2xl text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10"
                placeholder="Your name"
              />
            </div>

            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="w-5 h-5 text-blue-400/60 group-hover/input:text-blue-400 transition-colors" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-blue-500/30 rounded-2xl text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10"
                placeholder="Phone number"
              />
            </div>
          </div>

          {/* Email & Project Type Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-blue-400/60 group-hover/input:text-blue-400 transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-blue-500/30 rounded-2xl text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10"
                placeholder="Email address"
              />
            </div>

            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Briefcase className="w-5 h-5 text-blue-400/60 group-hover/input:text-blue-400 transition-colors" />
              </div>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-blue-500/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 appearance-none cursor-pointer"
              >
                <option value="" className="bg-gray-900">Select project type</option>
                <option value="website" className="bg-gray-900">Website</option>
                <option value="mobile-app" className="bg-gray-900">Mobile App</option>
                <option value="both" className="bg-gray-900">Both (Website & Mobile App)</option>
                <option value="other" className="bg-gray-900">Other</option>
              </select>
            </div>
          </div>

          {/* Language & Availability Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="w-5 h-5 text-blue-400/60 group-hover/input:text-blue-400 transition-colors" />
              </div>
              <select
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-blue-500/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 appearance-none cursor-pointer"
              >
                <option value="" className="bg-gray-900">Select language</option>
                <option value="english" className="bg-gray-900">English</option>
                <option value="hindi" className="bg-gray-900">Hindi</option>
                <option value="hinglish" className="bg-gray-900">Hinglish</option>
              </select>
            </div>

            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Clock className="w-5 h-5 text-blue-400/60 group-hover/input:text-blue-400 transition-colors" />
              </div>
              <select
                name="availabilityTime"
                value={formData.availabilityTime}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-blue-500/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 appearance-none cursor-pointer"
              >
                <option value="" className="bg-gray-900">Select time slot</option>
                <option value="morning" className="bg-gray-900">Morning (9 AM - 12 PM)</option>
                <option value="afternoon" className="bg-gray-900">Afternoon (12 PM - 4 PM)</option>
                <option value="evening" className="bg-gray-900">Evening (4 PM - 8 PM)</option>
                <option value="flexible" className="bg-gray-900">Flexible</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full group/btn relative mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 rounded-2xl font-bold text-white overflow-hidden shadow-2xl shadow-sky-500/40 hover:shadow-sky-500/70 transition-all duration-400 hover:scale-[1.02] active:scale-95"
          >
            <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
            <span className="relative">Submit Request</span>
          </button>
        </div>
      </div>
    </div>
  );
};