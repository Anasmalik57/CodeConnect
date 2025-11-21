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
          <h1 className="text-5xl md:text-6xl font-black bg-linear-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Hire Top Developers
          </h1>
          <p className="text-xl text-violet-300/80 font-medium">
            Handpicked talent, ready to build your vision
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
            <input
              type="text"
              placeholder="Search developers or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/5 border border-violet-500/30 rounded-2xl backdrop-blur-xl text-white placeholder-violet-400/60 focus:outline-none focus:border-violet-400 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="px-5 py-3 bg-white/5 border border-violet-500/30 rounded-xl backdrop-blur-xl text-white focus:outline-none focus:border-violet-400 transition-all"
            >
              {techOptions.map((tech) => (
                <option key={tech} value={tech} className="bg-black">
                  {tech}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-5 py-3 bg-white/5 border border-violet-500/30 rounded-xl backdrop-blur-xl text-white focus:outline-none focus:border-violet-400 transition-all"
            >
              {experienceLevels.map((l) => (
                <option key={l} value={l} className="bg-black">
                  {l} Level
                </option>
              ))}
            </select>

            <select
              value={sortByRate}
              onChange={(e) => setSortByRate(e.target.value)}
              className="px-5 py-3 bg-white/5 border border-violet-500/30 rounded-xl backdrop-blur-xl text-white focus:outline-none focus:border-violet-400 transition-all"
            >
              <option value="default">Default</option>
              <option value="low">Rate: Low to High</option>
              <option value="high">Rate: High to Low</option>
            </select>
          </div>
        </div>

        {/* Dev Component */}
        <DevCard filteredDevelopers={filteredDevelopers} />

        {filteredDevelopers.length === 0 && (
          <div className="text-center py-24">
            <p className="text-3xl font-bold text-violet-400">
              No developers found
            </p>
            <p className="text-violet-300 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
