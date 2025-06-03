import React from 'react'
import {HeroSection} from './components/HeroSection'
import { FeaturesSection } from './components/FeaturesSection'
import {HowItWorksSection} from './components/HowItWorksSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import {StatisticsSection} from './components/StatisticsSection'
import { CTASection } from './components/CTASection'
import SponsorsSection from './components/SponsorsSection'

const Landing = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatisticsSection />
      <TestimonialsSection />
      <SponsorsSection />
      <CTASection />
    </div>
  )
}

export default Landing
