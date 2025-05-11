"use client"

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { useMemo } from "react"

export function PartnersSection() {
  const partners = useMemo(
    () => [
      { name: "University of Technology", logo: "/placeholder.svg?height=60&width=180" },
      { name: "Global Education Alliance", logo: "/placeholder.svg?height=60&width=180" },
      { name: "Academic Research Institute", logo: "/placeholder.svg?height=60&width=180" },
      { name: "International School Network", logo: "/placeholder.svg?height=60&width=180" },
      { name: "Education Technology Association", logo: "/placeholder.svg?height=60&width=180" },
      { name: "Learning Innovation Foundation", logo: "/placeholder.svg?height=60&width=180" },
    ],
    [],
  )

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Trusted by Leading Institutions
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6 rounded-full" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            We partner with educational institutions worldwide to transform their administrative processes and enhance
            learning outcomes.
          </p>
        </div>

        <div className="relative w-full">
          {/* First row - left to right */}
          <InfiniteMovingCards items={partners} direction="left" speed={10} className="py-4" />

        </div>
      </div>
    </section>
  )
}
