import { HeroSection } from "@/components/home/components/HeroSection";
import { FeaturesSection } from "@/components/home/components/FeaturesSection";
import { StatisticsSection } from "@/components/home/components/StatisticsSection";
import { HowItWorksSection } from "@/components/home/components/HowItWorksSection";
import { CTASection } from "@/components/home/components/CTASection";
import SponsorsSection from "@/components/home/components/SponsorsSection";

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
