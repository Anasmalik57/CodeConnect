"use client";
import { GraduationCap } from "lucide-react";

export default function CareerPageEnqsLayout({ children }) {
  return (
    <div className="min-h-screen bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 border-b border-white/20 py-[34px] px-4 md:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-400 via-cyan-400 to-teal-400  rounded-2xl blur-xl opacity-70" />
            <div className="relative bg-linear-to-br from-emerald-600/20 to-cyan-600/20 border border-emerald-500/30 p-2 shadow-2xl rounded-xl">
              <GraduationCap className="size-5 text-emerald-400" strokeWidth={3} />
            </div>
          </div>
          <h1 className="text-xl md:text-[25px] font-bold bg-linear-to-r from-emerald-400 via-cyan-400 to-teal-400  bg-clip-text text-transparent ">
            Career Applications
          </h1>
        </div>

        {children}
      </div>
    </div>
  );
}
