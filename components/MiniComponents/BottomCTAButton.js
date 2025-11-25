import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

const BottomCTAButton = () => {
  return (
    <>
      {/* Bottom CTA Section */}
      <div className="mt-20 relative">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-sky-500 to-teal-500 rounded-3xl blur-2xl opacity-20" />
        <div className="relative bg-linear-to-r from-white/10 to-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Looking for something specific? Our team can build custom solutions
            tailored to your exact requirements. Get in touch for a personalized
            quote.
          </p>
          <Link href={"https://api.whatsapp.com/send?phone=+918121923831&text=Hello%NoDeskDev%Team,%20I%20need%20your%20service"} className="group relative px-10 py-5 bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 rounded-2xl font-bold text-white overflow-hidden shadow-2xl hover:shadow-sky-500/70 transition-all duration-400 hover:scale-105 active:scale-95" target="_blank">
            <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center gap-2 cursor-pointer">
              <Sparkles className="w-5 h-5" />
              <span className="hidden sm:block">Get Custom Quote </span>
              <span className="md:hidden">Get a Quote </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomCTAButton;
