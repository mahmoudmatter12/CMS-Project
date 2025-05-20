import { HeroSection } from "@/components/home/components/HeroSection";
import { FeaturesSection } from "@/components/home/components/FeaturesSection";
import { StatisticsSection } from "@/components/home/components/StatisticsSection";
import { HowItWorksSection } from "@/components/home/components/HowItWorksSection";
// import { PartnersSection } from "@/components/home/components/PartnersSection";
import { CTASection } from "@/components/home/components/CTASection";
import { TeamSection } from "@/components/home/components/TeamSection";

export default async function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatisticsSection />
        <HowItWorksSection />
        <TeamSection />
        <CTASection />
      </main>
    </>
  );
}
