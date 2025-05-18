"use client"
import { useParams } from 'next/navigation'
import React from 'react'

function Profile() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">User Profile</h1>
      <p className="mt-4 text-lg">This is the user profile page for user with ID: {id}</p>
      {/* Add more profile details here */}
    </div>
  )
}

export default Profile