"use client"

import type React from "react"
import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface BtnProps {
  children: React.ReactNode
  type?: "fill" | "out_line"
  className?: string
  onClick?: () => void
}

function Btn({ children, type = "fill", className, onClick }: BtnProps) {
  // Memoize the class names to prevent unnecessary recalculations
  const buttonClasses = useMemo(
    () =>
      cn(
        "rounded-lg font-medium transition-all duration-200 flex items-center justify-center",
        type === "fill"
          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90"
          : "border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10",
        className,
      ),
    [type, className],
  )

  return (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClick} className={buttonClasses}>
      {children}
    </motion.button>
  )
}

export default Btn
