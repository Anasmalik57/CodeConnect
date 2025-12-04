"use client";
import { useState } from "react";
import { User, Mail, Send, Phone, Upload, Briefcase, IndianRupee, ChevronDown, MessageSquare, } from "lucide-react";
import { Toaster } from "react-hot-toast";

const services = [
  "Hire a Developer",
  "Buy Ready-Made Software",
  "Custom Development",
  "UI/UX Design",
  "Mobile App Development",
  "Backend & APIs",
  "DevOps & Cloud",
  "Consultation",
  "Other",
];

export default function BookServicePage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    description: "",
    budget: "",
  });
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file)
      setFileName(
        file.name.length > 35 ? file.name.slice(0, 32) + "..." : file.name
      );
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.phone.trim()) err.phone = "Phone is required";
    if (!form.email.trim()) err.email = "Email is required";
    if (!form.service) err.service = "Please select a service";
    if (!form.description.trim()) err.description = "Description is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1600));

    alert("Request received! We’ll contact you within 2 hours.");

    setForm({
      name: "",
      phone: "",
      email: "",
      service: "",
      description: "",
      budget: "",
    });
    setFileName("");
    setErrors({});
    setIsSubmitting(false);
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen bg-black text-white pt-24 pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Clean Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
              <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Book a Service
              </span>
            </h1>
            <p className="text-lg text-cyan-200/70 font-medium">
              Fill the form below and our team will reach out within 2 hours.
            </p>
          </div>

          {/* Minimal Professional Form Card */}
          <div className="bg-linear-to-br from-blue-900/20 via-transparent to-teal-900/10 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-2xl p-8 md:p-12">
            <form onSubmit={onSubmit} className="space-y-8">
              {/* Name, Phone, Email */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 transition"
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 transition"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 transition"
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Service Required
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full pl-12 pr-10 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition appearance-none cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-gray-900">
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-cyan-400 pointer-events-none" />
                </div>
                {errors.service && (
                  <p className="text-red-400 text-xs mt-1">{errors.service}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Project Description
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 transition resize-none"
                    placeholder="Brief us about your project requirements..."
                  />
                </div>
                {errors.description && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Budget + File */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Budget Range (Optional)
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
                    <input
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 transition"
                      placeholder="e.g. ₹1,00,000 – ₹3,00,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Attachments (Optional)
                  </label>
                  <label className="block">
                    <input
                      type="file"
                      onChange={handleFile}
                      className="hidden"
                    />
                    <div className="flex items-center gap-3 px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl cursor-pointer hover:border-cyan-400 transition">
                      <Upload className="w-5 h-5 text-cyan-400" />
                      <span className="text-cyan-200 text-sm">
                        {fileName || "Choose file or drag here"}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Clean Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => console.log(form)}
                  className="w-full py-5 cursor-pointer bg-linear-to-r from-blue-600 to-cyan-600 rounded-xl font-bold text-xl text-white hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? "Sending..." : "Submit Request"}
                  {!isSubmitting && <Send className="w-5 h-5" />}
                </button>
              </div>
            </form>
          </div>

          {/* Trust Footer */}
          <div className="text-center mt-10 text-cyan-300/70 text-sm">
            Your information is 100% secure • We never spam • Average response
            time: 1.5 hours
          </div>
        </div>
      </div>
    </>
  );
}
