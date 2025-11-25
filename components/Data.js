import { Building2, Code2, CreditCard, Crown, GraduationCap, HeadphonesIcon, MessageCircle, Package, Rocket, Users, Wrench, Zap } from "lucide-react";




// About PAge Services
export const aboutServices = [
  {
    icon: Users,
    title: "Hire Verified Developers",
    desc: "Frontend • Backend • Mobile • Full-Stack • UI/UX • DevOps",
  },
  {
    icon: Rocket,
    title: "Ready-Made Software",
    desc: "Real Estate CRM • School ERP • POS • E-commerce • Inventory",
  },
  {
    icon: Wrench,
    title: "Code Installation",
    desc: "Codecanyon • Custom Scripts • Full Setup (Web + App)",
  },
  {
    icon: Code2,
    title: "Custom Development",
    desc: "Websites • Apps • CRM • ERP • SaaS Platforms",
  },
  {
    icon: HeadphonesIcon,
    title: "Maintenance & Support",
    desc: "Bug Fixing • Updates • Performance • 24×7 Priority",
  },
  {
    icon: MessageCircle,
    title: "Tech Consultancy",
    desc: "Planning • Architecture • Costing • Scaling Strategy",
  },
];

// About Page Testimonials
export const testimonials = [
  {
    text: "Saved us 4 months & ₹12 lakhs with their Real Estate CRM. Best decision ever!",
    author: "Rahul Sharma",
    role: "Real Estate Agency Owner",
  },
  {
    text: "Their developer was allocated in 6 hours. Project delivered 12 days early!",
    author: "Priya Mehta",
    role: "Startup Founder",
  },
  {
    text: "Flawless installation + customization. Support team replies in minutes.",
    author: "Amit Verma",
    role: "Digital Agency CEO",
  },
];

// ======================================================
// ============ Pricing Page Data ======================
// ======================================================

export const softwareProducts = [
  {
    name: "Real Estate CRM",
    icon: Building2,
    price: "₹15,000",
    description: "Complete property management and client relationship system",
    features: [
      "Property listing management",
      "Lead tracking & conversion",
      "Document management",
      "Client portal access",
      "Payment tracking",
      "Automated follow-ups",
    ],
    color: "from-blue-500 to-sky-500",
  },
  {
    name: "School ERP",
    icon: GraduationCap,
    price: "₹25,000",
    description: "Comprehensive school management and administration platform",
    features: [
      "Student & staff management",
      "Attendance tracking",
      "Fee management system",
      "Exam & grade management",
      "Parent-teacher communication",
      "Library & transport module",
    ],
    color: "from-sky-500 to-teal-500",
    popular: true,
  },
  {
    name: "Inventory Management",
    icon: Package,
    price: "₹12,000",
    description: "Smart inventory tracking and warehouse management solution",
    features: [
      "Real-time stock tracking",
      "Multi-location support",
      "Purchase order management",
      "Low stock alerts",
      "Barcode scanning",
      "Detailed reports & analytics",
    ],
    color: "from-teal-500 to-blue-500",
  },
  {
    name: "POS + Billing Software",
    icon: CreditCard,
    price: "₹18,000",
    description: "Modern point-of-sale with integrated billing system",
    features: [
      "Quick billing interface",
      "Multi-payment support",
      "Invoice generation",
      "Sales analytics dashboard",
      "Customer management",
      "GST compliance ready",
    ],
    color: "from-blue-500 to-teal-500",
  },
];


// =====================================================================
// ======================= Developer Tiers ================================
export const developerTiers = [
  {
    level: "Junior Developer",
    icon: Code2,
    price: "₹300 – ₹500",
    period: "per hour",
    description: "Perfect for basic web development and simple projects",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "WordPress",
      "Bootstrap",
      "jQuery",
    ],
    features: [
      "Basic website development",
      "Responsive design implementation",
      "WordPress customization",
      "Bug fixes & maintenance",
      "Up to 40 hours/week availability",
    ],
    color: "from-blue-500 to-sky-500",
    popular: false,
  },
  {
    level: "Mid-Level Developer",
    icon: Zap,
    price: "₹600 – ₹1000",
    period: "per hour",
    description: "Ideal for full-stack applications and modern frameworks",
    technologies: [
      "React",
      "Node.js",
      "Laravel",
      "Flutter",
      "Vue.js",
      "MongoDB",
    ],
    features: [
      "Full-stack web applications",
      "Mobile app development",
      "API development & integration",
      "Database design & optimization",
      "Code reviews & best practices",
      "Up to 50 hours/week availability",
    ],
    color: "from-sky-500 to-teal-500",
    popular: true,
  },
  {
    level: "Senior Developer",
    icon: Crown,
    price: "₹1200+",
    period: "per hour",
    description: "Enterprise solutions with advanced tech stack",
    technologies: [
      "MERN Stack",
      "DevOps",
      "AI/ML",
      "Cloud (AWS/Azure)",
      "Microservices",
      "Docker",
    ],
    features: [
      "Complex system architecture",
      "AI/ML integration",
      "Cloud infrastructure setup",
      "Performance optimization",
      "Technical leadership & mentoring",
      "24/7 support availability",
      "Scalable enterprise solutions",
    ],
    color: "from-teal-500 to-blue-500",
    popular: false,
  },
];
