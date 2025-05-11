import type React from "react"

interface LandingPageProps {
  children: React.ReactNode
}

function Landing({ children }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-2/3 left-1/3 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {children}
    </div>
  )
}

export default Landing
