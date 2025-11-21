"use client";
import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import { products } from "./ProductsData";
import ProductCard from "./ProductCard";

const categories = ["All", "Food", "Travel", "Education", "Healthcare", "Real Estate", "E-commerce", "Finance", "Fitness"];

export default function ReadyMadeSoftwarePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const shareProduct = (product) => {
    if (navigator.share) {
      navigator.share({ title: product.name, text: product.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24 px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter bg-linear-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Software Solutions You Want
          </h1>
          <p className="mt-1 text-xl font-medium text-violet-300/90 max-w-4xl mx-auto leading-relaxed">
            Launch your business in <span className="text-fuchsia-400 font-bold">days</span>, not months.
            Fully tested • Production-ready • 100% Customizable
          </p>
        </div>

        {/* Search + Clean Dropdown Filter Here.... */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center mb-16">
          {/* Search */}
          <div className="relative w-full max-w-xl">
            <Search className="z-10 absolute left-6 top-1/2 -translate-y-1/2 size-5 text-violet-400" />
            <input
              type="text"
              placeholder="Search powerful apps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-3 bg-white/5 border border-violet-500/40 rounded-full backdrop-blur-2xl text-white placeholder-violet-400/70 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/20 transition-all text-lg font-medium"
            />
          </div>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex cursor-pointer min-w-30 items-center justify-between px-5 py-3 bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/50 rounded-full backdrop-blur-2xl font-bold text-lg hover:border-violet-400 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-600/40"
            >
              <span>{selectedCategory}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-full bg-black/90 backdrop-blur-3xl border border-violet-500/50 rounded-2xl shadow-2xl shadow-violet-900/80 overflow-hidden z-50">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left font-medium transition-all hover:bg-linear-to-r text-nowrap hover:from-violet-600/30 hover:to-fuchsia-600/30 ${
                      selectedCategory === cat ? "bg-violet-600/40 text-white" : "text-violet-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Cards */}
        <ProductCard filteredProducts={filteredProducts} />
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-32">
            <div className="text-6xl font-black bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              No Apps Found
            </div>
            <p className="text-xl text-violet-300 mt-6">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}