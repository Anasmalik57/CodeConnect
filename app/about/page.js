"use client";
import { aboutServices, testimonials } from "@/components/Data";
import {
  Zap,
  Star,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function AboutUsPage() {
  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        {/* Hero */}
        <section className="pt-20 pb-20 px-6 text-center">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/50 backdrop-blur-xl mb-10">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <span className="text-cyan-300 font-bold text-lg">
                Trusted by 3000+ Businesses Across India
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                Your All-in-One
              </span>
              <br />
              <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-400 bg-clip-text text-transparent">
                Technology Partner
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-cyan-200/90 font-medium max-w-4xl mx-auto leading-relaxed">
              From hiring verified developers to launching ready-made apps —
              <span className="text-cyan-400 font-bold">
                {" "}
                NoDeskDeveloper delivers everything
              </span>{" "}
              your business needs under one roof.
            </p>
          </div>
        </section>

        {/* Who We Are + Vision/Mission */}
        <section className="py-20 px-6 ">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16  *:p-8 *:bg-white/10 *:rounded-2xl">
            <div className="space-y-8">
              <h2 className="text-5xl font-black bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Who We Are
              </h2>
              <p className="text-xl text-cyan-100 leading-relaxed">
                NodeskDeveloper is your{" "}
                <span className="text-cyan-400 font-bold">
                  trusted all-in-one technology partner
                </span>
                , offering end-to-end IT solutions — from hiring verified
                developers to ready-made software, code installation, custom
                development, consultancy, maintenance, and digital growth
                support.
              </p>
              <p className="text-lg text-cyan-200">
                We help businesses, startups, and agencies get reliable tech
                solutions with
                <span className="font-bold text-white">
                  {" "}
                  transparent pricing, expert support, and lightning-fast
                  delivery
                </span>
                .
              </p>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-4xl font-black text-cyan-400 mb-6">
                  Our Vision
                </h3>
                <p className="text-xl text-cyan-100 leading-relaxed">
                  To make technology{" "}
                  <span className="text-white font-bold">
                    simple, accessible, and affordable
                  </span>{" "}
                  for every business.
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-sky-400 mb-6">
                  Our Mission
                </h3>
                <ul className="space-y-4 text-lg text-cyan-200">
                  {[
                    "Connect businesses with skilled developers",
                    "Deliver high-quality ready-made apps",
                    "Provide reliable support & maintenance",
                    "Build long-term trust & partnerships",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="w-7 h-7 text-cyan-400 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do – Premium Grid */}
        <section className="py-20 px-6 bg-linear-to-b from-transparent via-blue-950/30 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-center mb-16">
              <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-sky-400 bg-clip-text text-transparent">
                Everything Your Business Needs
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aboutServices.map((service, i) => (
                <div
                  key={i}
                  className="group relative p-8 bg-linear-to-br from-blue-900/50 via-sky-900/40 to-teal-900/50 backdrop-blur-3xl rounded-3xl border border-cyan-500/40 hover:border-cyan-300 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-600/60"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity" />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 shadow-xl">
                      <service.icon className="w-9 h-9 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-cyan-200 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-center mb-16">
              <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                Why Businesses Trust CodeConnect
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: Shield,
                  title: "100% Verified Talent",
                  desc: "Every developer is tested & background checked",
                },
                {
                  icon: Zap,
                  title: "Fastest Delivery",
                  desc: "Ready apps in days • Developers in hours",
                },
                {
                  icon: Star,
                  title: "4.9/5 Client Rating",
                  desc: "3000+ happy clients • 5000+ projects delivered",
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-24 h-24 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <item.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-xl text-cyan-200">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 bg-linear-to-b from-transparent via-cyan-950/20 to-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-16 bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Loved by Clients Across India
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-linear-to-br from-blue-900/40 to-cyan-900/30 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30"
                >
                  <div className="text-6xl text-cyan-400/30 mb-4">“</div>
                  <p className="text-xl text-cyan-100 italic mb-6 leading-relaxed">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="font-bold text-white">{t.author}</p>
                    <p className="text-cyan-300">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-10">
              <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-sky-400 bg-clip-text text-transparent">
                Ready to Grow Your Business?
              </span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/developers"
                className="group relative px-12 py-7 bg-linear-to-r from-blue-600 via-cyan-600 to-sky-600 rounded-2xl font-black text-2xl shadow-2xl shadow-cyan-600/70 hover:shadow-cyan-500/90 transition-all duration-500 hover:scale-110 active:scale-95 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center gap-4">
                  Hire a Developer Now
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition" />
                </span>
              </a>
              <a
                href="/book-service"
                className="px-12 py-7 border-2 border-cyan-500 rounded-2xl font-bold text-xl hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105"
              >
                Book a Free Consultation
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
