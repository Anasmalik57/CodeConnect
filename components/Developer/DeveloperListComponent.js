"use client";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { developers } from "./DevListData";
import DevCard from "./DevCard";

const techOptions = [
  "All",
  "React",
  "Next.js",
  "Flutter",
  "Laravel",
  "Node.js",
  "Python",
  "React Native",
  "Angular",
];
const experienceLevels = ["All", "Beginner", "Intermediate", "Expert"];

export default function DevelopersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortByRate, setSortByRate] = useState("default");

  const filteredDevelopers = useMemo(() => {
    let filtered = developers;

    if (searchTerm) {
      filtered = filtered.filter(
        (dev) =>
          dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dev.skills.some((s) =>
            s.toLowerCase().includes(searchTerm.toLowerCase())
          )
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
  }, [searchTerm, selectedTech, selectedLevel, sortByRate]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 bg-clip-text text-transparent mb-4">
            Hire Verified Developers
          </h1>
          <p className="text-xl text-blue-300/80 font-medium">
            Handpicked talent, ready to build your vision
          </p>
        </div>

        {/* Filters */}
       {/* Filters */}
        <div className="mb-10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20">
          {/* Search and Rate Sort Row */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full lg:flex-1">
              <Search className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, skill, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-white/5 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
              />
            </div>

            <select
              value={sortByRate}
              onChange={(e) => setSortByRate(e.target.value)}
              className="px-5 py-3 bg-black/30 border border-gray-600/30 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all lg:w-auto w-full"
            >
              <option value="default" className="bg-black">Rate: Low → High</option>
              <option value="low" className="bg-black">Rate: Low → High</option>
              <option value="high" className="bg-black">Rate: High → Low</option>
            </select>
          </div>

          {/* Level Buttons Row */}
          <div className="flex flex-wrap gap-3 mb-6">
            {experienceLevels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  selectedLevel === level
                    ? "bg-black text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Tech Stack Buttons Row */}
          <div className="flex flex-wrap gap-3">
            {techOptions.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedTech === tech
                    ? "bg-blue-500/20 text-blue-300 border border-blue-400/50"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-transparent"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mt-6 pt-4 border-t border-gray-700/30">
            <p className="text-gray-400 text-sm">
              Showing <span className="text-white font-semibold">{filteredDevelopers.length}</span> developers
            </p>
          </div>
        </div>

        {/* Dev Component */}
        <DevCard filteredDevelopers={filteredDevelopers} />

        {filteredDevelopers.length === 0 && (
          <div className="text-center py-24">
            <p className="text-3xl font-bold text-blue-400">
              No developers found
            </p>
            <p className="text-blue-300 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
