"use client";
import { ArrowRight, MousePointer2 } from "lucide-react";
import { useRouter } from "next/navigation";

const services = [
  {
    id: 1,
    title: "Developers Enquiries",
    route: "/admin/bookings/dev-enquiries",
  },
  {
    id: 2,
    title: "Developers Bookings",
    route: "/admin/bookings/dev-bookings",
  },
  {
    id: 3,
    title: "Product Demo Requests",
    route: "/admin/bookings/productsdemo-requests",
  },
  {
    id: 4,
    title: "Product Buying Enquiries",
    route: "/admin/bookings/productsbuying-requests",
  },
  {
    id: 5,
    title: "Install OwnCode Enquiries",
    route: "/admin/bookings/installcode-enquaries",
  },
  {
    id: 6,
    title: "Code Installation bookings",
    route: "/admin/bookings/CodeInstallBooking",
  },
  {
    id: 7,
    title: "Tech Consult Enquiries",
    route: "/admin/bookings/techConsult",
  },
  {
    id: 8,
    title: "Project Estimation's",
    route: "/admin/bookings/projectEstimations",
  },
  {
    id: 9,
    title: "Error Fixing Enquiries",
    route: "/admin/bookings/errorFixing",
  },
  {
    id: 9,
     title: "Tech Maintenance Enquiries",
    route: "/admin/bookings/tech-maintenance",
    
  },
];

export default function ServicesGrid() {
  const router = useRouter();

  return (
    <>
    <div className="border-b border-white/10 backdrop-blur-xl bg-white/2 flex justify-between items-start md:items-center *:py-[22px] *:px-6">
          <div className="px-8 py-10">
            <h1 className="text-2xl md:text-3xl font-black bg-linear-to-tl from-cyan-700 via-emerald-600 to-green-700 bg-clip-text text-transparent">
              All Bookings
            </h1>
            <p className="text-gray-400 mt-1 text-xs md:text-sm flex">
              Manage <span className="hidden md:block px-1">and showcase </span>{" "}
              all bookings
            </p>
          </div>
        </div>
      <div className="min-h-screen bg-black p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => {
              return (
                <div
                  key={service.id}
                  onClick={() => router.push(service?.route)}
                  className={`relative group cursor-pointer`}
                >
                  {/* Card Container */}
                  <div className={` relative overflow-hidden h-fit  rounded-3xl p-6 bg-linear-to-br from-slate-900/50 to-slate-950/50 border border-slate-800/50 backdrop-blur-xl transition-all duration-500 ease-out hover:border-cyan-500/30`}>
                    {/* Gradient Overlay on Hover */}
                    <div className={` absolute inset-0 bg-linear-to-br from-cyan-500/5 to-blue-500/5 transition-opacity duration-500 `}/>
                    <div className="relative z-10 flex justify-between">
                      {/* Title */}
                      <h3 className="text-white font-semibold text-base leading-snug text-nowrap">
                        {service.title}
                      </h3>
                      <div className="opacity-0 group-hover:opacity-70">
                        <MousePointer2 className="size-5 rotate-90"/>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
