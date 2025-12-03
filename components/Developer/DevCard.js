import React, { useState } from "react";
import {
  IndianRupee,
  Sparkles,
  BadgeCheck,
  Calendar,
  X,
  Languages,
  Currency,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/api";

const DevCard = ({ filteredDevelopers }) => {
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    projectType: "",
    description: "",
  });

  const projectTypes = [
    "Web App",
    "Mobile App",
    "E-commerce",
    "Landing Page",
    "Dashboard",
    "API Development",
    "Full Stack Project",
    "Other",
  ];

  const router = useRouter();

  const handleBookClick = (developer) => {
    setSelectedDeveloper(developer);
    setFormData({
      clientName: "",
      email: "",
      projectType: "",
      description: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Quick validation (extra safety)
    if (
      !formData.clientName ||
      !formData.email ||
      !formData.projectType ||
      !formData.description
    ) {
      alert("Please fill all fields");
      return;
    }

    const enquiryData = {
      clientName: formData.clientName,
      email: formData.email, // Note: Yeh field email ya phone dono ke liye hai, lekin schema mein email hai – agar phone bhejna hai toh adjust kar lena
      projectType: formData.projectType,
      description: formData.description,
      developer: {
        id: selectedDeveloper._id,
        name: selectedDeveloper.name,
        level: selectedDeveloper.level,
        experience: selectedDeveloper.experience,
        hourlyRate: selectedDeveloper.hourlyRate,
      },
    };

    try {
      const response = await fetch(`${API_BASE}/enquire-developer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiryData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSelectedDeveloper(null); // Dialog close
        setFormData({
          clientName: "",
          email: "",
          projectType: "",
          description: "",
        }); // Form reset

        setTimeout(() => {
          alert("Your enquiry request has been submitted successfully!");
        }, 2000);
      } else {
        setTimeout(() => {
          alert(result.message || "Something went wrong. Please try again.");
        }, 3000);
      }
    } catch (err) {
      console.error("Enquiry Error:", err);
      alert("Network error. Check your connection and try again.");
    }
  };
  const handleCancel = () => {
    setSelectedDeveloper(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDevelopers.map((dev, index) => (
          <button
            key={dev._id}
            onClick={() => router.push(`/developers/${dev?._id}`)}
            className="group relative bg-linear-to-br from-blue-900/30 via-sky-900/20 to-teal-900/30 backdrop-blur-2xl border border-blue-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/60 hover:shadow-blue-600/80 hover:border-blue-400 transition-all duration-500"
          >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-sky-600/20 to-teal-600/20 blur-3xl" />

            <div className="relative p-6">
              {/* Profile Section */}
              <div className="flex items-start gap-4 mb-6">
                {/* Avatar with Animation */}
                <div className="relative shrink-0">
                  <div className="size-20 rounded-2xl overflow-hidden ring-4 ring-blue-500/60 shadow-2xl shadow-blue-800/70">
                    <Image
                      src={dev.photo}
                      alt={dev.name}
                      width={80}
                      height={80}
                      unoptimized
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-linear-to-r from-blue-500 to-sky-500 rounded-full p-1.5 shadow-lg">
                    <Sparkles className="size-4 text-white" />
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className="text-xl font-bold text-left text-white truncate"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {dev.name}
                    </h3>
                    <div className="absolute top-8 right-7">
                      {dev?.available == true ? (
                        <div className="size-3 p-1 bg-green-500 rounded-full animate-pulse" />
                      ) : (
                        <div className="size-3 p-2 bg-red-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    {/* Rating */}
                    {/* <div className="flex items-center gap-1 bg-blue-900/50 px-2 py-1 rounded-full">
                      <Star className="size-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-white font-semibold">
                        {Math.floor(Math.random()*5)+1}
                      </span>
                    </div> */}
                  </div>

                  <p className="text-xs text-blue-300 mt-1">
                    {dev?.state} • {dev?.country}
                  </p>

                  {/* Level Badge */}
                  <span
                    className={`inline-block text-xs px-3 py-1 rounded-full mt-2 ${
                      dev.level === "Expert"
                        ? "text-blue-400 bg-blue-900/50"
                        : dev.level === "Beginner"
                        ? "text-green-400 bg-green-900/50"
                        : "text-yellow-400 bg-yellow-900/50"
                    }`}
                  >
                    {dev.level}
                  </span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {dev.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-linear-to-tl from-blue-600/40 to-sky-600/40 backdrop-blur-md rounded-full text-xs font-medium text-white border border-blue-500/50 shadow-md"
                  >
                    {skill}
                  </span>
                ))}
                <span className="px-3 py-1 bg-linear-to-tl from-blue-600/40 to-sky-600/40 backdrop-blur-md rounded-full text-xs font-medium text-white border border-blue-500/50 shadow-md">
                  +{dev?.skills.length - 4}
                </span>
              </div>
              {/* langs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {dev.preferredLanguage.slice(0, 4).map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-linear-to-tl from-purple-600/40 to-pink-600/40 backdrop-blur-md rounded-full text-xs font-medium text-white border border-purple-500/50 shadow-md"
                  >
                    {lang}
                  </span>
                ))}

                {dev.preferredLanguage.length > 4 && (
                  <span className="px-3 py-1 bg-linear-to-tl from-purple-600/40 to-pink-600/40 backdrop-blur-md rounded-full text-xs font-medium text-white border border-purple-500/50 shadow-md">
                    +{dev.preferredLanguage.length - 4}
                  </span>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {/* Experience */}
                <div className="flex flex-col items-center p-2 bg-blue-900/30 rounded-xl border border-blue-500/30">
                  <Calendar className="size-4 text-blue-400 mb-1" />
                  <span className="text-xs text-blue-300 pb-1">Exp</span>
                  <span className="text-sm font-bold text-white">
                    {dev.experience}+ yrs
                  </span>
                </div>

                {/* Rate */}
                <div className="flex flex-col items-center p-2 bg-green-900/30 rounded-xl border border-green-500/30">
                  <IndianRupee className="size-4 text-green-400 mb-1" />
                  <span className="text-xs text-green-300 pb-1">Rate</span>
                  <span className="text-sm font-bold text-white">
                    ₹{dev.hourlyRate}/hr
                  </span>
                </div>

                {/* Preferred Language */}
                <div className="flex flex-col items-center p-2 bg-purple-900/30 rounded-xl border border-purple-500/30">
                  <IndianRupee className="size-4 text-purple-400 mb-1" />
                  <span className="text-xs text-purple-300 pb-1">Rate</span>
                  <span className="text-sm font-bold text-white">
                    {dev?.hourlyRate}
                  </span>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 mb-4 p-2 bg-sky-900/20 rounded-lg border border-sky-500/30">
                <BadgeCheck
                  className={`size-5 ${
                    dev.availability === "Full-time"
                      ? "text-blue-400"
                      : dev.availability === "Part-time"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                />
                <span className="text-xs text-blue-300">Availability:</span>
                <span className="text-sm font-bold text-white">
                  {dev.availability}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <button
                    onClick={() => router.push(`/developers/${dev?._id}`)}
                    className="w-full px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Book Developer
                  </button>
                </div>
                <button
                  onClick={() => handleBookClick(dev)}
                  className="px-4 py-2 bg-transparent border border-blue-500/50 text-white rounded-lg hover:bg-blue-900/30 transition-colors"
                >
                  Enquire
                </button>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Booking Dialog */}
      <>
        {selectedDeveloper && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCancel}
          >
            <div
              className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-blue-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-linear-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border-b border-blue-500/30 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Book {selectedDeveloper.name}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="size-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Your Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      placeholder="e.g. Priya Gupta"
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Email / Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email / Phone
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com / +91-9xxxx"
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Project Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Estimated Budget */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Estimated Budget (₹)
                    </label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      placeholder="50000"
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div> */}
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Short Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your requirements..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Rate and Payment Info */}
                {/* <div className="flex items-center justify-between bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-300">
                    <Clock className="size-5" />
                    <span className="font-medium">
                      Rate: ₹{selectedDeveloper.hourlyRate}/hr
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-green-300">
                    <BadgeCheck className="size-5" />
                    <span className="text-sm">
                      Secure payment & confirmation
                    </span>
                  </div>
                </div> */}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-6 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/50"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default DevCard;
