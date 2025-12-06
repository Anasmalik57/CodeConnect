import Image from "next/image";
import Link from "next/link";

export default function SoftwareCard({ software }) {
  const totalCost = software.totalCost || software.price;

  return (
    <div className="bg-white/5 border border-white/20 rounded-2xl overflow-hidden hover:border-white/30 transition-all hover:scale-[1.02] shadow-xl">
      {/* Screenshot */}
      <div className="relative h-60 bg-gray-900">
        <Image
          src={software.screenshots[0] || "/placeholder.jpg"}
          alt={software.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-green-600/80 text-white text-xs rounded-full font-semibold">
            {software.category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 flex gap-3 *:text-[11px] *:tracking-wider *:bg-slate-600 *:px-3 *:py-1 *:rounded-full lowercase">
             {software.platforms.includes("Web") && <span>Web</span>}
          {software.platforms.includes("Android") && <span>Android</span>}
          {software.platforms.includes("iOS") && <span>iOS</span>}
          {software.platforms.includes("Desktop") && <span>Desktop</span>}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-2xl font-bold text-white">{software.name}</h3>

        {/* RICH DESCRIPTION - Fixed with proper HTML rendering */}
        <div 
          className="text-gray-300 text-sm leading-relaxed prose prose-invert prose-sm max-w-none line-clamp-1"
          dangerouslySetInnerHTML={{ __html: software.description || "" }}
        />

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {software.tech.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full"
            >
              {t.trim()}
            </span>
          ))}
          {software.tech.length > 3 && (
            <span className="text-xs px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full">
              +{software.tech.length - 3} more
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <div>
            <p className="text-gray-400 text-xs">Starting from</p>
            <p className="text-2xl font-black text-green-400">
              ₹{Number(software.price).toLocaleString()}
            </p>
          </div>

          <Link
            href={`/admin/softwares/${software._id}`}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white font-semibold hover:scale-105 transition text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}