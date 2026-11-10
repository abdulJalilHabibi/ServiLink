export const CATEGORIES = [
  {
    id: "electrical",
    name: "Electrical Services",
    icon: "Zap",
    prosCount: 28,
    startingPrice: 55,
    popular: true,
    description: "Circuit breaker panels, generator hookups, solar inverter wiring & repairs.",
    accentColor: "indigo"
  },
  {
    id: "plumbing",
    name: "Plumbing & Pipes",
    icon: "Droplet",
    prosCount: 34,
    startingPrice: 60,
    popular: true,
    description: "Emergency leak stops, pipe relining, drain unclogging & water heaters.",
    accentColor: "indigo"
  },
  {
    id: "carpentry",
    name: "Carpentry & Wood",
    icon: "Hammer",
    prosCount: 19,
    startingPrice: 50,
    popular: true,
    description: "Custom cabinetry, door alignments, wooden frames & architectural joinery.",
    accentColor: "indigo"
  },
  {
    id: "appliance",
    name: "Appliance Repair",
    icon: "Cpu",
    prosCount: 22,
    startingPrice: 48,
    popular: true,
    description: "Refrigerators, washing machines, ovens, microwaves & water dispensers.",
    accentColor: "indigo"
  },
  {
    id: "hvac",
    name: "Heating & AC (HVAC)",
    icon: "Fan",
    prosCount: 16,
    startingPrice: 65,
    popular: true,
    description: "Split AC installation, seasonal gas recharging, duct cleaning & heating.",
    accentColor: "indigo"
  },
  {
    id: "painting",
    name: "House Painting",
    icon: "Paintbrush",
    prosCount: 25,
    startingPrice: 45,
    popular: true,
    description: "Interior wall coating, exterior weatherproofing, wood staining & finishing.",
    accentColor: "indigo"
  }
];

export const STATS = [
  {
    value: "45,000+",
    label: "BOOKINGS COMPLETED",
    icon: "CheckCircle2"
  },
  {
    value: "4.95 ★",
    label: "AVERAGE CUSTOMER RATING",
    icon: "Star"
  },
  {
    value: "1,200+",
    label: "LICENSED SPECIALISTS",
    icon: "ShieldCheck"
  }
];

export const TRUST_BADGES = [
  "100% Vetted Handymen",
  "Transparent Hourly Rates",
  "Quick Response (< 15 mins)"
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Select Your Service",
    description: "Describe the issue, browse trade categories, or enter quick specs for custom job scopes.",
    icon: "FileSearch"
  },
  {
    step: "02",
    title: "Choose a Vetted Pro",
    description: "Compare upfront hourly rates, real verified ratings, credentials, and real-time availability.",
    icon: "IdCard"
  },
  {
    step: "03",
    title: "Pay on Completion",
    description: "Payments remain safely in secure escrow until you approve the finished service checklist.",
    icon: "ShieldCheck"
  }
];

export const TOP_PROVIDERS = [
  {
    id: "pro-1",
    name: "Somaya ahmadi",
    tradeHeadline: "Master Electrician & EV Specialist",
    category: "electrical",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    verified: true,
    rating: 4.98,
    reviewCount: 284,
    jobsCompleted: 430,
    hourlyRate: 40,
    responseTime: "15 min",
    location: "District 10, Kabul (Wazir Akbar Khan)",
    experienceYears: 9,
    skills: ["Circuit Panels", "EV Chargers", "Solar Inverters", "Emergency Wiring"],
    featuredReview: "Arrived in 20 minutes during an electrical blackout. Identified the shorted circuit immediately. Highly professional!",
    badge: "Top Rated 2026"
  },
  {
    id: "pro-2",
    name: "Zuhra Alimi",
    tradeHeadline: "HVAC & Climate Consultant • Efficiency Pro",
    category: "hvac",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    verified: true,
    rating: 4.99,
    reviewCount: 196,
    jobsCompleted: 340,
    hourlyRate: 45,
    responseTime: "20 min",
    location: "District 3, Kabul (Deh Bori)",
    experienceYears: 8,
    skills: ["Inverter ACs", "Gas Recharging", "Duct Balancing", "Smart Thermostats"],
    featuredReview: "Full seasonal tune-up on 3 split units. Runs whisper quiet now and cooling power doubled.",
    badge: "Eco-Specialist"
  },
  {
    id: "pro-3",
    name: "Farhad Mohammad",
    tradeHeadline: "Master Plumber & Pipe Relining Specialist",
    category: "plumbing",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    verified: true,
    rating: 4.96,
    reviewCount: 319,
    jobsCompleted: 512,
    hourlyRate: 35,
    responseTime: "18 min",
    location: "District 4, Kabul (Kart-e Parwan)",
    experienceYears: 12,
    skills: ["Water Heaters", "Pipe Relining", "Leak Detection", "Pressure Pumps"],
    featuredReview: "Repaired broken underground PVC pipe without tearing down our garden wall. Saved us thousands.",
    badge: "Customer Favorite"
  },
  {
    id: "pro-4",
    name: "Nawidullah Stanikzai",
    tradeHeadline: "Commercial & Residential Deep Cleaning Lead",
    category: "cleaning",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    verified: true,
    rating: 4.94,
    reviewCount: 242,
    jobsCompleted: 388,
    hourlyRate: 25,
    responseTime: "25 min",
    location: "District 7, Kabul (Darulaman)",
    experienceYears: 6,
    skills: ["Steam Sanitization", "Carpet Extraction", "Post-Construction", "Window Care"],
    featuredReview: "Transformed our post-renovation villa in 5 hours. Spotless and smells clean without harsh chemicals.",
    badge: "Fast Crew"
  }
];

export const CITIES = [
  "All Districts (Kabul Metro)",
  "District 10 - Wazir Akbar Khan",
  "District 2 - Shahr-e Naw",
  "District 4 - Kart-e Parwan",
  "District 3 - Deh Bori",
  "District 7 - Darulaman",
  "District 9 - Mikroyan"
];
