"use client";
import { useState } from "react";
import {
  Sparkles,
  Check,
  ArrowRight,
  Rocket,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { developerTiers, softwareProducts } from "@/components/Data";
import BottomCTAButton from "@/components/MiniComponents/BottomCTAButton";

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("developers");
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-950 to-black py-20 px-5 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative max-w-[1350px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">
              Transparent Pricing
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black bg-linear-to-r from-blue-400 via-sky-400 to-teal-400 bg-clip-text text-transparent leading-tight">
            Choose Your Perfect Plan
          </h1>

          <p className="text-gray-400 text-[16px] md:text-lg max-w-2xl mx-auto">
            Whether you need expert developers or ready-made solutions, we've
            got you covered with flexible pricing options.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-white/5 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-2">
            <button
              onClick={() => setActiveTab("developers")}
              className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "developers"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === "developers" && (
                <span className="absolute inset-0 bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 rounded-xl" />
              )}
              <span className="relative flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="hidden md:block">Hire Developers</span>
                <span className="md:hidden">Developers</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab("software")}
              className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "software"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === "software" && (
                <span className="absolute inset-0 bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 rounded-xl" />
              )}
              <span className="relative flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />

                <span className="hidden md:block">Ready Software</span>
                <span className="md:hidden">Software</span>
              </span>
            </button>
          </div>
        </div>

        {/* Developers Section */}
        {activeTab === "developers" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developerTiers.map((tier, idx) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.level}
                  onMouseEnter={() => setHoveredCard(`dev-${idx}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`relative group ${
                    tier.popular ? "lg:-mt-4 lg:mb-4" : ""
                  }`}
                >
                  {/* Glow Effect */}
                  {hoveredCard === `dev-${idx}` && (
                    <div
                      className={`absolute -inset-1 bg-linear-to-r ${tier.color} rounded-3xl blur-2xl opacity-60 animate-pulse`}
                    />
                  )}

                  {/* Card */}
                  <div className="relative h-full bg-linear-to-b from-white/10 to-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 transition-all duration-500 hover:scale-105">
                    {/* Popular Badge */}
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <div
                          className={`flex items-center gap-2 px-4 py-2 bg-linear-to-r ${tier.color} rounded-full text-white text-sm font-bold shadow-2xl`}
                        >
                          <TrendingUp className="w-4 h-4" />
                          Most Popular
                        </div>
                      </div>
                    )}

                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className={`inline-flex p-4 bg-linear-to-r ${tier.color} rounded-2xl shadow-2xl`}
                      >
                        <Icon
                          className="w-8 h-8 text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>

                    {/* Title & Price */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {tier.level}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6">
                      {tier.description}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-4xl font-black bg-linear-to-r ${tier.color} bg-clip-text text-transparent`}
                        >
                          {tier.price}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {tier.period}
                      </span>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6 pb-6 border-b border-blue-500/20">
                      <p className="text-sm font-semibold text-white mb-3">
                        Technologies:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tier.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white/5 border border-blue-500/30 rounded-lg text-xs text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check
                            className="w-5 h-5 text-teal-400 shrink-0 mt-0.5"
                            strokeWidth={3}
                          />
                          <span className="text-gray-300 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      className={`w-full group/btn relative px-6 py-4 bg-linear-to-r ${tier.color} rounded-2xl font-bold text-white overflow-hidden shadow-2xl hover:shadow-sky-500/50 transition-all duration-400 hover:scale-105 active:scale-95`}
                    >
                      <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                      <span className="relative flex items-center justify-center gap-2">
                        Hire Now
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Software Section */}
        {activeTab === "software" && (
          <div className="grid md:grid-cols-2 gap-8">
            {softwareProducts.map((software, idx) => {
              const Icon = software.icon;
              return (
                <div
                  key={software.name}
                  onMouseEnter={() => setHoveredCard(`soft-${idx}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative group"
                >
                  {/* Glow Effect */}
                  {hoveredCard === `soft-${idx}` && (
                    <div
                      className={`absolute -inset-1 bg-linear-to-r ${software.color} rounded-3xl blur-2xl opacity-60 animate-pulse`}
                    />
                  )}

                  {/* Card */}
                  <div className="relative h-full bg-linear-to-b from-white/10 to-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 transition-all duration-500 hover:scale-105">
                    {software.popular && (
                      <div className="absolute -top-4 right-8">
                        <div
                          className={`flex items-center gap-2 px-4 py-2 bg-linear-to-r ${software.color} rounded-full text-white text-sm font-bold shadow-2xl`}
                        >
                          <Rocket className="w-4 h-4" />
                          Best Value
                        </div>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-6">
                      {/* Icon */}
                      <div
                        className={`inline-flex p-4 bg-linear-to-r ${software.color} rounded-2xl shadow-2xl`}
                      >
                        <Icon
                          className="w-8 h-8 text-white"
                          strokeWidth={2.5}
                        />
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div
                          className={`text-3xl font-black bg-linear-to-r ${software.color} bg-clip-text text-transparent`}
                        >
                          {software.price}
                        </div>
                        <span className="text-gray-500 text-sm">one-time</span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {software.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 pb-6 border-b border-blue-500/20">
                      {software.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {software.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check
                            className="w-5 h-5 text-teal-400 shrink-0 mt-0.5"
                            strokeWidth={3}
                          />
                          <span className="text-gray-300 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      className={`w-full group/btn relative px-6 py-4 bg-linear-to-r ${software.color} rounded-2xl font-bold text-white overflow-hidden shadow-2xl hover:shadow-sky-500/50 transition-all duration-400 hover:scale-105 active:scale-95`}
                    >
                      <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                      <span className="relative flex items-center justify-center gap-2">
                        Purchase Now
                        <ShoppingCart className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <BottomCTAButton />
      </div>
    </div>
  );
}
