"use client"
import { Button } from '@/components/ui/button'
import {
  SignedIn,
  SignedOut,
  useUser
} from '@clerk/nextjs'
import Link from 'next/link'
import Authbtns from './authbtns'

export function HeroSection() {
  const { isLoaded, user } = useUser()
  return (
    <section className="py-20 px-4 mt-10">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Manage Your College <span className="text-cyan-400">Effortlessly</span>
        </h1>

        <h2 className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
          A unified platform for students, teachers, and administrators to streamline enrollment, assignments, and
          academic tracking.
        </h2>
        {!isLoaded && (
          <section className="py-15 px-4 mt-10">
            <div className="container mx-auto text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto mb-6"></div>
                <div className="flex gap-4 justify-center">
                  <div className="h-10 bg-gray-700 rounded w-24"></div>
                  <div className="h-10 bg-gray-700 rounded w-24"></div>
                </div>
              </div>
            </div>
          </section>
        )}
        <SignedIn>
          {user?.publicMetadata?.role === "Admin" && (
            <p className="text-lg text-gray-300 mb-10">
              Welcome back, {user.fullName || "Admin"}! You have admin access to manage the college system.
            </p>
          )}
          {user?.publicMetadata?.role === "Student" && (
            <p className="text-lg text-gray-300 mb-10">
              Welcome back, {user.firstName || "Student"}! You have student access to manage your courses and assignments.
            </p>
          )}
          {user?.publicMetadata?.role === "Teacher" && (
            <p className="text-lg text-gray-300 mb-10">
              Welcome back, {user.firstName || "Teacher"}! You have teacher access to manage your courses and students.
            </p>
          )}
          {!user?.publicMetadata?.role && (
            <p className="text-lg text-gray-300 mb-10">
              Welcome back {user?.fullName}! Explore your dashboard to get started.
            </p>
          )}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard">
              <Button variant="default" className="bg-sky-600 hover:bg-sky-700">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="text-sky-600 hover:text-white hover:bg-sky-600/40">
                Learn More
              </Button>
            </Link>
          </div>
        </SignedIn>

        <SignedOut>
          <p className="text-lg text-gray-300 mb-10">
            Join us today and take control of your academic journey!
          </p>
          <Authbtns />
        </SignedOut>
      </div>
    </section>
  )
}