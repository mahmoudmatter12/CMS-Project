"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiSearch, FiFilter, FiRefreshCw, FiGrid, FiList, FiDownload, FiPlus } from "react-icons/fi"
import { FaLock, FaLockOpen, FaTrash, FaEdit, FaQuestion } from "react-icons/fa"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import QuizCard from "./QuizCard"
import { Clock, FileText } from "lucide-react"
import type { Course, Quiz } from "@/types/types"
import { QuizForm } from "./QuizForm"

interface QuizzesMainCompProps {
  courses: Course[]
}

export default function QuizzesMainComp({ courses }: QuizzesMainCompProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [refreshing, setRefreshing] = useState(false)

  const fetchQuizzes = async () => {
    setLoading(true)
    setRefreshing(true)
    try {
      const res = await fetch("http://localhost:5168/api/Quiz")
      const data: Quiz[] = await res.json()
      if (Array.isArray(data)) {
        setQuizzes(data)
        setFilteredQuizzes(data)
      } else {
        console.error("Unexpected response format:", data)
        toast.error("Failed to load quizzes")
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error)
      toast.error("Failed to load quizzes")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handlePublishQuiz = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5168/api/Quiz/${id}/ToggleActive`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "toggle" }),
      })

      if (response.ok) {
        setQuizzes((prevQuizzes) =>
          prevQuizzes.map((quiz) => {
            if (quiz.id === id) {
              return { ...quiz, isActive: !quiz.isActive }
            }
            return quiz
          }),
        )
        toast.success("Quiz status updated successfully")
      } else {
        const error = await response.json()
        throw new Error(error.message)
      }
    } catch (error) {
      console.error("Error updating quiz:", error)
      toast.error(error instanceof Error ? error.message : "Failed to update Quiz")
    }
  }

  const handleDeleteQuiz = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this quiz?")
    if (!confirmDelete) return

    try {
      const response = await fetch(`http://localhost:5168/api/Quiz/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== id))
        toast.success("Quiz deleted successfully")
      } else {
        const error = await response.json()
        throw new Error(error.message)
      }
    } catch (error) {
      console.error("Error deleting quiz:", error)
      toast.error(error instanceof Error ? error.message : "Failed to delete Quiz")
    }
  }

  useEffect(() => {
    fetchQuizzes()
  }, [])

  useEffect(() => {
    let filtered = quizzes

    if (filter === "published") {
      filtered = filtered.filter((quiz) => quiz.isActive)
    } else if (filter === "draft") {
      filtered = filtered.filter((quiz) => !quiz.isActive)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (quiz) =>
          quiz.title?.toLowerCase().includes(query) ||
          quiz.courseName?.toLowerCase().includes(query) ||
          quiz.description?.toLowerCase().includes(query),
      )
    }

    setFilteredQuizzes(filtered)
  }, [quizzes, filter, searchQuery])

  const publishedCount = quizzes.filter((q) => q.isActive).length
  const draftCount = quizzes.filter((q) => !q.isActive).length

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-6 rounded-xl border border-indigo-800/30 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-500/20 p-4 rounded-xl">
            <FaQuestion className="text-indigo-400 text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Quiz Management</h1>
            <p className="text-gray-400 mt-1">
              Create, edit, and manage quizzes for your courses. Track student performance and quiz status.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={fetchQuizzes}
                  variant="outline"
                  size="sm"
                  disabled={refreshing}
                  className="gap-2 bg-transparent  hover:text-indigo-400 border-indigo-700/20 hover:bg-indigo-700/20 cursor-pointer"
                >
                  <FiRefreshCw className={`${refreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh quiz list</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent  hover:text-indigo-400 border-indigo-700/20 hover:bg-indigo-700/20 cursor-pointer">
                  <FiDownload />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export quizzes as CSV</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <QuizForm courses={courses} onSuccess={fetchQuizzes} />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 cursor-pointer">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Quizzes</p>
                <p className="text-3xl font-bold text-white mt-1">{quizzes.length}</p>
              </div>
              <div className="bg-indigo-500/20 p-3 rounded-full">
                <FileText className="text-indigo-400 text-xl" />
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
                <p className="text-sm text-gray-400">Published Quizzes</p>
                <p className="text-3xl font-bold text-green-400 mt-1">{publishedCount}</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-full">
                <FaLockOpen className="text-green-400 text-xl" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Draft Quizzes</p>
                <p className="text-3xl font-bold text-amber-400 mt-1">{draftCount}</p>
              </div>
              <div className="bg-amber-500/20 p-3 rounded-full">
                <FaEdit className="text-amber-400 text-xl" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Controls */}
      <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search by title, course or description..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Select value={filter} onValueChange={(value) => setFilter(value as "all" | "published" | "draft")}>
                  <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white cursor-pointer">
                    <FiFilter className="mr-2 text-gray-400" />
                    <SelectValue placeholder="Filter quizzes" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white cursor-pointer">
                    <SelectItem value="all" className="cursor-pointer">All Quizzes</SelectItem>
                    <SelectItem value="published" className="cursor-pointer">Published Only</SelectItem>
                    <SelectItem value="draft" className="cursor-pointer">Draft Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-1 bg-gray-800 border border-gray-700 rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("cards")}
                  className={`rounded-md ${viewMode === "cards" ? "bg-indigo-700/30 text-indigo-300" : ""} cursor-pointer`}
                  title="Card View"
                >
                  <FiGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("table")}
                  className={`rounded-md ${viewMode === "table" ? "bg-indigo-700/30 text-indigo-300" : ""} cursor-pointer`}
                  title="Table View"
                >
                  <FiList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Area */}
      <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === "cards" ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-[450px] overflow-y-auto"
            >
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {[...Array(6)].map((_, i) => (
                    <QuizCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {filteredQuizzes.map((quiz, index) => (
                    <motion.div
                      key={quiz.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <QuizCard
                        quiz={quiz}
                        courses={courses}
                        handlePublishQuiz={handlePublishQuiz}
                        handleDeleteQuiz={handleDeleteQuiz}
                        onSuccess={fetchQuizzes}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800/50 p-6 rounded-full inline-block mb-4"
                  >
                    <FaQuestion className="text-gray-400 text-3xl" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">No quizzes found</h3>
                  <p className="text-gray-400 max-w-md mx-auto pb-4">
                    {searchQuery ? "Try adjusting your search or filter" : "No quizzes are currently registered"}
                  </p>
                  <QuizForm courses={courses} onSuccess={fetchQuizzes} />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-auto"
              style={{ maxHeight: "600px" }}
            >
              <div className="p-6 min-w-[600px]">
                <div className="rounded-lg border border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400">
                      <thead className="text-xs text-gray-300 uppercase bg-gray-800/50 sticky top-0">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Title
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Course
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Duration
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Questions
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          [...Array(5)].map((_, i) => (
                            <tr key={i} className="border-b border-gray-700/50 animate-pulse">
                              <td className="px-6 py-4">
                                <div className="h-4 bg-gray-700 rounded w-32"></div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="h-4 bg-gray-700 rounded w-24"></div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="h-4 bg-gray-700 rounded w-16"></div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="h-4 bg-gray-700 rounded w-8"></div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="h-4 bg-gray-700 rounded w-16"></div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="h-4 bg-gray-700 rounded w-20 ml-auto"></div>
                              </td>
                            </tr>
                          ))
                        ) : filteredQuizzes.length > 0 ? (
                          filteredQuizzes.map((quiz, index) => (
                            <motion.tr
                              key={`quiz-${quiz.id}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.03 }}
                              className="border-b border-gray-700/50 hover:bg-gray-800/30"
                            >
                              <td className="px-6 py-4 font-medium text-white">{quiz.title}</td>
                              <td className="px-6 py-4">
                                <Badge variant="outline" className="font-mono text-xs text-indigo-400 bg-indigo-500/10">
                                  {quiz.courseName || "No Course"}
                                </Badge>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5 text-indigo-400" />
                                  <span>{quiz.duration} mins</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <Badge className="bg-gray-700/50 text-white">{quiz.totalQuestions}</Badge>
                              </td>
                              <td className="px-6 py-4">
                                <Badge
                                  className={
                                    quiz.isActive ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
                                  }
                                >
                                  {quiz.isActive ? "Published" : "Draft"}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2 cursor-pointer">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => handlePublishQuiz(quiz.id)}
                                          className="text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 cursor-pointer"
                                        >
                                          {quiz.isActive ? <FaLock size={14} /> : <FaLockOpen size={14} />}
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{quiz.isActive ? "Unpublish quiz" : "Publish quiz"}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>

                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                                        >
                                          <FaEdit size={14} />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Edit quiz</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>

                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => handleDeleteQuiz(quiz.id)}
                                          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                                        >
                                          <FaTrash size={14} />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Delete quiz</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </td>
                            </motion.tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-6 py-16 text-center">
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-800/50 p-6 rounded-full inline-block mb-4">
                                  <FaQuestion className="text-gray-400 text-3xl" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">No quizzes found</h3>
                                <p className="text-gray-400 max-w-md mx-auto mb-4">
                                  {searchQuery
                                    ? "Try adjusting your search or filter"
                                    : "No quizzes are currently registered"}
                                </p>
                                <QuizForm courses={courses} onSuccess={fetchQuizzes} />
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <QuizForm courses={courses} onSuccess={fetchQuizzes}>
            <Button size="lg" className="rounded-full w-14 h-14 bg-indigo-600 hover:bg-indigo-700 shadow-lg">
              <FiPlus size={24} />
            </Button>
          </QuizForm>
        </motion.div>
      </div>
    </div>
  )
}

// Skeleton component for quiz cards
function QuizCardSkeleton() {
  return (
    <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700"></div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <div className="h-5 bg-gray-700 rounded w-40 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
          </div>
          <div className="h-6 bg-gray-700 rounded w-20 animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-700 rounded w-full mb-6 animate-pulse"></div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-700">
          <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
          <div className="h-8 bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  )
}
