"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useAnimationControls, useInView } from "framer-motion"
import Image from "next/image"

interface InfiniteMovingCardsProps {
  items: {
    name: string
    logo: string
  }[]
  direction?: "left" | "right"
  speed?: number
  pauseOnHover?: boolean
  className?: string
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = 20,
  pauseOnHover = true,
  className = "",
}: InfiniteMovingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [duplicates, setDuplicates] = useState(2)
  const controls = useAnimationControls()
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })

  // Measure container width and calculate duplicates needed
  useEffect(() => {
    if (containerRef.current) {
      const calculateWidth = () => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth
          setContainerWidth(containerWidth)

          // Calculate how many duplicates we need to fill the screen width plus buffer
          const itemsWidth = items.reduce((acc, ) => acc + 180 + 64, 0) // width + margin
          const duplicatesNeeded = Math.ceil((containerWidth * 2) / itemsWidth) + 1
          setDuplicates(duplicatesNeeded)
        }
      }

      calculateWidth()
      window.addEventListener("resize", calculateWidth)
      return () => window.removeEventListener("resize", calculateWidth)
    }
  }, [items, containerRef])

  // Start animation when in view
  useEffect(() => {
    if (isInView) {
      controls.start({
        x: direction === "left" ? [0, -containerWidth / duplicates] : [-containerWidth / duplicates, 0],
        transition: {
          x: {
            duration: speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            repeatType: "loop",
          },
        },
      })
    } else {
      controls.stop()
    }
  }, [isInView, containerWidth, direction, speed, controls, duplicates])

  // Pause animation on hover if enabled
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      controls.stop()
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover && isInView) {
      controls.start({
        x: direction === "left" ? [0, -containerWidth / duplicates] : [-containerWidth / duplicates, 0],
        transition: {
          x: {
            duration: speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            repeatType: "loop",
          },
        },
      })
    }
  }

  // Create duplicated array for seamless looping
  const duplicatedItems = React.useMemo(() => {
    return Array(duplicates).fill(items).flat()
  }, [items, duplicates])

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className="flex items-center" animate={controls}>
        {duplicatedItems.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="flex-shrink-0 w-[180px] mx-8 flex items-center justify-center group"
          >
            <div className="relative transition-all duration-300 transform group-hover:scale-110">
              <Image
                src={item.logo || "/placeholder.svg"}
                alt={item.name}
                width={180}
                height={60}
                className="opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:via-emerald-500/5 group-hover:to-emerald-500/10 rounded-lg transition-all duration-300" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-900 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-900 to-transparent z-10" />
    </div>
  )
}
