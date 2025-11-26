"use client";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { products } from "./ProductsData";
import ProductCard from "./ProductCard";

const categories = [
  "All",
  "Food",
  "Travel",
  "Fitness",
  "Real Estate",  
  "E-commerce",
  "Finance",
  "Education",
  "Healthcare",
];

export default function ReadyMadeSoftwarePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24 px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black tracking-tighter bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 bg-clip-text text-transparent leading-tight">
            Software & Ready-Made Apps
          </h1>
          <p className="mt-1 text-lg font-medium text-blue-300/90 max-w-4xl mx-auto leading-relaxed">
            Launch your business in{" "}
            <span className="text-sky-400 font-bold">days</span>, not months.
            Fully tested • Production-ready • 100% Customizable
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-4 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-3.5 md:p-6">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-semibold text-xs md:text-sm transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-linear-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/50"
                    : "bg-white/5 text-blue-300 hover:bg-white/10 border border-blue-500/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/70" />
            <input
              type="text"
              placeholder="Search by name, tech, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-3.5 bg-white/5 border border-blue-500/30 rounded-2xl text-white placeholder-blue-400/60 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>
        </div>
        {/* Products Count */}
        <div className="mb-12 ml-3 text-blue-300/70 text-sm font-medium">
          Showing{" "}
          <span className="text-white font-bold">
            {filteredProducts.length}
          </span>{" "}
          products
        </div>

        {/* Product Cards */}
        <ProductCard filteredProducts={filteredProducts} />
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-32">
            <div className="text-6xl font-black bg-linear-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
              No Apps Found
            </div>
            <p className="text-xl text-blue-300 mt-6">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
