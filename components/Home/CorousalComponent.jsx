"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import { slides } from "./SlidesData";
import Link from "next/link";

export default function PremiumCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentIndex(index);

  const current = slides[currentIndex];

  return (
    <div className="relative w-full h-[60vh] md:h-[88vh] overflow-hidden bg-black">
      {/* Background Image with Smooth Fade */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${ index === currentIndex ? "opacity-100" : "opacity-0" }`} >
            <Image src={slide.image} alt={slide.title} className="object-cover" fill priority unoptimized />
          </div>
        ))}
        {/* Dark + Gradient Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/30 via-blue-900/20 to-blue-900/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Title - Animated */}
          <h1 className="text-[42px] md:text-7xl font-black text-white tracking-tight leading-tight mb-6">
            <span className="inline-block animate-fade-up">
              {current.title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-xl md:text-3xl font-medium text-white/90 max-w-5xl mx-auto leading-relaxed mb-8 opacity-0 animate-fade-up animation-delay-300">
            {current.subtitle}
          </p>

          {/* Highlight Badge */}
          <div className="md:inline-block hidden  px-10 py-5 bg-white/10 backdrop-blur-2xl rounded-full border border-white/40 shadow-2xl mb-12 opacity-0 animate-fade-up animation-delay-600">
            <p className="text-sm md:text-lg font-bold text-white flex items-center gap-4">
              <Sparkles className="size-6 text-yellow-400 " />
              {current.highlight}
              <Sparkles className="size-6 text-yellow-400 " />
            </p>
          </div>

          {/* CTA Buttons */}
          <div className=" grid grid-cols-2  *:text-lg *:md:text-xl sm:flex *:px-8 *:py-4 *:sm:px-12 *:sm:py-5  sm:flex-row gap-4 sm:gap-6 justify-center items-center opacity-0 animate-fade-up animation-delay-900">
            <Link
              href="/developers"
              className="group relative  bg-linear-to-r from-blue-600 via-sky-600 to-teal-600 rounded-2xl font-black shadow-2xl shadow-sky-600/70 hover:shadow-sky-500/90 transition-all duration-500 hover:scale-110 active:scale-95 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex flex-nowrap justify-center items-center gap-4 sm:gap-2">
                Hire <span className="hidden sm:block">Developer</span> Now
                {/* <ArrowRight className="size-8 sm:size-6 group-hover:translate-x-2 transition-transform" /> */}
              </span>
            </Link>

            <Link
              href="/softwares-readymade"
              className=" bg-white/10 flex justify-center backdrop-blur-xl border-2 border-white/50 rounded-2xl font-bold hover:bg-white/20 hover:border-white/70 transition-all duration-500 hover:scale-105"
            >
              Explore{" "}
              <span className="hidden sm:block pl-1">Ready-Made Apps</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-12 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentIndex
                ? "w-9 h-3 bg-white shadow-lg"
                : "size-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.9s ease-out forwards;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-900 {
          animation-delay: 0.9s;
        }
      `}</style>
    </div>
  );
}
