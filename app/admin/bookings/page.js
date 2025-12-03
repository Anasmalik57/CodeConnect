"use client";
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
    route: "/admin/bookings/productsdemo-requests",
  },
  // {
  //   id: 5,
  //   icon: Wrench,
  //   title: "Technical Maintenance",
  //   route: "/services/maintenance",
  // },
  // {
  //   id: 6,
  //   icon: Bug,
  //   title: "Bug Fixing",
  //   route: "/services/bug-fixing",
  // },
  // {
  //   id: 7,
  //   icon: Calculator,
  //   title: "Project Estimations",
  //   route: "/services/estimations",
  // },
];

export default function ServicesGrid() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => {
            return (
              <div
                key={service.id}
                onClick={() => router.push(service?.route)}
                className={`relative group cursor-pointer`}
              >
                {/* Card Container */}
                <div
                  className={` relative overflow-hidden h-fit  rounded-3xl p-6 bg-linear-to-br from-slate-900/50 to-slate-950/50 border border-slate-800/50 backdrop-blur-xl transition-all duration-500 ease-out hover:border-cyan-500/30`}
                >
                  {/* Gradient Overlay on Hover */}
                  <div
                    className={` absolute inset-0 bg-linear-to-br from-cyan-500/5 to-blue-500/5 transition-opacity duration-500 `}
                  />
                  <div className="relative z-10">
                    {/* Title */}
                    <h3 className="text-white font-semibold text-base leading-snug">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
