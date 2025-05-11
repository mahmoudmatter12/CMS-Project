import { AboutHero } from "@/components/about/AboutHero"
import { OurStory } from "@/components/about/OurStory"
import { TestimonialsSection } from "@/components/about/TestimonialsSection"
import { DevelopersSection } from "@/components/about/DevelopersSection"

export default function AboutPage() {
  return (
    <>
      <main>
        <AboutHero />
        <OurStory />
        <TestimonialsSection />
        <DevelopersSection />
      </main>
    </>
  )
}
