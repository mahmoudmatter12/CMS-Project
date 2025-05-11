'use client'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { toast } from "sonner"
import Image from 'next/image'

interface Department {
  id: string
  name: string
}

export default function OnboardingForm() {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    fullName: '',
    departmentId: '',
    studentCollageId: '',
    profilePicture: user?.imageUrl || '',
  })

  // Fetch departments on mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:5168/api/Department')
        const data = await response.json()
        setDepartments(data)
      } catch (error) {
        console.error('Failed to fetch departments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDepartments()
  }, [])

  // Auto-fill form with Clerk user data
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || prev.fullName,
        profilePicture: user.imageUrl || prev.profilePicture,
      }))
    }
  }, [isLoaded, isSignedIn, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isSignedIn || !user) {
      toast.error('You must be signed in to complete onboarding')
      return
    }

    try {
      const response = await fetch('http://localhost:5168/api/Auth/ClerkRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.primaryEmailAddress?.emailAddress,
          fullName: formData.fullName,
          departmentId: formData.departmentId,
          profilePicture: formData.profilePicture,
          clerkId: user.id,
          studentCollageId: formData.studentCollageId,
          IsBoarded: true,
        }),
      })

      console.log('Onboarding response:', response) // Debugging line

      if (!response.ok) {
        toast.error('Failed to complete onboarding' + response.statusText)
      }

      const data = await response.json()
      console.log('Onboarding successful:', data)
      toast.success('Onboarding completed successfully!')
      router.push('/') // Redirect to dashboard after success
    } catch (error) {
      console.error('Onboarding failed:', error)
      toast.error(error instanceof Error ? error.message : 'Onboarding failed')
    }
  }

  if (!isLoaded || loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!isSignedIn) {
    router.push('/sign-in')
    return null
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Picture Preview */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
            <Image
              src={formData.profilePicture || '/default-avatar.png'}
              alt="Profile"
              className="w-full h-full object-cover"
              width={96}
              height={96}
            />
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            required
          />
        </div>

        {/* Department Selection */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            id="department"
            value={formData.departmentId}
            onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            required
          >
            <option value="">Select your department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Student College ID */}
        <div>
          <label htmlFor="studentCollageId" className="block text-sm font-medium text-gray-700">
            Student ID
          </label>
          <input
            type="text"
            id="studentCollageId"
            value={formData.studentCollageId}
            onChange={(e) => setFormData({...formData, studentCollageId: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  )
}

