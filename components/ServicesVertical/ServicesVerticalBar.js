"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { serviceSlide } from "./Data";

export default function ServicesVerticalBar() {
  return (
    <div className="min-h-screen  lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-1/3 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-40 right-1/3 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Services Timeline */}
        <VerticalTimeline lineColor="rgba(59, 130, 246, 0.2)" animate={true}>
          {serviceSlide.map((service, index) => {
            const Icon = service.icon;
            return (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  borderRadius: "32px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                  padding: "40px",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid rgba(59, 130, 246, 0.2)",
                }}
                iconStyle={{
                  background: `linear-gradient(135deg, ${
                    service.iconBg.includes("blue")
                      ? "#3b82f6, #06b6d4"
                      : service.iconBg.includes("purple")
                      ? "#a855f7, #ec4899"
                      : service.iconBg.includes("teal")
                      ? "#14b8a6, #10b981"
                      : service.iconBg.includes("orange")
                      ? "#f97316, #ef4444"
                      : service.iconBg.includes("indigo")
                      ? "#6366f1, #a855f7"
                      : "#ec4899, #f43f5e"
                  })`,
                  color: "#fff",
                  boxShadow:
                    "0 0 0 4px rgba(59, 130, 246, 0.15), 0 0 30px rgba(59, 130, 246, 0.2)",
                  width: "70px",
                  height: "70px",
                }}
                icon={<Icon size={32} strokeWidth={2.5} />}
                position={service.position}
              >
                {/* Icon Badge */}
                <div className="flex  items-start gap-4">
                  <div
                    className={`p-4 bg-linear-to-br ${service.iconBg} rounded-2xl shadow-2xl`}
                  >
                    <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="">
                    {/* Title */}
                    <h3 className="text-3xl font-black text-white -mb-3">
                      {service.title}
                    </h3>
                    {/* Tagline */}
                    <p style={{fontSize: "14px", marginTop: "1rem"}}
                      className={`text-sm font-semibold bg-linear-to-r ${service.iconBg} bg-clip-text text-transparent italic text-nowrap`}
                    >
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p style={{fontSize: "14px", marginLeft: "8px"}} className="text-gray-300 mb-6  leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="group relative">
                      <div
                        className={`absolute -inset-0.5 bg-linear-to-r ${service.iconBg} rounded-lg opacity-0 group-hover:opacity-50 blur transition-opacity duration-300`}
                      />
                      <div className="relative flex justify-center items-center px-4 py-2 font-semibold rounded-full bg-white/5 border border-white/30 hover:bg-white/10 transition-all duration-300">
                        <span className="text-[11px] font-medium text-gray-200">
                          {feature}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative Element */}
                <div
                  className={`absolute top-8 right-8 w-32 h-32 bg-linear-to-br ${service.iconBg} rounded-full opacity-5 blur-2xl pointer-events-none`}
                />
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>

      {/* Enhanced Timeline Styles */}
      <style jsx global>{`
        .vertical-timeline::before {
          background: linear-gradient(
            to bottom,
            rgba(59, 130, 246, 0.4),
            rgba(168, 85, 247, 0.4),
            rgba(236, 72, 153, 0.4),
            rgba(20, 184, 166, 0.4),
            rgba(59, 130, 246, 0.4)
          ) !important;
          width: 4px !important;
        }

        .vertical-timeline-element-icon {
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15),
            0 0 30px rgba(59, 130, 246, 0.3),
            inset 0 0 20px rgba(255, 255, 255, 0.1) !important;
          transition: all 0.3s ease !important;
        }

        .vertical-timeline-element-icon:hover {
          transform: scale(1.1) rotate(5deg) !important;
          box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.2),
            0 0 40px rgba(59, 130, 246, 0.5),
            inset 0 0 20px rgba(255, 255, 255, 0.15) !important;
        }

        .vertical-timeline-element-content {
          transition: all 0.4s ease !important;
        }

        .vertical-timeline-element-content:hover {
          transform: translateY(-8px) scale(1.02) !important;
          box-shadow: 0 20px 60px rgba(59, 130, 246, 0.25) !important;
          border-color: rgba(59, 130, 246, 0.4) !important;
          background: rgba(255, 255, 255, 0.05) !important;
        }

        .vertical-timeline-element-content-arrow {
          border-right: 7px solid rgba(59, 130, 246, 0.3) !important;
        }

        @media only screen and (max-width: 1169px) {
          .vertical-timeline-element-content-arrow {
            border-left: 7px solid rgba(59, 130, 246, 0.3) !important;
            border-right: none !important;
          }

          .vertical-timeline-element-icon {
            width: 60px !important;
            height: 60px !important;
          }
        }

        @media only screen and (max-width: 768px) {
          .vertical-timeline-element-content {
            padding: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
