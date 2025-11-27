"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight, Sparkles, TrendingUp, Zap, ZapIcon } from "lucide-react";
import Link from "next/link";
import MotivationalCarousel from "./CorousalComponent";
import { getStartedLinks, startingSteps, whyChooseUs } from "./SlidesData";
import { techLogos } from "../Loop/Data";
import LogoLoop from "../Loop/LogoLoop";
import ServicesVerticalBar from "../ServicesVertical/ServicesVerticalBar";
import TestimonialsComponent from "../Testimonials/TestimonialsComponent";

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Animated Background linear */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-linear-to-br from-blue-900/20 via-sky-900/10 to-teal-900/20" />
          <div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-linear(circle, #c026d3, #7c3aed, transparent)",
              top: `${mousePosition.y - 200}px`,
              left: `${mousePosition.x - 200}px`,
              transform: "translate(-50%, -50%)",
              transition: "all 0.3s ease-out",
            }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative">
          <MotivationalCarousel />
        </section>

        {/* Why Choose Us - Premium Grid */}
        <section className="py-16 pb-8 px-6 bg-linear-to-b from-transparent via-blue-900/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl sm:pb-2 font-black text-center bg-linear-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent mb-16">
              Why Choose{" "}
              <span className="bg-linear-to-br text-4xl md:text-6xl from-blue-600 via-sky-500 to-teal-600 text-transparent bg-clip-text">
                NoDeskDeveloper?
              </span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {whyChooseUs.map((item, i) => (
                <div
                  key={i}
                  className="group w-fit cursor-pointer relative p-3 sm:p-6 bg-linear-to-br from-blue-900/30 via-sky-900/20 to-teal-900/30 backdrop-blur-3xl rounded-2xl sm:rounded-3xl border border-blue-500/40 hover:border-blue-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:skew-1 hover:shadow-blue-600/60"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-sky-600/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700"></div>
                  <div className="flex max-h-14 truncate sm:max-h-18 justify-between items-start gap-4 h-fit">
                    <div className="hidden sm:flex size-16 flex-1  rounded-2xl bg-linear-to-br from-blue-600 to-sky-600  items-center justify-center mb-6 shadow-xl">
                      <item.icon className="size-9 text-white" />
                    </div>
                    <div className="sm:hidden">
                      <item.icon className="size-10 text-white" />
                    </div>
                    <h3 className="text-sm sm:text-xl flex-2 font-black text-white text-wrap">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-blue-200 leading-relaxed text-sm hidden sm:block">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Navigation Tiles */}
        <section className="py-10 pt-8 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black text-center bg-linear-to-r from-teal-400 via-sky-400 to-blue-400 bg-clip-text text-transparent mb-16">
              <span className="bg-linear-to-br  from-blue-600 via-sky-500 to-teal-600 text-transparent bg-clip-text">
                Get Started{" "}
              </span>{" "}
              in Seconds
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getStartedLinks.map((tile) => (
                <Link
                  key={tile.title}
                  href={tile.href}
                  className="group border border-white/30 relative block p-10  bg-linear-to-br ${tile.linear} rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.03]"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                  <div className="relative z-10 ">
                    <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <tile.icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-[28px] sm:text-nowrap text-wrap font-black text-white mb-3">
                      {tile.title}
                    </h3>
                    <p className="text-white/90 text-lg">{tile.desc}</p>
                  </div>
                  <ArrowUpRight className="size-8 absolute top-6 right-8 text-white opacity-0 group-hover:opacity-100 -translate-x-5 group-hover:translate-x-0 transition-all duration-500" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Services We Offer – Horizontal Scrollable Cards */}
        <section className="py-20 px-6 bg-linear-to-b from-transparent via-blue-950/50 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-[35px] md:text-6xl font-black text-center mb-16">
              <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-sky-400 bg-clip-text text-transparent">
                Hire{" "}
                <span className="bg-linear-to-br  from-blue-600 via-sky-500 to-teal-600 text-transparent bg-clip-text">
                  Experts
                </span>{" "}
                for Any Service
              </span>
            </h2>
            {/* Loop Of Logos of Teck */}
            <div className="max-w-[90vw] md:max-w-5xl mb-16 mx-auto  px-4 py-0 rounded-3xl drop-shadow-md border-white/40 mt-8 flex justify-center items-center " style={{ height: "100px", position: "relative", overflow: "hidden", }} >
              {/* Basic horizontal loop */}
              <LogoLoop logos={techLogos} speed={120} direction="left" logoHeight={48} gap={40} hoverSpeed={0} scaleOnHover fadeOut fadeOutColor="#0000" ariaLabel="Technology partners" />
            </div>

            {/* {services.map((service) => (
                <Link
                  href="/developers"
                  key={service.title}
                  className={`group relative p-8 bg-linear-to-br ${service.color} bg-opacity-20 backdrop-blur-3xl rounded-3xl border border-white/20 hover:border-cyan-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50`}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  <div className="relative flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-sm text-nowrap sm:text-xl font-black text-white">
                      {service.title}
                    </h3>
                  </div>
                </Link>
              ))} */}
            <ServicesVerticalBar />
          </div>
        </section>
{/* ===================================================================================================================== */}

      <TestimonialsComponent />



{/* ===================================================================================================================== */}
        {/* Quick Get Started Tiles */}
        <section className="py-4 sm:py-12 md:py-16 lg:py-20  px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-black mb-16">
              <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                Start in
                <span className="bg-linear-to-tl  from-blue-600 via-sky-500 to-teal-600 text-transparent bg-clip-text">
                  {" "}
                  60 Seconds
                </span>
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {startingSteps.map((step, i) => (
                <div
                  key={i}
                  className="group border border-white/30 cursor-pointer hover:skew-1 relative p-10 bg-linear-to-br ${step.linear} rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-6 text-3xl font-black text-white">
                      {i + 1}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/90">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="py-24 pb-12 px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black bg-linear-to-r from-blue-400 via-sky-400 to-teal-400 bg-clip-text text-transparent mb-8">
                Ready to Build Something Amazing?
              </h2>
              <Link
                href="/book-services"
                className="inline-flex items-center gap-4 px-12 py-7 bg-linear-to-r text-nowrap from-blue-600 via-sky-600 to-teal-600 rounded-2xl font-black text-lg shadow-2xl shadow-sky-600/70 hover:shadow-sky-500/90 transition-all duration-500 hover:scale-110 active:scale-95"
              >
                Start Now! It’s Free
                <Sparkles className="size-6 md:size-7 group-hover:animate-pulse" />
              </Link>
            </div>
          </section>
          {/* Bottom CTA */}
        </section>
      </div>
    </>
  );
}
