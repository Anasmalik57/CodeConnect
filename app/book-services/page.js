"use client";
import { motion } from "framer-motion";
import {
  Globe,
  Users,
  Sparkles,
  FolderGit2,
  Upload,
  MessageSquare,
  Wrench,
  Bug,
  Calculator,
  Palette,
  Server,
  Smartphone,
  Shield,
  Headphones,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "All Our Services",
    tags: ["Dev", "Ops", "Sec"],
    link: "/book-services",
  },
  {
    icon: Users,
    title: "Hire Developers",
    tags: ["Dev", "Ops", "Sec"],
    link: "/developers",
  },
  {
    icon: FolderGit2,
    title: "Readymade Code Solutions",
    tags: ["Dev", "Ops", "Sec"],
    link: "/softwares-readymade",
  },
  {
    icon: Upload,
    title: "Code & Script Installation",
    tags: ["Dev", "Ops", "Sec"],
    link: "/services/codeNscript",
  },
  {
    icon: MessageSquare,
    title: "Tech Consultancy",
    tags: ["Dev", "Ops", "Sec"],
    link: "/services/tech-consultency",
  },
  {
    icon: Wrench,
    title: "Technical Maintenance",
    tags: ["Dev", "Ops", "Sec"],
    link: "/services/maintenance",
  },
  {
    icon: Bug,
    title: "Bug Fixing",
    tags: ["Dev", "Ops", "Sec"],
    link: "/services/bugfixing",
  },
  {
    icon: Calculator,
    title: "Project Estimations",
    tags: ["Dev", "Ops", "Sec"],
    link: "/services/project-estimations",
  },
  {
    icon: Palette,
    title: "UI/UX Design Services",
    tags: ["Dev", "Ops", "Sec"],
    link: "/services/ui-services",
  },
  {
    icon: Server,
    title: "Hosting Setup & Server Management",
    tags: ["Dev", "Ops", "Sec"],
    link: "/services/hosting-services",
  },
  {
    icon: Smartphone,
    title: "Mobile App Publishing Support",
    tags: ["Dev", "Ops", "Sec"],
    link: "/services/app-hosting-service",
  },
  {
    icon: Shield,
    title: "Security & Malware Removal",
    tags: ["Dev", "Ops", "Sec"],
    link: "/services/security-services",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function BookServices() {
  return (
    <>
      <section className="min-h-screen bg-black text-white py-24 px-5 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-black bg-linear-to-r from-blue-400 via-sky-400 to-teal-400 bg-clip-text text-transparent mb-4">
              Book Your Service
            </h1>
            <p className="text-xl text-blue-300/70 font-medium tracking-wide">
              Choose from our premium development & tech solutions
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  href={service.link}
                  className="group relative"
                >
                  <div className="relative h-full">
                    {/* Glow Background */}
                    <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 via-sky-500/20 to-teal-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Main Card */}
                    <div className="relative h-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 overflow-hidden shadow-2xl shadow-black/50 transition-all duration-500 group-hover:border-blue-500/40 group-hover:bg-white/10">
                      {/* Floating Particles Effect */}
                      <div className="absolute top-5 right-5 space-y-1 opacity-40">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              x: [0, -10, 0],
                              y: [10, 0, 30],
                              opacity: [0.3, 0.8, 0.3],
                            }}
                            transition={{
                              duration: 3 + i,
                              repeat: Infinity,
                              delay: i * 0.5,
                            }}
                            className="size-2 bg-blue-400 rounded-full"
                          />
                        ))}
                      </div>

                      {/* Icon */}
                      <div className="mb-5 inline-flex p-4 rounded-2xl bg-linear-to-br from-blue-600/30 to-teal-600/30 backdrop-blur-md border border-blue-500/30 group-hover:scale-110 transition-transform duration-500">
                        <Icon
                          className="w-10 h-10 text-blue-300 group-hover:text-white transition-colors"
                          strokeWidth={2}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-teal-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                        {service.title}
                      </h3>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-400/40 transition-all duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Hover CTA */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute top-4 right-4 inset-0 bg-linear-to-t from-blue-600/20 to-transparent rounded-3xl flex items-end justify-center pb-6"
                      >
                        <span className="text-sm absolute top-0 right-5 opacity-50 font-semibold text-blue-300 tracking-wider">
                          Visit Page
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-20 text-center"
          >
            <button className="group relative px-12 py-5 text-lg font-bold bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 rounded-3xl shadow-2xl shadow-sky-600/50 hover:shadow-sky-500/70 transform hover:scale-105 active:scale-95 transition-all duration-400 overflow-hidden">
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <span className="relative flex items-center gap-3">
                <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
                Book a Service Now
              </span>
            </button>
            <p className="mt-6 text-blue-300/70 text-sm">
              Instant booking • Fixed pricing • 24/7 support available
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
