import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

const BottomCTAButton = () => {
  return (
    <>
      {/* Bottom CTA Section */}
      <div className="mt-20 relative hidden">
        <div className="absolute hidden inset-0 bg-linear-to-r from-blue-500 via-sky-500 to-teal-500 rounded-3xl blur-2xl opacity-20" />
        <div className="relative bg-linear-to-r from-white/10 to-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-12 text-center">
          <h2 className="text-xl md:text-4xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-[12px]">
            Looking for something specific? Our team can build custom solutions
            tailored to your exact requirements. Get in touch for a personalized
            quote.
          </p>
          <Link href={"https://api.whatsapp.com/send?phone=+918121923831&text=Hello%NoDeskDev%Team,%20I%20need%20your%20service"} className="hidden md:block group relative px-10 py-5 transition-all duration-400 hover:scale-105 active:scale-95 border w-fit  border-white/25 rounded-full" target="_blank">
            <span className="relative flex items-center gap-2 cursor-pointer">
              <Sparkles className="w-5  h-5" />
              <span className="hidden sm:block">Get Custom Quote </span>
              <span className="md:hidden">Get a Quote </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
          <Link href={"https://api.whatsapp.com/send?phone=+918121923831&text=Hello%NoDeskDev%Team,%20I%20need%20your%20service"} className="md:hidden group relative flex justify-center items-center gap-2 cursor-pointer" target="_blank">
          <span className="border flex gap-2 items-center px-5 py-2 rounded-full border-white/25 bg-white/8">

              <Sparkles className="w-5 h-5" />
              <span className="">Get Custom Quote </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
          </Link>
        </div>
      </div>
      
    </>
  );
};

export default BottomCTAButton;
