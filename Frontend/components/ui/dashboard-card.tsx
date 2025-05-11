import { cn } from "@/lib/utils"
import Link from "next/link"
import type { ReactNode } from "react"

interface DashboardCardProps {
  title: string
  value: string | number
  icon: ReactNode
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  href?: string
}

export function DashboardCard({ title, value, icon, description, trend, className, href }: DashboardCardProps) {
  const CardWrapper = ({ children }: { children: ReactNode }) => {
    if (href) {
      return (
        <Link href={href} className="block w-full h-full">
          {children}
        </Link>
      )
    }
    return <>{children}</>
  }

  return (
    <CardWrapper>
      <div
        className={cn(
          "bg-white/5 rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all",
          href && "hover:bg-white/10 cursor-pointer",
          className,
        )}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
          <div className="p-2 bg-gray-800/50 rounded-lg text-cyan-400">{icon}</div>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <span className={cn("text-xs font-medium", trend.isPositive ? "text-green-500" : "text-red-500")}>
              {trend.isPositive ? "+" : "-"}
              {trend.value}%
            </span>
          )}
        </div>
        {description && <p className="mt-1 text-xs text-gray-400">{description}</p>}
      </div>
    </CardWrapper>
  )
}
