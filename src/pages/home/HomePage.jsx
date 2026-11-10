import React from "react";
import { motion } from "motion/react";
import { HeroSection } from "./components/HeroSection";
import { CategoryGrid } from "./components/CategoryGrid";
import { TopProviders } from "./components/TopProviders";
import { HowItWorks } from "./components/HowItWorks";
import { EmergencyBanner } from "./components/EmergencyBanner";
import { CustomerReviews } from "./components/CustomerReviews";
import { TrustSection } from "./components/TrustSection";

export const HomePage = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Browse Categories Section */}
      <div id="categories">
        <CategoryGrid />
      </div>

      {/* 3. Top Local Pros Section */}
      <TopProviders />

      {/* 4. Trust & Safety Guarantee Section */}
      <TrustSection />

      {/* 5. How ServiLink Works Section */}
      <HowItWorks />

      {/* 6. Verified Customer Reviews Section */}
      <CustomerReviews />

      {/* 7. 24/7 Rapid Response Emergency Banner */}
      <EmergencyBanner />
    </motion.main>
  );
};

export default HomePage;
