"use client";

import { useState } from "react";
import { Server, Database, Smartphone, FileCheck, IndianRupee, ArrowRight, DownloadCloud, CheckCircle, } from "lucide-react";
import BookServiceModal from "@/components/Modals/BookServiceModal";
import InstallOwnCodeModal from "@/components/Modals/InstallOwnCodeModal";
import { languages, setupTypes, timeSlots } from "@/components/Modals/Data";

export default function CodeScriptInstallation() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Book Services Form
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    languages: [], // array for multiple selection
    callbackTime: "",
    brief: "",
  });

  // Install Own Code Form
  const [installForm, setInstallForm] = useState({
    productLink: "",
    codingLanguage: "",
    setupType: "Web Only",
    preferredTime: "",
    communicationLang: "English",
    notes: "",
  });

  const toggleLanguage = (lang) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInstallChange = (e) => {
    const { name, value } = e.target;
    setInstallForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({
      "Full Name": formData.fullName || "-",
      Email: formData.email || "-",
      Phone: formData.phone || "-",
      Languages:
        formData.languages.length > 0
          ? formData.languages.join(", ")
          : "Not selected",
      "Callback Time": formData.callbackTime || "Not selected",
      "Project Brief": formData.brief || "No brief provided",
    });
    alert("Form Submitted! Check browser console for details.");
    setIsBookModalOpen(false);
  };

  //   handleInstallSubmit
  const handleInstallSubmit = (e) => {
    e.preventDefault();
    console.table({
      "Product Link/Name": installForm.productLink || "Not provided",
      "Coding Language": installForm.codingLanguage || "Not specified",
      "Setup Type": installForm.setupType,
      "Preferred Time": installForm.preferredTime || "Not selected",
      "Communication Language": installForm.communicationLang,
      "Additional Notes": installForm.notes || "None",
    });
    alert("Install Own Code request submitted! Check console.");
    setIsInstallModalOpen(false);
  };

  const requirements = [
    { icon: Server, label: "Hosting/VPS Access" },
    { icon: Database, label: "Database Access" },
    { icon: Smartphone, label: "App Store Access" },
  ];

  const terms = [
    "Valid purchase/license required",
    "Customization billed separately",
    "Server & domain access needed",
  ];

  return (
    <>
      {/* Your existing page layout - unchanged */}
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-950 to-slate-950 text-white relative overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-1/2 left-1/6 w-96 h-96 bg-violet-900/30 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          {/* Header & Content - same as before */}
          <header className="text-center mb-20">
            <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Code & Script Installation
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Professional installation & configuration for web and mobile
              applications
            </p>
          </header>

          {/* Grid layout - unchanged */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16 relative z-10">
            <div className="lg:col-span-1">
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden h-full backdrop-blur-sm">
                <img
                  src="https://images.pexels.com/photos/10508800/pexels-photo-10508800.jpeg"
                  alt="Code Installation Service"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {/* Requirements, Terms, Pricing - unchanged */}
              {/* ... keep your existing blocks ... */}
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-blue-400 mb-4">
                  Requirements
                </h3>
                <div className="grid gap-3">
                  {requirements.map((req, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 hover:bg-slate-800/60 transition-colors"
                    >
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <req.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-slate-300 text-sm">
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5" /> Terms & Conditions
                </h3>
                <ul className="space-y-2">
                  {terms.map((term, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-slate-300 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-linear-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                  <IndianRupee className="w-5 h-5" /> Pricing
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Web</span>
                    <span className="font-semibold text-white">
                      ₹3,000 – ₹6,000
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Web + Admin</span>
                    <span className="font-semibold text-white">
                      ₹5,000 – ₹9,000
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Web + Mobile</span>
                    <span className="font-semibold text-white">
                      from ₹10,000
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center">
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Submit your details to receive an email with next steps for
              payment or scheduling a callback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="group px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold shadow-lg shadow-blue-900/50 hover:shadow-blue-900/70 transition-all hover:scale-105 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  Book Services Now{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={() => setIsInstallModalOpen(true)}
                className="px-8 py-4 border border-slate-600 bg-slate-900/50 rounded-xl font-semibold hover:bg-slate-800/50 transition-all backdrop-blur-sm flex items-center gap-2"
              >
                <DownloadCloud className="w-5 h-5" /> Install Own Code
              </button>
            </div>
          </div>
        </div>

        {/* Book Service Modal */}
        {isBookModalOpen && (
          <BookServiceModal
            formData={formData}
            toggleLanguage={toggleLanguage}
            languages={languages}
            timeSlots={timeSlots}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isBookModalOpen={isBookModalOpen}
            setIsBookModalOpen={setIsBookModalOpen}
          />
        )}

        {/* INSTALL OWN CODE MODAL */}
        {isInstallModalOpen && (
          <InstallOwnCodeModal
            handleInstallChange={handleInstallChange}
            setupTypes={setupTypes}
            installForm={installForm}
            setInstallForm={setInstallForm}
            timeSlots={timeSlots}
            languages={languages}
            setIsInstallModalOpen={setIsInstallModalOpen}
            handleInstallSubmit={handleInstallSubmit}
          />
        )}
      </div>
    </>
  );
}
