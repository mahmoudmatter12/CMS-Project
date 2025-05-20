import { AboutHero } from "@/components/about/AboutHero"
import { OurStory } from "@/components/about/OurStory"
import { TestimonialsSection } from "@/components/about/TestimonialsSection"
import { DevelopersSection } from "@/components/about/DevelopersSection"
import { MissionSection } from "@/components/about/MissionSection"
import { FeaturesSection } from "@/components/home/components/FeaturesSection"

export default function AboutPage() {
  return (
    <>
      <main>
        <AboutHero />
        <MissionSection></MissionSection>
        <OurStory />
        <FeaturesSection/>
        <TestimonialsSection />
        <DevelopersSection />
      </main>
    </>
  )
}
