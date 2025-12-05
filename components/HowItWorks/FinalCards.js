"use client";
import { DollarSign, CreditCard, Target, TrendingUp, Wrench, RotateCw, } from "lucide-react";

export default function FinalCards() {
  const features = [
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description:
        "Fixed hourly bands and one-time software pricing with optional customization.",
      tags: [
        { icon: CreditCard, label: "Stripe/Razorpay" },
        { icon: CreditCard, label: "On-time Bills" },
      ],
      iconBg: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "Milestone Delivery",
      description:
        "Track progress and release payments per milestone for complete control.",
      tags: [
        { icon: Target, label: "Scope" },
        { icon: TrendingUp, label: "Progress" },
      ],
      iconBg: "from-purple-500 to-pink-500",
    },
    {
      icon: Wrench,
      title: "Post-Launch Care",
      description:
        "Choose ad-hoc fixes or monthly maintenance plans that fit your pace.",
      tags: [
        { icon: Wrench, label: "Hotfix" },
        { icon: RotateCw, label: "Updates" },
      ],
      iconBg: "from-teal-500 to-emerald-500",
    },
  ];

  return (
    <div className="w-full bg-linear-to-b from-black via-gray-950 to-black py-16 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="relative group">
                {/* Hover Glow */}
                <div className={`absolute -inset-1 bg-linear-to-r ${feature.iconBg} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />

                {/* Card */}
                <div className="relative h-full bg-linear-to-b from-white/10 to-white/5 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 bg-linear-to-r ${feature.iconBg} rounded-xl shrink-0`}>
                      <Icon className="size-4 text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, tagIdx) => {
                      const TagIcon = tag.icon;
                      return (
                        <div
                          key={tagIdx}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-blue-500/30 rounded-lg hover:bg-white/10 transition-colors duration-300"
                        >
                          <TagIcon
                            className="w-3.5 h-3.5 text-blue-400"
                            strokeWidth={2.5}
                          />
                          <span className="text-xs font-medium text-gray-300">
                            {tag.label}
                          </span>
                        </div>
                      );
                    })}
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
