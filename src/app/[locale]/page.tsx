"use client";

import { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import DonationCategories from "@/components/home/DonationCategories";
import StatsSection from "@/components/home/StatsSection";
import StoriesSection from "@/components/home/StoriesSection";

export default function HomePage() {
  // Scroll to section if navigated from another page with a hash
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Small delay to let the page render first
      const timer = setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <DonationCategories />
      <StatsSection />
      <StoriesSection />
    </>
  );
}
