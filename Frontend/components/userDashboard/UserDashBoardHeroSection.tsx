'use client'
import React from 'react'
import { useCurrentUser } from "@/lib/hooks/UseUser";

function UserDashBoardHeroSection() {
  const { user } = useCurrentUser();

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome back, <span className="text-sky-400">{user?.fullname}</span>!
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Heres whats happening with your academics
        </p>
      </div>

    </>
  )
}

export default UserDashBoardHeroSection