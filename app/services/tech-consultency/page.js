"use client";
import { useState } from "react";
import {
  MessageSquare,
  Lightbulb,
  BookOpen,
  Map,
  Users,
  Sparkles,
  Laptop,
  Globe,
  Shield,
  Cloud,
  BarChart3,
  Phone,
  Headphones,
  MessageCircle,
  ClipboardList,
  FileCheck,
  MapPin,
  FileText,
  ArrowRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TechConsultModal from "@/components/Modals/TechConsultModal";

export default function TechConsultancy() {
  const [selectedService, setSelectedService] = useState("ideation");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredProcess, setHoveredProcess] = useState()

  const services = [
    { id: "ideation", label: "Ideation", icon: Lightbulb },
    { id: "audit", label: "Audit", icon: BookOpen },
    { id: "roadmap", label: "Roadmap", icon: Map },
    { id: "teamplan", label: "Team Plan", icon: Users },
    { id: "aiadvice", label: "AI Advice", icon: Sparkles },
  ];

  const specialties = [
    { id: "appdev", label: "App Dev", icon: Laptop },
    { id: "webdev", label: "Web Dev", icon: Globe },
    { id: "security", label: "Security", icon: Shield },
    { id: "devops", label: "DevOps", icon: Cloud },
    { id: "scale", label: "Scale", icon: BarChart3 },
  ];

  const communications = [
    { id: "call", label: "Call", icon: Phone },
    { id: "audio", label: "Audio", icon: Headphones },
    { id: "chat", label: "Chat", icon: MessageCircle },
  ];

  const processes = [
    { id: "discovery", label: "Discovery", icon: ClipboardList },
    { id: "audit", label: "Audit", icon: FileCheck },
    { id: "roadmap", label: "Roadmap", icon: MapPin },
    { id: "handoff", label: "Handoff", icon: FileText },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-12 px-4 lg:px-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-blue-400" strokeWidth={2.5} />
                  <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                    Tech Consultancy
                  </h1>
                </div>
                <p className="text-gray-400 text-sm lg:text-base max-w-2xl">
                  Pick a Tech Type (App / Website) and your preferred language to see matching profiles with hourly communication rates.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 rounded-2xl font-bold text-white overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
              >
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center gap-2 whitespace-nowrap">
                  Book Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </div>

            {/* Services */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <motion.button
                      key={service.id}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedService(service.id)}
                      className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-blue-700 via-sky-700 to-teal-700 text-white shadow-lg hover:shadow-blue-500/50`}
                    >
                      <span className="flex items-center gap-2 text-sm">
                        <Icon className="w-4 h-4" strokeWidth={2.5} />
                        {service.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

             {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Specialties & Communication */}
            <div className="space-y-8">
              {/* Specialties */}
              <div className="bg-linear-to-br from-white/5 to-transparent backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-linear-to-r from-blue-500 to-blue-500 rounded-lg">
                    <BarChart3
                      className="w-5 h-5 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">Specialties</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {specialties.map((specialty) => {
                    const Icon = specialty.icon;
                    return (
                      <button
                        key={specialty.id}
                        className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 bg-linear-to-r from-blue-700 to-teal-700 text-white hover:shadow-lg`}
                      >
                        <span className="flex cursor-pointer items-center gap-2 text-[10px] font-light">
                          <Icon className="size-4" strokeWidth={2} />
                          {specialty.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Communication Methods */}
              <div className="bg-linear-to-br pb-11 from-white/5 to-transparent backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
              
                <h3 className="text-lg font-bold text-white mb-4">
                  Communication Method
                </h3>
                <div className="flex flex-wrap gap-3">
                  {communications.map((comm) => {
                    const Icon = comm.icon;
                    return (
                      <button
                        key={comm.id}
                        className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 bg-white/5  text-gray-300 hover:bg-white/10 hover:text-white border border-blue-500/20 hover:bg-linear-to-r from-blue-700 via-sky-600 to-teal-600`}
                      >
                        <span className="flex cursor-pointer items-center gap-2 text-xs font-semibold">
                          <Icon className="size-3" strokeWidth={2} />
                          {comm.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Process */}
            <div className="bg-linear-to-br from-white/5 to-transparent backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-linear-to-r from-teal-500 to-blue-500 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-white">Process</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {processes.map((process, idx) => {
                  const Icon = process.icon;
                  const isHovered = hoveredProcess === process.id;
                  return (
                    <div
                      key={process.id}
                      onMouseEnter={() => setHoveredProcess(process.id)}
                      onMouseLeave={() => setHoveredProcess(null)}
                      className="relative group cursor-pointer"
                    >
                      {isHovered && (
                        <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-blue-500 rounded-2xl blur-xl opacity-60 animate-pulse" />
                      )}
                      <div className="relative py-2 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-blue-500/30 rounded-2xl transition-all duration-300 hover:scale-105 hover:border-blue-400/50">
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="p-3 bg-linear-to-r from-blue-500 to-teal-400 rounded-xl shadow-lg">
                            <Icon
                              className="w-6 h-6 text-white"
                              strokeWidth={2.5}
                            />
                          </div>
                          <span className="font-semibold text-white text-sm">
                            {process.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-8 pt-6 border-t border-blue-500/20">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>
                Real-time matching • 100+ verified consultants • Flexible rates
              </span>
            </div>
          </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && <TechConsultModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}