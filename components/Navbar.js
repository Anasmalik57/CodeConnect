"use client";
import { useState, useEffect } from "react";
import { Home, Code2, Mail, Menu, X, Sparkles, FolderCode } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Developers", href: "/developers", icon: Code2 },
  { name: "Softwares", href: "/softwares-readymade", icon: FolderCode  },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={` border-b border-violet-300/70 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-violet-500/30 shadow-xl shadow-violet-900/50": "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-violet-500 via-fuchsia-500 to-pink-500 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-all duration-500" />
                <div className="relative bg-linear-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-3 rounded-2xl shadow-2xl ring-2 ring-violet-400/50">
                  <Sparkles className="w-7 h-7 text-white" strokeWidth={3} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black bg-linear-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                  CodeConnect
                </h1>
                <p className="text-xs font-medium text-violet-300/70 tracking-wider">
                  CONNECT • BUILD • GROW
                </p>
              </div>
            </Link>

            {/* Desktop Nav's */}
            <div className="hidden md:flex items-center gap-2  ">
              {navLinks.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  onClick={() => setActive(name)}
                  className="relative group px-6 py-3 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <span
                    className={`absolute inset-0 bg-linear-to-r from-violet-600/0 via-fuchsia-600/0 to-violet-600/0 
                    group-hover:from-violet-600/20 group-hover:via-fuchsia-600/30 group-hover:to-violet-600/20 
                    transition-all duration-500 ${active === name ? "from-violet-600/30 via-fuchsia-600/40 to-violet-600/30" : ""}`}
                  />
                  {active === name && (
                    <span className="absolute inset-0 bg-linear-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-2xl blur-xl opacity-60 animate-pulse" />
                  )}
                  <span className="relative flex items-center gap-2.5 font-semibold text-white/80 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    {name}
                  </span>
                </Link>
              ))}
            </div>

            {/* CTA Button Here... */}
            <div className="hidden md:block">
              <button className="group relative px-8 py-3.5 cursor-pointer bg-linear-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-2xl font-bold text-white overflow-hidden shadow-2xl shadow-fuchsia-500/40 hover:shadow-fuchsia-500/70 transition-all duration-400 hover:scale-105 active:scale-95">
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center gap-2">
                  <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                  Get Started
                </span>
              </button>
            </div>

            {/* Mobile Menu Toggle Hree...... */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-3 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-violet-500/30 text-white transition-all duration-300">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Sleek & Smooth */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-5 py-6 space-y-3 bg-black/90 backdrop-blur-3xl border-t border-violet-500/40">
            {navLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                onClick={() => {
                  setActive(name);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  active === name
                    ? "bg-linear-to-r from-violet-600/50 to-fuchsia-600/50 text-white shadow-2xl shadow-violet-700/50"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span>{name}</span>
              </Link>
            ))}
            <button className="w-full mt-4 py-4 bg-linear-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-2xl font-bold text-white shadow-2xl shadow-fuchsia-600/60 flex items-center justify-center gap-3 hover:shadow-fuchsia-500/80 transition-all duration-300 active:scale-95">
              <Sparkles className="w-5 h-5" />
              Get Started Now
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}