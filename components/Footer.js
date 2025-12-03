"use client";
import { useState } from "react";
import { Code2, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, ArrowUpRight, Heart, Send, Sparkles, } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

const footerLinks = {
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/quickLinks/careers" },
    { name: "Our Team", href: "/quickLinks/team" },
    { name: "Blog", href: "/blog" },
    { name: "How It Works", href: "/quickLinks/how-it-works" },
  ],
  Services: [
    { name: "Web Development", href: "/book-services" },
    { name: "App Development", href: "/book-services" },
    { name: "UI/UX Design", href: "/book-services" },
    { name: "Consulting", href: "/book-services" },
  ],
  Resources: [
    { name: "Documentation", href: "/resource/docs" },
    { name: "Tutorials", href: "/resource/tutorials" },
    { name: "Support", href: "/resource/support" },
    { name: "FAQ", href: "/resource/faq" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms of Service", href: "/legal/terms" },
    { name: "Cookie Policy", href: "/legal/cookies" },
    { name: "Licenses", href: "/legal/licenses" },
  ],
};

const socialLinks = [
  { Icon: Github, href: "https://github.com", label: "GitHub" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export default function FooterComponent() {
  const [email, setEmail] = useState("");
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const pathname = usePathname()

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className={`relative bg-linear-to-b from-black via-gray-950 to-black border-t border-blue-500/20 overflow-hidden  ${pathname.startsWith('/admin') ? 'hidden' : ''}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative max-w-[1350px] mx-auto px-5 lg:px-8 pt-20 pb-8">
        {/* Top Section - Newsletter & Brand */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 pb-16 border-b border-blue-500/20">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500 via-sky-500 to-teal-500 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative bg-linear-to-br from-blue-600 via-sky-500 to-teal-400 p-3 rounded-2xl shadow-2xl ring-2 ring-blue-400/50">
                  <Code2 className="w-7 h-7 text-white" strokeWidth={3} />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-black bg-linear-to-r from-blue-400 via-sky-400 to-teal-400 bg-clip-text text-transparent tracking-tight">
                  NoDeskDeveloper
                </h2>
                <p className="text-xs font-medium text-blue-300/70 tracking-wider">
                  CONNECT • BUILD • GROW
                </p>
              </div>
            </Link>

            <p className="text-gray-400 leading-relaxed max-w-md">
              Empowering businesses with cutting-edge digital solutions. We
              transform ideas into reality through innovative development and
              design.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <Link
                href="mailto:hello@nodeskdeveloper.com"
                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors duration-300 group w-fit"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">hello@nodeskdeveloper.com</span>
              </Link>
              <Link
                href="tel:+1234567890"
                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors duration-300 group w-fit"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">+91 8121923831</span>
              </Link>
              <Link
                href="https://api.whatsapp.com/send?phone=+918121923831&text=Hello%20Team,%20I%20need%20your%20service"
                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors duration-300 group w-fit"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                  <FaWhatsapp className="w-4 h-4" />
                </div>
                <span className="text-sm">+91 8121923831</span>
              </Link>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">San Francisco, CA 94102</span>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Stay Updated</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Subscribe to our newsletter for the latest updates, tips, and
                exclusive offers.
              </p>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-sky-500 to-teal-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white/5 border border-blue-500/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:bg-white/10 transition-all duration-300 backdrop-blur-xl"
                />
                <button
                  onClick={handleSubscribe}
                  className="group/btn relative px-8 py-4 bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 rounded-2xl font-bold text-white overflow-hidden shadow-2xl shadow-sky-500/40 hover:shadow-sky-500/70 transition-all duration-400 hover:scale-105 active:scale-95"
                >
                  <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                  <Send className="relative w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map(({ Icon, href, label }, idx) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(idx)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className="relative group/social p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
                  aria-label={label}
                >
                  {hoveredSocial === idx && (
                    <span className="absolute inset-0 bg-linear-to-r from-blue-500 via-sky-500 to-teal-500 rounded-xl blur-xl opacity-60 animate-pulse" />
                  )}
                  <Icon className="relative w-5 h-5 text-gray-400 group-hover/social:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map(({ name, href }) => (
                  <li key={name}>
                    <Link
                      href={href}
                      className="group flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm w-fit"
                    >
                      <span className="relative">
                        {name}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-linear-to-r from-blue-400 to-sky-400 group-hover:w-full transition-all duration-300" />
                      </span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2025 NoDeskDeveloper. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Made with</span>
            <Heart
              className="w-4 h-4 text-red-500 animate-pulse"
              fill="currentColor"
            />
            <span>by the NoDeskDeveloper Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
