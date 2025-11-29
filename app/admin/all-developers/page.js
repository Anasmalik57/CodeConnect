"use client";

import { useEffect, useState } from "react";
import DevCard from "@/components/AdminPanel/DevCard";
import AddDeveloperModal from "@/components/Modals/AddDeveloperModal";
import { API_BASE } from "@/lib/api";

export default function AllDevelopersPage() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const res = await fetch(`${API_BASE}/developers`, {
          cache: "no-store",
        });
        const result = await res.json();

        if (result.success) {
          setDevelopers(result.data);
        }
      } catch (error) {
        console.error("Error fetching developers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevelopers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Loading developers...</p>
      </div>
    );
  }

  const handleAddDeveloper = async (newDev) => {
    try {
      const res = await fetch(`${API_BASE}/add-developer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDev),
      });

      const result = await res.json();

      if (result.success) {
        setDevelopers((prev) => [result.data, ...prev]);
        console.log("Developer added successfully:", result.data);
      } else {
        console.error("Failed to add developer:", result.message);
      }
    } catch (error) {
      console.error("Error adding developer:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="border-b border-white/10 backdrop-blur-xl bg-white/2 flex justify-between items-center">
          <div className="px-8 py-10">
            <h1 className="text-4xl font-black bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              All Developers
            </h1>
            <p className="text-gray-400 mt-2">
              Manage and view all registered developers
            </p>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="px-8 py-10">
            <span className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-white shadow-lg hover:shadow-purple-500/30 transition flex items-center gap-2">
              Add Developer
            </span>
          </button>
        </div>

        {/* Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {developers.map((dev) => (
              <DevCard key={dev._id} developer={dev} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddDeveloperModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddDeveloper}
      />
    </>
  );
}
