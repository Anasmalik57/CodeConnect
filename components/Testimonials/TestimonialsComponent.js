"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const pathname = usePathname();

  const testimonials = [
    {
      text: "Booked a MERN developer in 24 hours. Smooth payments & great communication!",
      author: "Rohit",
      role: "SaaS Founder",
      rating: 5,
    },
    {
      text: "We launched our POS app in 10 days using their ready-made solution.",
      author: "Nisha",
      role: "Retail Owner",
      rating: 5,
    },
    {
      text: "Transparent hourly rates and verified profiles saved us weeks.",
      author: "Abhinav",
      role: "PM",
      rating: 5,
    },
    {
      text: "Best developers I've worked with. Delivered ahead of schedule!",
      author: "Priya",
      role: "Startup CEO",
      rating: 5,
    },
    {
      text: "The custom solution exceeded our expectations. Highly recommended!",
      author: "Karan",
      role: "Tech Lead",
      rating: 5,
    },
    {
      text: "Professional team, clean code, and excellent support throughout.",
      author: "Sneha",
      role: "Product Manager",
      rating: 5,
    },
  ];

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Scroll to active card
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.offsetWidth || 0;
      const gap = 24;
      const scrollPosition =
        activeIndex * (cardWidth + gap) -
        scrollRef.current.offsetWidth / 2 +
        cardWidth / 2;

      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <div className="bg-linear-to-b from-black via-gray-950 to-black pt-0 px-5 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div style={{ animationDelay: "1.5s" }} className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"/>
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        {/* Main Container with Gradient Border */}
        <div className="relative p-1 rounded-[40px]">
          <div className=" rounded-[38px] p-8 md:p-12">
            {/* Header */}
            <div className="mx-auto h-fit  pb-16">
              <h2 className="md:hidden text-5xl pb-2 border-white md:text-6xl font-black text-center bg-linear-to-r from-teal-400 via-sky-400 to-blue-400 bg-clip-text text-transparent">Reviews</h2>
              <h2 className="hidden md:block text-5xl pb-2 border-white md:text-6xl font-black text-center bg-linear-to-r from-teal-400 via-sky-400 to-blue-400 bg-clip-text text-transparent">Loved by{" "}
                <span className="bg-linear-to-br  from-blue-600 via-sky-500 to-teal-600 text-transparent bg-clip-text">founders{" "}</span>
                &{" "}
                <span className="bg-linear-to-br  from-blue-600 via-sky-500 to-teal-600 text-transparent bg-clip-text">teams</span>
              </h2>
            </div>

            {/* Scrollable Cards Container */}
            <div className="relative -mx-8 md:-mx-12 px-8 md:px-12 mb-8">
              <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", }}>
                {testimonials.map((testimonial, index) => {
                  const isActive = index === activeIndex;
                  const distance = Math.abs(index - activeIndex);
                  const scale = isActive ? 1 : Math.max(0.85, 1 - distance * 0.05);
                  const opacity = isActive ? 1 : Math.max(0.4, 1 - distance * 0.2);

                  return (
                    <motion.div key={index} animate={{ scale, opacity, }} transition={{ duration: 0.5, ease: "easeOut", }} onClick={() => setActiveIndex(index)} className="shrink-0 w-[320px] md:w-[380px] scroll-snap-align-center cursor-pointer" >
                      <div className={`relative bg-linear-to-b from-white/5 to-white/2 backdrop-blur-sm border rounded-3xl p-6 h-full transition-all duration-500 ${ isActive ? "border-blue-500/40 shadow-xl shadow-blue-500/10" : "border-white/10 hover:border-white/20" }`} >
                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} strokeWidth={2} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>

                        {/* Quote */}
                        <p className="text-gray-300 text-[15px] leading-relaxed mb-6 min-h-20">"{testimonial.text}"</p>

                        {/* Author */}
                        <div className="border-t border-white/10 pt-4">
                          <p className="text-white font-semibold text-base">{testimonial.author}</p>
                          <p className="text-gray-400 text-sm">{testimonial.role}</p>
                        </div>

                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div layoutId="activeIndicator" transition={{ type: "spring", stiffness: 300, damping: 30, }} className="absolute bottom-2 left-1/2  -translate-x-1/2 w-20 h-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Progress Dots */}
            <div className={`flex justify-center gap-2 mb-0 ${ pathname === "/" ? "hidden" : "" }`} >
              {testimonials.map((_, index) => (
                <button  key={index}  onClick={() => setActiveIndex(index)}  className={`h-2 rounded-full transition-all duration-300 ${ index === activeIndex ? "w-8 bg-linear-to-r from-blue-500 to-purple-500" : "w-2 bg-white/20 hover:bg-white/30" }`} />  ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scroll-snap-align-center {
          scroll-snap-align: center;
        }
      `}</style>
    </div>
  );
}
