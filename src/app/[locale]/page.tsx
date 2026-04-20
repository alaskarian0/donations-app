"use client";

import HeroSection from "@/components/home/HeroSection";
import DonationCategories from "@/components/home/DonationCategories";
import StatsSection from "@/components/home/StatsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DonationCategories />
      <StatsSection />
    </>
  );
}
