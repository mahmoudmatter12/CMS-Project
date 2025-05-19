"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiRefreshCw, FiBookOpen, FiCalendar, FiPlus } from "react-icons/fi"
import { FaGraduationCap } from "react-icons/fa"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Course, EnrollmentsResponse } from "@/types/types"
import EnrollCourseForm from "@/components/UserEnrollment/enroll-course-form"
import EnrollmentCardSkeleton from "@/components/UserEnrollment/EnrollmentCardSkeleton"
import Link from "next/link"

export default function EnrolledSubjects() {
  // Get the id from the URL parameters
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [enrollmentsData, setEnrollmentsData] = useState<EnrollmentsResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [, setLoadingCourses] = useState(true)

  // Fetch enrolled subjects
  const fetchEnrolledSubjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch(`http://localhost:5168/api/Enrollments/${id}/enrollments`, { cache: "no-store" })

      if (!res.ok) {
        throw new Error("Failed to fetch enrollments")
      }

      if (res.status === 204) {
        setEnrollmentsData({
          message: "No enrollments found for this user.",
          userName: "",
          enrollments: [],
        })
        return
      } else {
        const data: EnrollmentsResponse = await res.json()
        setEnrollmentsData(data)
        console.log("Enrollments data:", data)
      }
      if (!error) {
        toast.success("Enrollments loaded", {
          duration: 2000,
        })
      }
    } catch (error) {
      console.error("Error fetching enrolled subjects:", error)
      setError(error instanceof Error ? error.message : "An error occurred while fetching enrollments")
      toast.error("Failed to load enrollments")
    } finally {
      setLoading(false)
    }
  }

  // Fetch all courses that the user can enroll in
  const fetchCourses = async () => {
    try {
      setLoadingCourses(true)
      const res = await fetch(`http://localhost:5168/api/Users/${id}/available-courses`, { cache: "no-store" })
      if (!res.ok) {
        throw new Error("Failed to fetch available courses")
      }
      const data: Course[] = await res.json()
      setCourses(data)
    } catch (error) {
      console.error("Error fetching available courses:", error)
      toast.error("Failed to load available courses")
    } finally {
      setLoadingCourses(false)
    }
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchEnrolledSubjects()
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // Handle refresh action
  const refresh = async () => {
    setRefreshing(true)
    await Promise.all([fetchEnrolledSubjects(), fetchCourses()])
    setRefreshing(false)
  }

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-r from-indigo-900/40 to-indigo-700/20 p-6 rounded-xl border border-indigo-700/30 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-500/20 p-4 rounded-xl">
            <FaGraduationCap className="text-indigo-400 text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Enrolled Subjects</h1>
            <p className="text-gray-400 mt-1">
              {enrollmentsData ? `Welcome, ${enrollmentsData.userName}` : "View all your course enrollments"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={refresh}
                  variant="outline"
                  size="sm"
                  disabled={refreshing}
                  className="gap-2 bg-indigo-500 border-indigo-700 hover:bg-indigo-700/20"
                >
                  <FiRefreshCw className={`${refreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh enrollments</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Add Enrollment Form */}
          <EnrollCourseForm onSuccess={fetchEnrolledSubjects} refresh={fetchCourses} courses={courses}  />
        </div>
      </div>

      {/* Stats Section */}
      {!loading && enrollmentsData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Enrollments</p>
                  <p className="text-3xl font-bold text-white mt-1">{enrollmentsData.enrollments?.length || 0}</p>
                </div>
                <div className="bg-indigo-500/20 p-3 rounded-full">
                  <FiBookOpen className="text-indigo-400 text-xl" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Latest Enrollment</p>
                  <p className="text-xl font-bold text-green-400 mt-1">
                    {enrollmentsData.enrollments && enrollmentsData.enrollments.length > 0
                      ? formatDate(
                        enrollmentsData.enrollments.sort(
                          (a, b) => new Date(b.enrollDate).getTime() - new Date(a.enrollDate).getTime(),
                        )[0].enrollDate,
                      )
                      : "N/A"}
                  </p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-full">
                  <FiCalendar className="text-green-400 text-xl" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Content Area */}
      <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white">Course Enrollments</CardTitle>
            <CardDescription>All your enrolled courses and their enrollment dates</CardDescription>
          </div>
          <div className="hidden sm:block">
            <EnrollCourseForm onSuccess={fetchEnrolledSubjects} refresh={fetchCourses} courses={courses} />
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <EnrollmentCardSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="bg-red-500/10 text-red-400 p-4 rounded-lg inline-block mb-4">
                  <FiRefreshCw className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Failed to load enrollments</h3>
                <p className="text-gray-400 mb-4">{error}</p>
                <Button onClick={fetchEnrolledSubjects} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : enrollmentsData && enrollmentsData.enrollments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrollmentsData.enrollments.map((enrollment, index) => (
                  <motion.div
                    key={enrollment.enrollmentId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 hover:border-indigo-600/50 transition-all duration-300 h-full">
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-indigo-500/20 p-2.5 rounded-lg flex-shrink-0">
                            <FiBookOpen className="text-indigo-400 text-lg" />
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 ml-auto"
                          >
                            Active
                          </Badge>
                        </div>

                        <h3 className="text-lg font-medium text-white mb-2 line-clamp-2">{enrollment.courseName}</h3>

                        <div className="mt-auto pt-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <Badge variant="outline" className="font-mono bg-gray-700/50 text-gray-300">
                              ID: {enrollment.courseId.substring(0, 8)}...
                            </Badge>

                            <div className="flex items-center gap-1 text-sm text-gray-400">
                              <FiCalendar className="h-3.5 w-3.5" />
                              <span>{formatDate(enrollment.enrollDate)}</span>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-4 border-indigo-700 hover:bg-indigo-700/30 hover:text-indigo-300 transition-all duration-300"
                          >
                            <Link href={`/user/dashboard/enrollments/${id}/details/${enrollment.enrollmentId}`}
                              className="flex items-center gap-2">
                              <FiBookOpen className="mr-2" />
                              <span className="hidden sm:inline">View Details</span>
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              enrollmentsData &&
              enrollmentsData.enrollments.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-indigo-500/10 p-6 rounded-full inline-block mb-4">
                    <FiBookOpen className="text-indigo-400 text-3xl" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">No enrollments found</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    {enrollmentsData.message === "No enrollments found for this user."
                      ? "You are not currently enrolled in any courses. Start your learning journey by enrolling in a course below."
                      : enrollmentsData.message || "No course enrollments available."}
                  </p>
                  <EnrollCourseForm onSuccess={fetchEnrolledSubjects} refresh={fetchCourses} courses={courses} />
                </div>
              )
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <EnrollCourseForm onSuccess={fetchEnrolledSubjects} refresh={fetchCourses} courses={courses}>
            <Button size="lg" className="rounded-full w-14 h-14 bg-indigo-600 hover:bg-indigo-700 shadow-lg">
              <FiPlus size={24} />
            </Button>
          </EnrollCourseForm>
        </motion.div>
      </div>
    </div>
  )
}

