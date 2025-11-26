"use client";
import { useState } from "react";
import {
  Wrench,
  Activity,
  Database,
  RefreshCw,
  Shield,
 Clock,
  Cloud,
  FileText,
  Zap,
  HelpCircle,
  AlertTriangle,
  HardDrive,
  ArrowRight,
  FileCog,
} from "lucide-react";
import SupportRequestModal from "@/components/Modals/SupportRequestModal";

export default function TechnicalMaintenance() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    { icon: Wrench, label: "Fix" },
    { icon: Activity, label: "Monitor" },
    { icon: Database, label: "DB Care" },
    { icon: RefreshCw, label: "Updates" },
    { icon: Shield, label: "Patch" },
  ];

  const coverage = [
    { icon: Clock, label: "Uptime" },
    { icon: Cloud, label: "Backups" },
    { icon: FileText, label: "Logs" },
    { icon: Zap, label: "Perf" },
    { icon: HelpCircle, label: "Helpdesk" },
  ];

  const health = [
    { icon: Activity, label: "Uptime" },
    { icon: FileText, label: "Logs" },
    { icon: AlertTriangle, label: "Alerts" },
    { icon: HardDrive, label: "Backups" },
  ];

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-black via-gray-950 to-black py-12 px-4 lg:px-8 overflow-hidden relative">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="bg-linear-to-b from-white/10 to-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 lg:p-12 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileCog className="w-9 h-9 text-blue-400" strokeWidth={2.5} />
                  <h1 className="text-3xl lg:text-4xl font-black bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    Technical Maintenance
                  </h1>
                </div>
                <p className="text-gray-400 text-sm lg:text-base max-w-2xl">
                  Tell us what you need support with and preferred discussion time.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative px-8 py-4 bg-linear-to-r from-blue-600 via-blue-500 to-teal-500 rounded-2xl font-bold text-white overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center gap-2">
                  Raise Support Request
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Services */}
            <div className="flex flex-wrap gap-4 mb-10">
              {services.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    className="px-6 py-3 bg-linear-to-r from-blue-700/50 to-teal-700/50 backdrop-blur-sm border border-blue-500/30 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2"
                  >
                    <Icon className="w-5 h-5 text-blue-300" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Coverage & Health Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Coverage */}
              <div className="bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-linear-to-r from-blue-500 to-teal-500 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Coverage</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {coverage.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="px-5 py-2 bg-white/10 rounded-full text-gray-300 text-sm flex items-center gap-2 border border-blue-500/20">
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Health */}
              <div className="bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-linear-to-r from-blue-500 via-sky-500 to-teal-500 rounded-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Health</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {health.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="p-5 bg-white/10 backdrop-blur-sm rounded-xl text-center border border-blue-500/20">
                        <Icon className="w-10 h-10 mx-auto mb-2 text-blue-400" />
                        <p className="text-sm font-medium text-gray-300">{item.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="mt-10 pt-6 border-t border-blue-500/20 text-center">
              <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                24/7 Monitoring • Instant Alerts • Auto-backups Enabled
              </p>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && <SupportRequestModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </>
  );
}