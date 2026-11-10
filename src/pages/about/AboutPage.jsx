import React from "react";
import { AboutHero } from "./components/AboutHero";
import { AboutStats } from "./components/AboutStats";
import { AboutVettingStandards } from "./components/AboutVettingStandards";
import { AboutCoverageMap } from "./components/AboutCoverageMap";
import { AboutCta } from "./components/AboutCta";

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AboutHero />
        <AboutStats />
        <AboutVettingStandards />
        <AboutCoverageMap />
        <AboutCta />
      </div>
    </div>
  );
};

export default AboutPage;
