"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FiArrowLeft,
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiUser,
  FiMail,
  FiFileText,
  FiRefreshCw,
  FiAlertTriangle,
} from "react-icons/fi"
import { FaGraduationCap } from "react-icons/fa"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { UserEnrollmentInterFace } from "@/types/types"
import { InstructorProfileCard } from "@/components/UserEnrollment/instructor-profile-card"

export default function EnrollmentDetailsPage() {
  const router = useRouter()
  const { id, enrollmentId } = useParams<{ id: string; enrollmentId: string }>()
  const [enrollmentDetails, setEnrollmentDetails] = useState<UserEnrollmentInterFace | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEnrollmentDetails = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`http://localhost:5168/api/Users/user/${id}/enrollment/${enrollmentId}`, {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch enrollment details (Status: ${response.status})`)
      }

      const data: UserEnrollmentInterFace = await response.json()
      setEnrollmentDetails(data)
      toast.success("Enrollment details loaded", {
        description: `Details for ${data.courseName} loaded successfully`,
        duration: 3000,
      })
    } catch (err) {
      console.error("Error fetching enrollment details:", err)
      setError(err instanceof Error ? err.message : "An error occurred while fetching enrollment details")
      toast.error("Failed to load enrollment details")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEnrollmentDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Format date function
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not scheduled"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Format duration in minutes to hours and minutes
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours} hour${hours > 1 ? "s" : ""}${remainingMinutes > 0 ? ` ${remainingMinutes} min` : ""}`
  }

  // Check if a quiz is upcoming, active, or past
  const getQuizStatus = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) return "Not scheduled"

    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (now < start) return "upcoming"
    if (now > end) return "past"
    return "active"
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
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-indigo-300 hover:text-indigo-100 hover:bg-indigo-800/30"
                onClick={() => router.back()}
              >
                <FiArrowLeft className="h-5 w-5" />
                <span className="sr-only">Go back</span>
              </Button>
              <h1 className="text-2xl font-bold text-white">Enrollment Details</h1>
            </div>
            <p className="text-gray-400 mt-1">
              {loading
                ? "Loading enrollment information..."
                : enrollmentDetails?.courseName
                  ? `${enrollmentDetails.courseCode} - ${enrollmentDetails.courseName}`
                  : "Enrollment information"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={fetchEnrollmentDetails}
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  className="gap-2 border-indigo-700 hover:bg-indigo-700/20"
                >
                  <FiRefreshCw className={`${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh enrollment details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <EnrollmentDetailsSkeleton />
          </motion.div>
        ) : error ? (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm overflow-hidden">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <div className="bg-red-500/10 text-red-400 p-4 rounded-lg inline-block mb-4">
                    <FiAlertTriangle className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Failed to load enrollment details</h3>
                  <p className="text-gray-400 mb-4 max-w-md mx-auto">{error}</p>
                  <Button
                    onClick={fetchEnrollmentDetails}
                    variant="outline"
                    className="border-indigo-700 hover:bg-indigo-700/20"
                  >
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : enrollmentDetails ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-gray-800/50 border-gray-700">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-indigo-700/30 data-[state=active]:text-indigo-100"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="quizzes"
                  className="data-[state=active]:bg-indigo-700/30 data-[state=active]:text-indigo-100"
                >
                  Quizzes{" "}
                  {enrollmentDetails.quizMetaData && enrollmentDetails.quizMetaData.length > 0 && (
                    <Badge className="ml-2 bg-indigo-500/30 text-indigo-300 border-none">
                      {enrollmentDetails.quizMetaData.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4 space-y-4">
                {/* Course Information */}
                <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-500/20 p-2.5 rounded-lg">
                        <FiBookOpen className="text-indigo-400 text-lg" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">Course Information</CardTitle>
                        <CardDescription>Details about the enrolled course</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Course Name</h3>
                          <p className="text-lg font-medium text-white">{enrollmentDetails.courseName}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Course Code</h3>
                          <Badge
                            variant="outline"
                            className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-sm font-mono"
                          >
                            {enrollmentDetails.courseCode}
                          </Badge>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Department</h3>
                          <p className="text-white">{enrollmentDetails.depName}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Semester</h3>
                          <Badge variant="outline" className="bg-gray-700/50 text-gray-300">
                            Semester {enrollmentDetails.semester}
                          </Badge>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Credit Hours</h3>
                          <Badge variant="outline" className="bg-gray-700/50 text-gray-300">
                            {enrollmentDetails.creditHours} Credit Hours
                          </Badge>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Department Head</h3>
                          <p className="text-white">{enrollmentDetails.hodName || "Not specified"}</p>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-700/50" />


                    {/* Instructor Information - Using the new component */}
                    <InstructorProfileCard
                      instructorName={enrollmentDetails.instructorName}
                      instructorEmail={enrollmentDetails.instructorEmail}
                      instructorImg={enrollmentDetails.instructorImg}
                      courseName={enrollmentDetails.courseName}
                      studentName={enrollmentDetails.studentName}
                      studentEmail={enrollmentDetails.studentEmail}
                    />

                    {/* Student Information */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                        <FiUser className="text-indigo-400" />
                        Student Information
                      </h3>

                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="bg-indigo-500/10 p-3 rounded-full">
                            <FaGraduationCap className="text-indigo-400 text-xl" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-white font-medium">{enrollmentDetails.studentName}</h4>
                            {enrollmentDetails.studentEmail && (
                              <div className="flex items-center gap-2 text-gray-400">
                                <FiMail className="text-indigo-400" size={14} />
                                <span>{enrollmentDetails.studentEmail}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>


                  </CardContent>
                  <CardFooter className="border-t border-gray-700/50 bg-gray-800/30 flex justify-between">
                    <div className="text-sm text-gray-400">
                      <span>Course ID: </span>
                      <Badge variant="outline" className="font-mono bg-gray-700/50 text-gray-300">
                        {enrollmentDetails.courseId.substring(0, 8)}...
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-indigo-700 hover:bg-indigo-700/20"
                      onClick={() => router.back()}
                    >
                      <FiArrowLeft className="mr-2 h-4 w-4" />
                      Back to Enrollments
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="quizzes" className="mt-4 space-y-4">
                <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-500/20 p-2.5 rounded-lg">
                        <FiFileText className="text-indigo-400 text-lg" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">Course Quizzes</CardTitle>
                        <CardDescription>All quizzes for this course</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {!enrollmentDetails.quizMetaData || enrollmentDetails.quizMetaData.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="bg-indigo-500/10 p-6 rounded-full inline-block mb-4">
                          <FiFileText className="text-indigo-400 text-3xl" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">No quizzes available</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                          There are no quizzes available for this course yet. Check back later.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {enrollmentDetails.quizMetaData.map((quiz, index) => {
                          const status = getQuizStatus(quiz.quizStartDate, quiz.quizEndDate)

                          return (
                            <motion.div
                              key={quiz.quizId}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                            >
                              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
                                <CardContent className="p-5">
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                      <div className="bg-indigo-500/20 p-2.5 rounded-lg mt-1">
                                        <FiFileText className="text-indigo-400 text-lg" />
                                      </div>
                                      <div>
                                        <h3 className="text-lg font-medium text-white mb-1">{quiz.quizTitle}</h3>
                                        <p className="text-gray-400 text-sm mb-3">{quiz.quizDescription}</p>

                                        <div className="flex flex-wrap gap-2 mb-3">
                                          <div className="flex items-center gap-1 text-sm text-gray-400">
                                            <FiUser className="h-3.5 w-3.5 text-indigo-400" />
                                            <span>Created by: {quiz.quizCreatorName}</span>
                                          </div>

                                          <div className="flex items-center gap-1 text-sm text-gray-400">
                                            <FiClock className="h-3.5 w-3.5 text-indigo-400" />
                                            <span>Duration: {formatDuration(quiz.quizDuration)}</span>
                                          </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3 text-sm">
                                          <div className="flex items-center gap-1 text-gray-400">
                                            <FiCalendar className="h-3.5 w-3.5 text-green-400" />
                                            <span>Starts: {formatDate(quiz.quizStartDate as string | null)}</span>
                                          </div>

                                          <div className="flex items-center gap-1 text-gray-400">
                                            <FiCalendar className="h-3.5 w-3.5 text-red-400" />
                                            <span>Ends: {formatDate(quiz.quizEndDate as string | null)}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <Badge
                                      variant="outline"
                                      className={`
                                        ${status === "active"
                                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                                          : status === "upcoming"
                                            ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                        }
                                      `}
                                    >
                                      {status === "active" ? "Active" : status === "upcoming" ? "Upcoming" : "Past"}
                                    </Badge>
                                  </div>

                                  <div className="mt-4 flex justify-end">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className={`
                                        ${status === "active"
                                          ? "border-green-700 hover:bg-green-700/20 text-green-400"
                                          : status === "upcoming"
                                            ? "border-amber-700 hover:bg-amber-700/20 text-amber-400"
                                            : "border-gray-700 hover:bg-gray-700/20 text-gray-400"
                                        }
                                      `}
                                      disabled={status !== "active"}
                                      onClick={() => {
                                        if (status === "active") {
                                          toast.info(`Starting quiz: ${quiz.quizTitle}`, {
                                            description: `Duration: ${formatDuration(quiz.quizDuration)}`,
                                          })
                                        }
                                      }}
                                    >
                                      {status === "active"
                                        ? "Start Quiz"
                                        : status === "upcoming"
                                          ? "Not Available Yet"
                                          : "Quiz Ended"}
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        ) : (
          <motion.div key="not-found" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm overflow-hidden">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <div className="bg-amber-500/10 text-amber-400 p-4 rounded-lg inline-block mb-4">
                    <FiAlertTriangle className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Enrollment Not Found</h3>
                  <p className="text-gray-400 mb-4 max-w-md mx-auto">
                    The enrollment details you are looking for could not be found. It may have been removed or you may
                    not have access to it.
                  </p>
                  <Button
                    onClick={() => router.back()}
                    variant="outline"
                    className="border-indigo-700 hover:bg-indigo-700/20"
                  >
                    <FiArrowLeft className="mr-2 h-4 w-4" />
                    Back to Enrollments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Skeleton loader for enrollment details
function EnrollmentDetailsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="bg-gray-800/50 rounded-lg p-3 flex gap-2">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>

      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-48" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-40" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-36" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-44" />
              </div>
            </div>
          </div>

          <Skeleton className="h-px w-full" />

          <div>
            <Skeleton className="h-4 w-40 mb-3" />
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          </div>

          <Skeleton className="h-px w-full" />

          <div>
            <Skeleton className="h-4 w-40 mb-3" />
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-700/50 bg-gray-800/30 flex justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-9 w-40" />
        </CardFooter>
      </Card>
    </div>
  )
}
