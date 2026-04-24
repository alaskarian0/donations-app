"use client";

import { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import DonationCategories from "@/components/home/DonationCategories";
import StatsSection from "@/components/home/StatsSection";
import StoriesSection from "@/components/home/StoriesSection";

export default function HomePage() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
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
