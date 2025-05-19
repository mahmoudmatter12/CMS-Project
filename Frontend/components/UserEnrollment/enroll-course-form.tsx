"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { FiPlus, FiBookOpen, FiRefreshCw } from "react-icons/fi"
import type { Course, EnrollmentRequest, EnrollmentResponse } from "@/types/types"

interface EnrollmentFormProps {
  onSuccess: () => void
  refresh: () => void
  courses: Course[]
  children?: React.ReactNode
}

export default function EnrollCourseForm({ onSuccess, refresh, courses, children }: EnrollmentFormProps) {
  const { id } = useParams<{ id: string }>()
  const [isOpen, setIsOpen] = useState(false)
  const [enrolling, setEnrolling] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  // Refresh courses when dialog opens
  
  useEffect(() => {
    if (refreshing ) {
      setLoading(true)
      refresh()
      setLoading(false)
      setRefreshing(false)
    }
  }
  , [refreshing, refresh])
  


  // Handle course enrollment
  const enrollCourse = async (courseId: string) => {
    if (!courseId) return

    setEnrolling(true)
    try {
      const enrollmentRequest: EnrollmentRequest = {
        userId: id as string,
        courseId: courseId,
      }

      const response = await fetch("http://localhost:5168/api/Enrollments/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollmentRequest),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.message) {
          toast.error(errorData.message)
        } else {
          toast.error("Failed to enroll in course")
        }
        return
      }

      const data: EnrollmentResponse = await response.json()

      if (data.success) {
        toast.success(data.message || "Successfully enrolled in course")
        setIsOpen(false)
        onSuccess()
      } else {
        toast.error(data.message || "Failed to enroll in course")
      }
    } catch (err) {
      console.error("Error enrolling in course:", err)
      toast.error(err instanceof Error ? err.message : "Failed to enroll in course")
    } finally {
      setEnrolling(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      setLoading(true)
      refresh()
      setLoading(false)
    } else {
      setSelectedCourseId(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
            <FiPlus size={16} />
            Enroll in Course
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-gray-900/80 backdrop-blur-sm border-gray-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <FiBookOpen size={20} />
            Enroll in New Course
          </DialogTitle>
          <DialogDescription>
            Select a course to enroll in. You can only enroll in courses that are available to you.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-2">
              <Button variant="outline" size="sm" onClick={refresh} className="gap-2 bg-indigo-500 hover:bg-indigo-700 border-gray-700">
                <FiRefreshCw size={14} />
                Refresh Courses
              </Button>
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {courses.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="bg-gray-800/50 p-6 rounded-full inline-block mb-4">
                      <FiBookOpen className="text-gray-400 text-3xl" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No courses available</h3>
                    <p className="text-gray-400">There are no courses available for enrollment at this time.</p>
                  </div>
                ) : (
                  courses.map((course) => {
                    const isSelected = selectedCourseId === course.id

                    return (
                      <Card
                        key={course.id}
                        className={`bg-gray-800/50 border ${
                          isSelected ? "border-indigo-500" : "border-gray-700 hover:border-indigo-500/50"
                        } transition-all cursor-pointer`}
                        onClick={() => setSelectedCourseId(isSelected ? null : course.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="font-mono bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                              >
                                {course.courseCode}
                              </Badge>
                              <Badge
                                variant={course.isOpen ? "outline" : "secondary"}
                                className={
                                  course.isOpen
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                                }
                              >
                                {course.isOpen ? "Open" : "Closed"}
                              </Badge>
                            </div>
                          </div>

                          <h3 className="text-lg font-medium text-white mb-1">{course.name}</h3>
                          <p className="text-sm text-gray-400 mb-3">Department: {course.depName}</p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline" className="bg-gray-700/50 text-gray-300">
                              {course.creditHours} Credit Hours
                            </Badge>
                            <Badge variant="outline" className="bg-gray-700/50 text-gray-300">
                              Semester {course.semester}
                            </Badge>
                          </div>

                          {course.prerequisiteCourseIds && course.prerequisiteCourseIds.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm text-gray-400 mb-2">Prerequisites:</p>
                              <div className="flex flex-wrap gap-2">
                                {course.prerequisiteCourseIds.map((prereqId, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="bg-amber-500/20 text-amber-400 border-amber-500/30"
                                  >
                                    {course.prerequisiteCourseNames?.[index] || prereqId}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </div>
            </ScrollArea>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-700">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="bg-indigo-600 border-gray-70 hover:bg-indigo-700">
                Cancel
              </Button>
              <Button
                onClick={() => selectedCourseId && enrollCourse(selectedCourseId)}
                disabled={!selectedCourseId || enrolling}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {enrolling ? (
                  <>
                    <span className="animate-spin mr-2">↻</span> Enrolling...
                  </>
                ) : (
                  "Enroll in Course"
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Skeleton loader for course cards
function CourseCardSkeleton() {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>

        <Skeleton className="h-6 w-3/4 mb-1" />
        <Skeleton className="h-4 w-1/2 mb-3" />

        <div className="flex gap-2 mb-3">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>

        <Skeleton className="h-4 w-1/3 mb-2" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}
