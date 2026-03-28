import HeroSection from "@/components/home/HeroSection";
import DonationCategories from "@/components/home/DonationCategories";
import StatsSection from "@/components/home/StatsSection";
import AboutPreview from "@/components/home/AboutPreview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DonationCategories />
      <StatsSection />
      <AboutPreview />
    </>
  );
}
