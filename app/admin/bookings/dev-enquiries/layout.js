"use client";

import { Sparkles } from "lucide-react";

export default function DevEnquiriesLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1380px] mx-auto">
        <div className="border-b border-white/10 backdrop-blur-xl bg-white/2 flex justify-between items-start md:items-center py-[34px] *:px-6">
          <div className="flex items-center gap-x-4">
            <Sparkles className="size-6 text-blue-400" />
            <h1 className="text-xl md:text-3xl font-bold">All Developer Enquiries</h1>
          </div>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
