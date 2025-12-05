"use client";
import { useState } from "react";
import { User, Phone, Globe, MapPin, Building2, Briefcase, Link2, Upload, Send, FileText, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { UploadButton } from "@uploadthing/react";

const roles = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "Mobile App Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Product Manager",
  "Quality Assurance Engineer",
  "Business Analyst",
  "Other",
];

export default function CareersPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    role: "",
    resume: "",
    resumeName: "",
    profileLink: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRemoveResume = () => {
    setForm((prev) => ({ ...prev, resume: "", resumeName: "" }));
    toast.success("Resume removed");
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.phone.trim()) err.phone = "Phone number is required";
    if (!form.country.trim()) err.country = "Country is required";
    if (!form.state.trim()) err.state = "State is required";
    if (!form.city.trim()) err.city = "City is required";
    if (!form.role) err.role = "Please select a role";
    if (!form.resume) err.resume = "Resume is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setIsSubmitting(true);

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      country: form.country.trim(),
      state: form.state.trim(),
      city: form.city.trim(),
      role: form.role,
      resume: form.resume,
      resumeName: form.resumeName,
      profileLink: form.profileLink.trim() || "Not provided",
    };

    try {
      console.log("Career Application Submitted:", payload);
      
      toast.success("Application submitted successfully!");
      
      setForm({
        name: "",
        phone: "",
        country: "",
        state: "",
        city: "",
        role: "",
        resume: "",
        resumeName: "",
        profileLink: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />

      <div className="min-h-screen bg-black text-white pt-24 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-7xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Join Our Team
              </span>
            </h1>
            <p className="text-sm md:text-lg text-cyan-200/70 font-medium">
              Be part of something extraordinary. Apply now and let's build the future together.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 via-transparent to-teal-900/10 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-2xl p-8 md:p-12">
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">Full Name</label>
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
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">Phone Number</label>
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
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">Country</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
                    <input
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 transition"
                      placeholder="India"
                    />
                  </div>
                  {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">State</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
                    <input
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 transition"
                      placeholder="Maharashtra"
                    />
                  </div>
                  {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">City</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 transition"
                      placeholder="Mumbai"
                    />
                  </div>
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Select Role</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full pl-12 pr-10 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition appearance-none cursor-pointer"
                  >
                    <option value="">Select a role</option>
                    {roles.map((r) => (
                      <option key={r} value={r} className="bg-gray-900">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Upload Resume (PDF Only)</label>
                
                {!form.resume ? (
                  <div className="w-full">
                    <UploadButton
                      endpoint="resumeUploader"
                      onClientUploadComplete={(res) => {
                        if (res && res[0]) {
                          setForm((prev) => ({
                            ...prev,
                            resume: res[0].url,
                            resumeName: res[0].name,
                          }));
                          toast.success("Resume uploaded successfully!");
                          if (errors.resume) {
                            setErrors((prev) => ({ ...prev, resume: "" }));
                          }
                        }
                      }}
                      onUploadError={(error) => {
                        console.error("Upload error:", error);
                        toast.error("Failed to upload resume. Please try again.");
                      }}
                      appearance={{
                        button: "w-full py-4 px-6 bg-white/5 border border-blue-500/30 rounded-xl text-cyan-400 hover:border-cyan-400 transition cursor-pointer ut-ready:bg-white/5 ut-uploading:bg-cyan-600/20 ut-uploading:border-cyan-400",
                        container: "w-full",
                        allowedContent: "hidden",
                      }}
                      content={{
                        button({ ready, isUploading }) {
                          if (isUploading) return (
                            <div className="flex items-center justify-center gap-3">
                              <Upload className="w-5 h-5 animate-pulse" />
                              <span>Uploading...</span>
                            </div>
                          );
                          if (ready) return (
                            <div className="flex items-center justify-center gap-3">
                              <Upload className="w-5 h-5" />
                              <span>Click to upload resume</span>
                            </div>
                          );
                          return "Getting ready...";
                        },
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full py-4 px-6 bg-cyan-600/10 border border-cyan-500/50 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-cyan-400" />
                      <span className="text-white truncate max-w-xs">{form.resumeName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveResume}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
                
                {errors.resume && <p className="text-red-400 text-xs mt-1">{errors.resume}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Profile Link (Optional)</label>
                <div className="relative">
                  <Link2 className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
                  <input
                    name="profileLink"
                    value={form.profileLink}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 transition"
                    placeholder="LinkedIn, Portfolio, GitHub, etc."
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-5 cursor-pointer bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold text-xl text-white hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                  {!isSubmitting && <Send className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-10 text-cyan-300/70 text-sm">
            Your information is 100% secure • We review all applications carefully • Average response time: 2-3 days
          </div>
        </div>
      </div>
    </>
  );
}