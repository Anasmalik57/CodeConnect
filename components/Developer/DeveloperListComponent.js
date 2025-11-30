"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import DevCard from "./DevCard";
import { API_BASE } from "@/lib/api";


const techOptions = [
  "All", "React", "Next.js", "Flutter", "Laravel", "Node.js", "Python", 
  "React Native", "Angular", "Vue.js", "TypeScript", "MongoDB", "Firebase"
];
const experienceLevels = ["All", "Beginner", "Intermediate", "Expert"];

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortByRate, setSortByRate] = useState("default");

  // Fetch developers from backend
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const res = await fetch(`${API_BASE}/developers`, { cache: "no-store" });
        const result = await res.json();

        if (result.success) {
          setDevelopers(result.data);
        } else {
          console.error("Failed to fetch developers");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  const filteredDevelopers = useMemo(() => {
    let filtered = developers;

    if (searchTerm) {
      filtered = filtered.filter(
        (dev) =>
          dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dev.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
          dev.country?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTech !== "All") {
      filtered = filtered.filter((dev) => dev.skills.includes(selectedTech));
    }

    if (selectedLevel !== "All") {
      filtered = filtered.filter((dev) => dev.level === selectedLevel);
    }

    if (sortByRate === "low") {
      filtered = [...filtered].sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sortByRate === "high") {
      filtered = [...filtered].sort((a, b) => b.hourlyRate - a.hourlyRate);
    }

    return filtered;
  }, [developers, searchTerm, selectedTech, selectedLevel, sortByRate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-2xl">Loading top developers...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 bg-clip-text text-transparent mb-4">
            Hire Verified Developers
          </h1>
          <p className="text-xl text-blue-300/80 font-medium">
            Handpicked talent, ready to build your vision
          </p>
        </div>

        {/* Filters (same design) */}
        <div className="mb-4 bg-white/5 backdrop-blur-xl rounded-2xl p-6 pb-3 border border-blue-500/20">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full lg:flex-1">
              <Search className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, skill, country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-white/5 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
              />
            </div>

            <select
              value={sortByRate}
              onChange={(e) => setSortByRate(e.target.value)}
              className="px-5 py-3 bg-black/30 border border-gray-600/30 rounded-xl text-white focus:outline-none focus:border-blue-400 lg:w-auto w-full"
            >
              <option value="default">Default Order</option>
              <option value="low">Rate: Low to High</option>
              <option value="high">Rate: High to Low</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            {experienceLevels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  selectedLevel === level
                    ? "bg-linear-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {techOptions.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedTech === tech
                    ? "bg-blue-500/30 text-blue-300 border border-blue-400/50"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <div className="my-4 px-4 text-sm">
          <p className="text-gray-400">
            Showing{" "}
            <span className="text-white font-bold">{filteredDevelopers.length}</span> elite
            developers
          </p>
        </div>

        {/* Pass filtered list to DevCard */}
        <DevCard filteredDevelopers={filteredDevelopers} />

        {filteredDevelopers.length === 0 && (
          <div className="text-center py-24">
            <p className="text-3xl font-bold text-blue-400">No developers found</p>
            <p className="text-blue-300 mt-2">Try changing filters</p>
          </div>
        )}
      </div>
    </div>
  );
}