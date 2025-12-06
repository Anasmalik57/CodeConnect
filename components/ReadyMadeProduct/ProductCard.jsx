"use client";
import { Share2, Play, ShoppingCart, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";
import { RequestDemoDialog } from "../DialogBoxes/RequestDemoDialog";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProductCard = ({ filteredProducts }) => {
  const [demoProduct, setDemoProduct] = useState(null);
  const router = useRouter();

  const shareProduct = (product) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href + "/" + product?._id,
      });
    } else {
      alert(`Share ${product.name}`);
    }
  };

  const handleRequestDemo = (product) => setDemoProduct(product);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <button
            key={product._id || product.id}
            onClick={() => router.push(`/softwares-readymade/${product?._id}`)}
            className="group relative bg-linear-to-br from-slate-900/90 via-blue-900/50 to-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/10 transition-all duration-700 pointer-events-none" />

            <div className="relative h-60 overflow-hidden bg-slate-800/50">
              <Image
                src={product.screenshots?.[0] || "/placeholder.jpg"}
                alt={product.name}
                width={1920}
                height={1080}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  shareProduct(product);
                }}
                className="absolute top-4 cursor-pointer right-4 p-2.5 bg-slate-800/80 backdrop-blur-md rounded-xl hover:bg-slate-700/80 transition-all duration-300 hover:scale-110 hover:rotate-12 border border-slate-600/50"
              >
                <Share2 className="w-4 h-4 text-slate-200" />
              </button>
            </div>

            <div className="p-6 space-y-3 ">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl text-left font-bold text-white leading-tight line-clamp-1 flex-1">
                  {product.name}
                </h3>
                <span className="text-xs font-semibold px-3 py-1 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-300 border border-blue-400/30 whitespace-nowrap">
                  {product.category}
                </span>
              </div>

              <p
                className="text-slate-300 text-left truncate text-xs leading-relaxed line-clamp-1"
                dangerouslySetInnerHTML={{ __html: product.description || "" }}
              />

              <div className="flex items-center gap-2">
                {product.platforms?.map((platform) => (
                  <div
                    key={platform}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/50 rounded-lg border border-slate-700/50"
                  >
                    {platform === "Web" ? (
                      <Monitor className="size-3.5 text-slate-400" />
                    ) : (
                      <Smartphone className="size-3.5 text-slate-400" />
                    )}
                    <span className="text-[10px] text-slate-400 font-medium">
                      {platform}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(product.tech)
                  ? product.tech
                  : product.tech?.split(", ") || []
                )
                  .slice(0, 4)
                  .map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] tracking-wide px-2 py-1 bg-slate-800/60 text-slate-300 rounded-md border border-slate-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                <span className="text-xs px-2 py-1 bg-slate-800/60 text-slate-300 rounded-md border border-slate-700/50">
                  {product?.tech.length - 4} +
                </span>
              </div>

              <div className="pt-4 border-t border-slate-700/50 space-y-2">
                <div className="flex justify-between items-center flex-col w-full *:w-full *:flex *:justify-between *:items-center space-y-1">
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">One-time</p>
                    <p className="text-2xl font-black text-white">
                      ₹{product.price?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-0.5">
                      Customization
                    </p>
                    <p className="text-sm font-bold text-slate-300">
                      +₹{product.customization || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2 *:cursor-pointer">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRequestDemo(product);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-blue-500/50 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Play className="w-4 h-4" />
                  <span className="hidden md:block">Request Demo</span>
                  <span className="md:hidden">Request</span>
                </button>

                <button
                  onClick={() =>
                    router.push(`/softwares-readymade/${product._id}`)
                  }
                  className="flex-1 relative overflow-hidden px-4 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-sm text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95 group/buy"
                >
                  <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover/buy:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Buy Now</span>
                  </span>
                </button>
              </div>
            </div>
          </button>
        ))}
      </div>

      <RequestDemoDialog
        product={demoProduct}
        isOpen={!!demoProduct}
        onClose={() => setDemoProduct(null)}
      />
    </div>
  );
};

export default ProductCard;
