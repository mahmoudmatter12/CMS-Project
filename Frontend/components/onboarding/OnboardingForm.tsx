'use client'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { toast } from "sonner"
import Image from 'next/image'
import { userLeve } from '@/types/types'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { onboardingSchema } from '@/lib/schemas/onboarding'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { SparklesCore } from '../ui/AceternityUi/sparkles'

interface Department {
  id: string
  name: string
}

const formFields = [
  {
    name: "fullName",
    label: "Full Name",
    placeholder: "Enter your full name",
    type: "input"
  },
  {
    name: "departmentId",
    label: "Department",
    placeholder: "Select your department",
    type: "select"
  },
  {
    name: "studentCollageId",
    label: "Student ID",
    placeholder: "Enter your student ID",
    type: "input"
  },
  {
    name: "level",
    label: "Academic Level",
    placeholder: "Select your level",
    type: "select"
  }
]

export function OnboardingModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [imagePreview, setImagePreview] = useState(user?.imageUrl || '')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [imgurl, setimgurl] = useState(user?.imageUrl || '')

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: '',
      departmentId: '',
      studentCollageId: '',
      level: '',
      profilePicture: user?.imageUrl || '',
    },
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
      form.reset({
        fullName: user.fullName || '',
        profilePicture: user.imageUrl || '',
      })
      setImagePreview(user.imageUrl || '')
    }
  }, [isLoaded, isSignedIn, user, form])

  // const uploadToCloudinary = async (file: File) => {
  //   setIsUploading(true)
  //   setUploadProgress(0)

  //   try {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     const base64Image = reader.result?.toString().split(',')[1]

  //     const response = await fetch('/api/upload', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ image: `data:image/jpeg;base64,${base64Image}` }),
  //     })

  //     if (!response.ok) {
  //       throw new Error('Upload failed')
  //     }

  //     const data = await response.json()
  //     return data.secure_url
  //   } finally {
  //     setIsUploading(false)
  //     setUploadProgress(0)
  //   }
  // }

  const uploadToCloudinary = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)
    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      return new Promise<string>((resolve, reject) => {
        reader.onloadend = async () => {
          const base64Image = reader.result?.toString().split(',')[1]

          if (!base64Image) {
            reject('Failed to convert image to base64')
            return
          }

          try {
            const response = await fetch('/api/upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ image: `data:image/jpeg;base64,${base64Image}` }),
            })

            const data = await response.json()

            if (!response.ok) {
              reject(data.error || 'Upload failed')
              return
            }
            setimgurl(data.secure_url)
            resolve(data.secure_url)
          } catch (error) {
            reject(error)
          }
        }
        reader.onerror = () => {
          reject('Failed to read file')
        }
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      // Show preview immediately
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)

      // Start upload
      const imageUrl = await uploadToCloudinary(file)
      form.setValue('profilePicture', imageUrl)
      toast.success('Profile picture updated successfully!')
    } catch (error) {
      console.error('Upload failed:', error)
      toast.error('Failed to upload image. Please try again.')
      // Revert to previous image if upload fails
      setImagePreview(user?.imageUrl || '')
    }
  }

  const onSubmit = async (values: z.infer<typeof onboardingSchema>) => {
    if (!isSignedIn || !user) {
      toast.error('You must be signed in to complete onboarding')
      return
    }

    const userObject = {
      email: user.primaryEmailAddress?.emailAddress,
      ...values,
      clerkId: user.id,
      IsBoarded: true,
      role: 'Student',
      profilePicture: imgurl,
    }
    console.log('User Object:', userObject)

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObject),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete onboarding')
      }

      toast.success('Onboarding completed successfully!')
      onOpenChange(false)
      window.location.reload()
    } catch (error) {
      console.error('Onboarding failed:', error)
      toast.error(error instanceof Error ? error.message : 'Onboarding failed')
    }
  }

  if (!isLoaded || loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-cyan-500">Loading your information...</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!isSignedIn) {
    router.push('/sign-in')
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-0 bg-transparent">
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={20}
            className="absolute inset-0 pointer-events-none"
            particleColor="#06B6D4"
          />

          <div className="relative z-10 p-8">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-sky-500 bg-clip-text text-transparent">
                Complete Your Profile
              </DialogTitle>
              <DialogDescription className="text-center text-sky-400/80 mt-2">
                Lets get you started on your academic journey
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-sky-500/30 shadow-lg">
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          width={128}
                          height={128}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}

                      {isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="w-16 h-1 bg-gray-300 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-cyan-500 transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                      <Label
                        htmlFor="profile-upload"
                        className={cn(
                          "px-4 py-2 rounded-full text-xs font-medium cursor-pointer transition-all",
                          "bg-sky-600 hover:bg-sky-700 text-white",
                          "flex items-center gap-1"
                        )}
                      >
                        {isUploading ? (
                          <>
                            <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Change Photo
                          </>
                        )}
                      </Label>
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {formFields.map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <FormField
                        control={form.control}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        name={field.name as any}
                        render={({ field: formField }) => (
                          <FormItem>
                            <FormLabel className="text-sky-400/90 text-sm font-medium">
                              {field.label}
                            </FormLabel>
                            {field.type === 'input' ? (
                              <FormControl>
                                <Input
                                  placeholder={field.placeholder}
                                  {...formField}
                                  className="bg-gray-800/50 border-gray-700 focus:border-sky-500 focus:ring-sky-500/20"
                                />
                              </FormControl>
                            ) : (
                              <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-gray-800/50 border-gray-700 focus:ring-sky-500/20">
                                    <SelectValue placeholder={field.placeholder} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-gray-900 border-gray-700">
                                  {(field.name === 'departmentId' ? departments : Object.values(userLeve)).map((item) => (
                                    <SelectItem
                                      key={typeof item === 'string' ? item : item.id}
                                      value={typeof item === 'string' ? item : item.id}
                                      className="hover:bg-gray-800 focus:bg-gray-800"
                                    >
                                      {typeof item === 'string' ? item : item.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            <FormMessage className="text-rose-400" />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: formFields.length * 0.1 }}
                >
                  <Button
                    type="submit"
                    className={cn(
                      "w-full py-6 rounded-xl font-medium text-white",
                      "bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700",
                      "shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40",
                      "transition-all duration-300",
                      "relative overflow-hidden"
                    )}
                    disabled={isUploading}
                  >
                    <span className="relative z-10">Complete Registration</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-sky-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                </motion.div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}