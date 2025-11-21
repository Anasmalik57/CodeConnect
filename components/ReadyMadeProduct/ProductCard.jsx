import React from "react";
import { Share2, ExternalLink, IndianRupee, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ filteredProducts }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProducts.map((product) => (
          <div key={product.id}
            className="group relative bg-linear-to-br from-violet-900/40 via-fuchsia-900/30 to-pink-900/40 backdrop-blur-3xl rounded-3xl overflow-hidden border border-violet-500/40 shadow-2xl shadow-black/50 hover:shadow-2xl hover:shadow-violet-700/70  transition-all duration-700 hover:scale-[1.01] hover:-translate-y-5 cursor-pointer">
            {/* Floating Glow */}
            <div className="absolute inset-0 bg-linear-to-br from-violet-600/30 via-fuchsia-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-1000 -z-10" />
            {/* Screenshot */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={product.screenshots[0] || product.screenshots}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-125 transition-transform duration-1000"
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => shareProduct(product)}
                  className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl hover:bg-white/20 transition-all hover:scale-110 hover:cursor-pointer"
                >
                  <Share2 className="size-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-2.5">
              {/* Title + Category Badge */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-2xl text-nowrap truncate font-black text-white tracking-tight leading-tight">
                  {product.name}
                </h3>
                <span className=" text-xs font-bold px-3 py-2 text-nowrap bg-linear-to-r from-violet-600/60 to-fuchsia-600/60 rounded-full text-white border border-violet-400/50">
                  {product.category}
                </span>
              </div>

              <p className="text-violet-200  text-sm leading-relaxed font-medium">
                {product.description}
              </p>

              {/* Tech & Platforms */}
              <div className="space-y-4">
                {/* Platforms */}
                {/* <div className="flex items-center gap-4">
                  <div className="flex gap-3">
                    {product.platforms.includes("Web") && (
                      <Globe className="size-5 text-violet-400" />
                    )}
                    {product.platforms.includes("Android") && (
                      <Smartphone className="size-5 text-green-400" />
                    )}
                    {product.platforms.includes("iOS") && (
                      <Smartphone className="size-5 text-blue-400" />
                    )}
                  </div>
                  <span className="text-violet-300 font-medium">
                    {product.platforms.join(" • ")}
                  </span>
                </div> */}

                <p className="text-sm">
                  <span className="text-violet-400 font-medium">
                    Tech Stack:
                  </span>
                  <span className="ml-2 font-bold text-white">
                    {product.tech}
                  </span>
                </p>
              </div>

              {/* Pricing */}
              <div className="pt-3 border-t border-violet-500/30 flex justify-between items-center">
                <div className="flex items-center">
                  <IndianRupee className="size-7 text-green-400" />
                  <span className="text-3xl font-black text-white">
                    {product.price}
                  </span>
                </div>
                <p className="text-sm text-violet-300">
                  Customization:{" "}
                  <span className="font-bold text-white">
                    {product.customization}
                  </span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-2 text-sm">
                {/* Demo BTN */}
                <Link href={product.demoLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 border border-violet-500/60 py-2 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95" >
                  <ExternalLink className="size-5 transition-all duration-200 ease-in" />
                  <span>Demo</span>
                </Link>
                {/* Buy Now BTN */}
                <button className="flex-1 cursor-pointer relative overflow-hidden bg-linear-to-r from-violet-600 via-fuchsia-600 to-pink-600 py-4 rounded-2xl font-black text-white shadow-2xl shadow-fuchsia-600/70 hover:shadow-fuchsia-500/90 transition-all hover:scale-105 active:scale-95 group/btn" onClick={()=> alert("Hey Congrat's 😃")}>
                  <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center gap-3">
                    <Sparkles className="size-5 animate-pulse" />
                    <span>Buy Now</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCard;
