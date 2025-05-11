import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ButtonLinkProps {
  href: string
  children: React.ReactNode
  type?: "primary" | "secondary"
  className?: string
  underline?: boolean
}

function ButtonLink({ href, children, type = "primary", className, underline = true }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "transition-colors duration-200",
        type === "primary" ? "text-blue-500 hover:text-blue-700" : "text-gray-400 hover:text-gray-200",
        underline ? "underline" : "no-underline",
        className,
      )}
    >
      {children}
    </Link>
  )
}

export default ButtonLink
