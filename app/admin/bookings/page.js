"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Users, Code2, Upload, MessageSquare, Wrench, Bug, Calculator, Palette, Server, Smartphone, Shield, MoreVertical, } from "lucide-react";

const services = [
  
  
  {
    id: 1,
    icon: Users,
    title: "Developers Enquiries",
    route: "/admin/bookings/dev-enquiries",
  },
  {
    id: 2,
    icon: Code2,
    title: "Readymade Code Solutions",
    route: "/admin/bookings/dev-bookings",
  },
  // {
  //   id: 3,
  //   icon: Upload,
  //   title: "Code & Script Installation",
  //   route: "/services/installation",
  // },
  // {
  //   id: 4,
  //   icon: MessageSquare,
  //   title: "Tech Consultancy",
  //   route: "/services/consultancy",
  // },
  // {
  //   id: 5,
  //   icon: Wrench,
  //   title: "Technical Maintenance",
  //   route: "/services/maintenance",
  // },
  // {
  //   id: 6,
  //   icon: Bug,
  //   title: "Bug Fixing",
  //   route: "/services/bug-fixing",
  // },
  // {
  //   id: 7,
  //   icon: Calculator,
  //   title: "Project Estimations",
  //   route: "/services/estimations",
  // },
  
];

export default function ServicesGrid() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);


  return (
    <div className="min-h-screen bg-black p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(service)}
                className={`relative group cursor-pointer`}
              >
                {/* Card Container */}
                <div className={` relative overflow-hidden h-fit  rounded-3xl p-6 bg-linear-to-br from-slate-900/50 to-slate-950/50 border border-slate-800/50 backdrop-blur-xl transition-all duration-500 ease-out hover:border-cyan-500/30`} >
                  {/* Gradient Overlay on Hover */}
                   <div className={` absolute inset-0 bg-linear-to-br from-cyan-500/5 to-blue-500/5 transition-opacity duration-500 `} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      {/* Icon */}
                      <div
                        className={`p-3.5 rounded-2xl bg-linear-to-br from-slate-700/80 to-slate-800/80 border border-slate-700/50 transition-all duration-500 ${ isHovered && !service.disabled ? "from-cyan-600/20 to-blue-600/20 border-cyan-500/30 shadow-lg shadow-cyan-500/20" : ""}`}>
                        <Icon className={`w-7 h-7 transition-colors duration-500 `} />
                      </div>

                      {/* Menu Dots */}
                      <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <MoreVertical className="w-4 h-4 text-slate-500" />
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-semibold text-base leading-snug mb-4">
                      {service.title}
                    </h3>
                  </div>

                  {/* Disabled Overlay Text */}
                  {service.disabled && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-slate-800/80 border border-slate-700/50">
                      <span className="text-xs text-slate-400 font-medium">
                        Visit Page
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
