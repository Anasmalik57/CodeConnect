"use client";
import { Share2, Play, ShoppingCart, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";
import { ProductDialogBox } from "../DialogBoxes/ProductDioalogBox";
import { RequestDemoDialog } from "../DialogBoxes/RequestDemoDialog";

const ProductCard = ({ filteredProducts }) => {
  const [openProduct, setOpenProduct] = useState(null);
  const [demoProduct, setDemoProduct] = useState(null); // Add this state

  const shareProduct = (product) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      alert(`Share ${product.name}`);
    }
  };

  const handleRequestDemo = (product) => {
    setDemoProduct(product); // Open demo dialog instead of alert
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="group relative bg-linear-to-br from-slate-900/90 via-blue-900/50 to-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
          >
            {/* Animated linear overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/10 transition-all duration-700 pointer-events-none" />

            {/* Image Section */}
            <div className="relative h-48 overflow-hidden bg-slate-800/50">
              <img
                src={product.screenshots[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent" />

              {/* Share button */}
              <button
                onClick={() => shareProduct(product)}
                className="absolute top-4 right-4 p-2.5 bg-slate-800/80 backdrop-blur-md rounded-xl hover:bg-slate-700/80 transition-all duration-300 hover:scale-110 hover:rotate-12 border border-slate-600/50"
                aria-label="Share product"
              >
                <Share2 className="w-4 h-4 text-slate-200" />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
              {/* Title and Category */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold text-white leading-tight line-clamp-2 flex-1">
                  {product.name}
                </h3>
                <span className="text-xs font-semibold px-3 py-1.5 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-300 border border-blue-400/30 whitespace-nowrap">
                  {product.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                {product.description}
              </p>

              {/* Platforms */}
              <div className="flex items-center gap-2">
                {product.platforms.map((platform) => (
                  <div
                    key={platform}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/50 rounded-lg border border-slate-700/50"
                  >
                    {platform === "Web" ? (
                      <Monitor className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span className="text-xs text-slate-400 font-medium">
                      {platform}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5">
                {product.tech.split(", ").map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-slate-800/60 text-slate-300 rounded-md border border-slate-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Pricing */}
              <div className="pt-4 border-t border-slate-700/50 space-y-2">
                <div className="flex justify-between items-center flex-col w-full *:w-full *:flex *:justify-between *:items-center space-y-1">
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">One-time</p>
                    <p className="text-2xl font-black text-white">
                      ₹{product.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-0.5">
                      Customization
                    </p>
                    <p className="text-sm font-bold text-slate-300">
                      {product.customization}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleRequestDemo(product)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-blue-500/50 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Play className="w-4 h-4" />
                  <span className="hidden md:block">Request Demo</span>
                  <span className="md:hidden">Request</span>
                </button>

                <button
                  onClick={() => setOpenProduct(product)}
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
          </div>
        ))}
      </div>

      {/* Buy Now Dialog */}
      <ProductDialogBox
        product={openProduct}
        isOpen={!!openProduct}
        onClose={() => setOpenProduct(null)}
      />

      {/* Request Demo Dialog */}
      <RequestDemoDialog
        product={demoProduct}
        isOpen={!!demoProduct}
        onClose={() => setDemoProduct(null)}
      />
    </div>
  );
};

export default ProductCard;
