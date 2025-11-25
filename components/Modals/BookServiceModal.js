import {
  Server, Database, Smartphone, FileCheck, IndianRupee,
  ArrowRight, CheckCircle2, DownloadCloud, X, ChevronDown
} from "lucide-react";

const BookServiceModal = ({handleInputChange, handleSubmit, timeSlots, languages, toggleLanguage, formData , isBookModalOpen, setIsBookModalOpen}) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
          <button
            onClick={() => setIsBookModalOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold mb-6 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Book Services
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91-9xxxx xxxxx"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              {/* Preferred Callback Time Dropdown */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Preferred Callback Time
                </label>
                <div className="relative">
                  <select
                    name="callbackTime"
                    value={formData.callbackTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none transition appearance-none"
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Multi-select Languages */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Preferred Language(s)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {languages.map((lang) => (
                  <label
                    key={lang}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.languages.includes(lang)}
                      onChange={() => toggleLanguage(lang)}
                      className="w-4 h-4 text-blue-500 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-300">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Brief</label>
              <textarea
                name="brief"
                rows={4}
                value={formData.brief}
                onChange={handleInputChange}
                placeholder="Tell us about your need..."
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none transition resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsBookModalOpen(false)}
                className="px-6 py-3 border border-slate-600 rounded-lg font-medium hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-linear-to-r from-purple-600 to-blue-600 rounded-lg font-semibold shadow-lg hover:shadow-purple-900/50 transition-all hover:scale-105"
              >
                Submit & Continue →
              </button>
            </div>
          </form>

          <p className="text-xs text-slate-500 mt-6 text-center">
            After submission you can proceed to payment or schedule a callback.
          </p>
        </div>
      </div>
    </>
  );
};

export default BookServiceModal;
