import { HeroSection } from "@/components/home/components/HeroSection";
import { FeaturesSection } from "@/components/home/components/FeaturesSection";
import { StatisticsSection } from "@/components/home/components/StatisticsSection";
import { HowItWorksSection } from "@/components/home/components/HowItWorksSection";
import { CTASection } from "@/components/home/components/CTASection";
import SponsorsSection from "@/components/home/components/SponsorsSection";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home | Campus Core",
  description: "Welcome to the Campus Core homepage. Discover features, statistics, and more.",
};
export default async function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatisticsSection />
        <HowItWorksSection />
        <SponsorsSection />
        <CTASection />
      </main>
    </>
  );
}
