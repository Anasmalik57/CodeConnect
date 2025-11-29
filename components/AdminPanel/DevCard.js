"use client";

import Image from "next/image";
import Link from "next/link";
import {Eye} from "lucide-react";

export default function DevCard({ developer }) {
  const { _id, name, photo, skills, experience, hourlyRate, availability, level, country, state, preferredLanguage, } = developer;

  console.log("Developer Data:", _id);
 return (<>
 
 <div className="group relative bg-linear-to-b from-white/5 to-white/2 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-blue-500/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Glow on Hover */}
      <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700" />

      <div className="relative z-10">
        {/* Profile Photo */}
        <div className="flex flex-col items-center -mt-12">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-black shadow-2xl ring-4 ring-blue-500/30">
            <Image src={photo || "/ProfilePic.jpg"} alt={name} width={96} height={96} className="object-cover w-full h-full" />
          </div>
          <h3 className="mt-4 text-xl font-bold text-white">{name}</h3>
          <p className="text-sm text-blue-400 font-semibold">{level}</p>
        </div>

        {/* Info Grid */}
        <div className="mt-6 space-y-3 text-sm grid grid-cols-2">
          <div className="flex items-center gap-2 text-gray-300">
            <span>Experience:</span>
            <span>{experience} years+</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <span className="font-bold text-green-400">Rate:</span>
            <span className="font-bold text-green-400">₹{hourlyRate}/hr</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-sky-400">Country:</span>
            <span>{country}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-purple-400">State:</span>
            <span>{state}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-pink-400">Language:</span>
            <span>{preferredLanguage}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <span className="text-emerald-400 font-medium">{availability}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-gray-300"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-gray-500">
              +{skills.length - 4}
            </span>
          )}
        </div>

        {/* View Details Button */}
        <Link
          href={`/admin/alldevelopers/${_id}`}
          className="mt-6 py-2 w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold  transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
        >
          <Eye className="w-4 h-4" />
          Upate Details
        </Link>
      </div>
    </div>
 </>)
}