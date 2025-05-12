"use client"
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Authbtns from './authbtns'
import CompleteProfileMainForm from '@/components/onboarding/CompleteProfileMainForm'
import { motion } from 'framer-motion'
import { TypewriterEffectSmooth } from '@/components/ui/AceternityUi/typewriter-effect'
export function HeroSection() {
  const { isLoaded, user } = useUser()

  const words = [
    { text: "Manage", className: "text-white" },
    { text: "Your", className: "text-white" },
    { text: "College", className: "text-cyan-400" },
    { text: "Effortlessly", className: "text-white" },
  ]

  const roleMessages = {
    Admin: `Welcome back, ${user?.fullName || "Admin"}! You have admin access to manage the college system.`,
    Student: `Welcome back, ${user?.firstName || "Student"}! Ready to ace your courses?`,
    Teacher: `Welcome back, ${user?.firstName || "Professor"}! Let's inspire some minds today.`,
    Default: `Welcome back ${user?.fullName}! Explore your dashboard to get started.`
  }

  const dashboardRoutes = {
    Admin : "/admin/dashboard",
    Student : "/user/dashboard",
    Teacher : "/teacher/dashboard",
  }

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-4">
      {/* Animated Background Elements */}

      <div className="container relative z-10 mx-auto text-center">

        <div className="flex flex-col items-center">
          <div className="mb-10 ">
            <TypewriterEffectSmooth words={words} className="text-center" />
          </div>
        </div>

        <motion.h2
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          A unified platform for students, teachers, and administrators to streamline enrollment, assignments, and academic tracking.
        </motion.h2>

        {!isLoaded && (
          <div className="animate-pulse max-w-md mx-auto">
            <div className="h-8 bg-gray-800 rounded-full w-3/4 mx-auto mb-6"></div>
            <div className="flex gap-4 justify-center">
              <div className="h-12 bg-gray-800 rounded-full w-32"></div>
              <div className="h-12 bg-gray-800 rounded-full w-32"></div>
            </div>
          </div>
        )}

        <SignedIn>
          {/* Role-based Welcome Message */}
          <motion.p
            className="text-lg text-cyan-200 mb-10 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {user?.publicMetadata?.role === "Admin" && roleMessages.Admin}
            {user?.publicMetadata?.Role === "Student" && roleMessages.Student}
            {user?.publicMetadata?.Role === "Teacher" && roleMessages.Teacher}
            {!user?.publicMetadata?.Role && roleMessages.Default}
          </motion.p>

          {/* Onboarding Flow */}
          {!user?.publicMetadata?.IsBoarded && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <CompleteProfileMainForm />
            </motion.div>
          )}

          {/* Dashboard Access */}
          {user?.publicMetadata?.IsBoarded === true && (
            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link href={dashboardRoutes[user?.publicMetadata?.Role as keyof typeof dashboardRoutes] || "/dashboard"}>
                <Button
                  variant="default"
                  className="bg-gradient-to-r cursor-pointer from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40"
                >
                  Go to Dashboard
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="text-cyan-400 border-cyan-400 bg-gray-900/60 hover:bg-cyan-400/50 cursor-pointer hover:text-cyan-400 rounded-full px-8 py-6 text-lg font-semibold transition-all"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          )}
        </SignedIn>

        <SignedOut>
          <motion.p
            className="text-lg text-cyan-200 mb-10 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Join us today and take control of your academic journey!
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Authbtns />
          </motion.div>
        </SignedOut>
      </div>

      {/* Decorative Elements */}
    </section>
  )
}