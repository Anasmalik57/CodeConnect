import React from "react";
import { X, ArrowRight, ChevronDown } from "lucide-react";

const InstallOwnCodeModal = ({
  setIsInstallModalOpen,
  handleInstallSubmit,
  installForm,
  handleInstallChange,
  setupTypes,
  timeSlots,
  languages
}) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
          <button
            onClick={() => setIsInstallModalOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold mb-6 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Install Own Code
          </h2>

          <form onSubmit={handleInstallSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Product Information (Codecanyon link/name)
                </label>
                <input
                  type="text"
                  name="productLink"
                  value={installForm.productLink}
                  onChange={handleInstallChange}
                  required
                  placeholder="Link or item name"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Coding Language Used
                </label>
                <input
                  type="text"
                  name="codingLanguage"
                  value={installForm.codingLanguage}
                  onChange={handleInstallChange}
                  required
                  placeholder="PHP / Flutter / React"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Required Setup Type
                </label>
                <div className="relative">
                  <select
                    name="setupType"
                    value={installForm.setupType}
                    onChange={handleInstallChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition appearance-none"
                  >
                    {setupTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Preferred Time for Setup
                </label>
                <div className="relative">
                  <select
                    name="preferredTime"
                    value={installForm.preferredTime}
                    onChange={handleInstallChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition appearance-none"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot}>{slot}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Preferred Communication Language
              </label>
              <div className="relative">
                <select
                  name="communicationLang"
                  value={installForm.communicationLang}
                  onChange={handleInstallChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition appearance-none"
                >
                  {languages.map((lang) => (
                    <option key={lang}>{lang}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Additional Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                value={installForm.notes}
                onChange={handleInstallChange}
                placeholder="Server/hosting details, domains, etc."
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsInstallModalOpen(false)}
                className="px-6 py-3 border border-slate-600 rounded-lg font-medium hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg font-semibold shadow-lg hover:shadow-purple-900/50 transition-all hover:scale-105 flex items-center gap-2"
              >
                Submit & Get Email <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InstallOwnCodeModal;
