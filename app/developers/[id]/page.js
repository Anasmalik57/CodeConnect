"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  Calendar,
  IndianRupee,
  Award,
  BadgeCheck,
  ArrowLeft,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { developers } from "@/components/Developer/DevListData";

export default function DeveloperDetailClient() {
  const params = useParams();
  const router = useRouter();
  const [developer, setDeveloper] = useState(null);
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
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

  useEffect(() => {
    const dev = developers.find((d) => d.id === parseInt(params.id));
    if (dev) {
      setDeveloper(dev);
    } else {
      router.push("/developers");
    }
  }, [params.id, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      developer: {
        id: developer.id,
        name: developer.name,
        hourlyRate: developer.hourlyRate,
        experience: developer.experience,
        level: developer.level,
      },
      booking: {
        clientName: formData.clientName,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        estimatedBudget: formData.budget,
        description: formData.description,
        developerRate: `₹${developer.hourlyRate}/hr`,
      },
      timestamp: new Date().toISOString(),
    });
    alert("Booking request submitted! Check console for details.");
  };

  if (!developer) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16 px-4 md:px-6">
      <div className="max-w-[1380px] mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-all px-4 py-2 rounded-full bg-blue-900/40"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left Side - Developer Info */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Card */}
            <div className="relative bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="relative">
                    <div className="size-24 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-xl">
                      <Image
                        src={developer.photo}
                        alt={developer.name}
                        width={96}
                        height={96}
                        unoptimized
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-linear-to-r from-blue-500 to-purple-500 rounded-full p-2">
                      <Sparkles className="size-3.5 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {developer.name}
                    </h1>
                    <p className="text-sm text-gray-400 mb-4">Remote • India</p>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        <Star className="size-3.5 text-yellow-400 fill-current" />
                        <span className="text-sm text-white font-medium">
                          {developer.rating}
                        </span>
                      </div>

                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                          developer.level === "Expert"
                            ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
                            : developer.level === "Beginner"
                            ? "text-green-400 bg-green-500/10 border-green-500/20"
                            : "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
                        }`}
                      >
                        {developer.level}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                    <div className="flex justify-center mb-2">
                      <Calendar className="size-5 text-blue-400" />
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">
                      {developer.experience}+
                    </p>
                    <p className="text-xs text-gray-400">Years Exp</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                    <div className="flex justify-center mb-2">
                      <IndianRupee className="size-5 text-green-400" />
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">
                      ₹{developer.hourlyRate}
                    </p>
                    <p className="text-xs text-gray-400">Per Hour</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                    <div className="flex justify-center mb-2">
                      <Award className="size-5 text-purple-400" />
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">
                      {developer.level}
                    </p>
                    <p className="text-xs text-gray-400">Level</p>
                  </div>
                </div>

                {/* Availability Badge */}
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
                  <BadgeCheck
                    className={`size-4 ${
                      developer.availability === "Full-time"
                        ? "text-blue-400"
                        : developer.availability === "Part-time"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  />
                  <span className="text-sm text-gray-300">
                    {developer.availability}
                  </span>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {developer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Compact Booking Form */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden">
              {/* Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <TrendingUp className="size-5 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">Book Now</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-4 justify-between">
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      className=" w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      required
                      className=" w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>
                  <div className="flex gap-4 justify-between">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      required
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                    />

                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-slate-900">
                        Select project type
                      </option>
                      {projectTypes.map((type) => (
                        <option
                          key={type}
                          value={type}
                          className="bg-slate-900"
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="Budget (₹)"
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                  />

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Project description"
                    rows={3}
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                  />

                  {/* Rate Display */}
                  <div className="flex items-center justify-between py-3 px-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <span className="text-xs text-gray-400">Hourly Rate</span>
                    <span className="text-sm font-bold text-blue-400">
                      ₹{developer.hourlyRate}/hr
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
