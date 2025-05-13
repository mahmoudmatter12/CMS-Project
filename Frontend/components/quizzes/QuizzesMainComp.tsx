"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Grid, List, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import QuizCard from "./QuizCard"
import { QuizForm } from "./QuizForm"
import { FiRefreshCw } from "react-icons/fi"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Course } from "@/types/types"

interface ApiResponse {
  quizzes: Quiz[]
}

interface QuizzesMainCompProps {
  subjects: Course[]
}

function QuizzesMainComp({ subjects }: QuizzesMainCompProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  //   const [subjects, setSubjects] = useState<Subject[]>([])

  const fetchQuizzes = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/quizzes")
      const data: ApiResponse = await res.json()
      setQuizzes(data.quizzes)
    } catch (error) {
      console.error("Error fetching quizzes:", error)
      toast.error("Failed to load quizzes")
    } finally {
      setLoading(false)
    }
  }

  //   const fetchSubjects = async () => {
  //     try {
  //       const res = await fetch("/api/subjects")
  //       const data = await res.json()
  //       if (data.subjects && Array.isArray(data.subjects)) {
  //         setSubjects(data.subjects)
  //       }
  //     } catch (error) {
  //       console.error("Error fetching subjects:", error)
  //       toast.error("Failed to load subjects")
  //     }
  //   }

  useEffect(() => {
    fetchQuizzes()
    // fetchSubjects()
  }, [])

  const handlePublishQuiz = async (id: string) => {
    try {
      const response = await fetch(`/api/quizzes/${id}/publish`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "toggle" }),
      })

      if (response.ok) {
        const { message } = await response.json()
        setQuizzes((prevQuizzes) =>
          prevQuizzes.map((quiz) => {
            if (quiz.id === id) {
              return { ...quiz, isPublished: !quiz.isPublished }
            }
            return quiz
          }),
        )
        toast.success(message)
      } else {
        const error = await response.json()
        throw new Error(error.message)
      }
    } catch (error) {
      console.error("Error updating quiz:", error)
      toast.error(error instanceof Error ? error.message : "Failed to update Quiz")
    }
  }

  const handelDeleteQuiz = async (id: string) => {
    try {
      const response = await fetch(`/api/quizzes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        const { message } = await response.json()
        setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== id))
        toast.success(message)
      } else {
        const error = await response.json()
        throw new Error(error.message)
      }
    } catch (error) {
      console.error("Error deleting quiz:", error)
      toast.error(error instanceof Error ? error.message : "Failed to delete Quiz")
    }
  }

  const filteredQuizzes = quizzes.filter((quiz) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (quiz.subject?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (quiz.subject?.subjectCode || "").toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus =
      filter === "all" || (filter === "published" && quiz.isPublished) || (filter === "draft" && !quiz.isPublished)

    return matchesSearch && matchesStatus
  })

  const publishedCount = quizzes.filter((q) => q.isPublished).length
  const draftCount = quizzes.filter((q) => !q.isPublished).length

  return (
    <Card className="border-gray-700 shadow-lg bg-gray-900/50 backdrop-blur-sm">
      <CardHeader className="pb-3 border-b border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2 text-white">
              <div className="bg-indigo-500 w-2 h-6 rounded-full"></div>
              Quiz Management
            </CardTitle>
            <CardDescription className="mt-1 text-gray-400">
              Manage your quizzes, create new ones, and track their status
            </CardDescription>
          </div>


          <div className="flex items-center gap-3">
            <Button onClick={fetchQuizzes} variant="ghost" className="gap-2 text-white">
              <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <QuizForm subjects={subjects} onSuccess={fetchQuizzes} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <Badge variant="outline" className="px-2 py-1 bg-gray-800 text-gray-300 border-gray-700">
            Total: {quizzes.length}
          </Badge>
          <Badge className="px-2 py-1 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            Published: {publishedCount}
          </Badge>
          <Badge className="px-2 py-1 bg-rose-500/20 text-rose-400 border-rose-500/30">
            Draft: {draftCount}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by title, subject code or name..."
              className="pl-9 bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select
                value={filter}
                onValueChange={(value: "all" | "published" | "draft") => setFilter(value)}
              >
                <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all" className="hover:bg-gray-700">All Quizzes</SelectItem>
                  <SelectItem value="published" className="hover:bg-gray-700">Published</SelectItem>
                  <SelectItem value="draft" className="hover:bg-gray-700">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center border border-gray-700 rounded-md">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className={`h-9 w-9 rounded-none rounded-l-md ${viewMode === "grid" ? "bg-indigo-500/20 text-indigo-400" : "text-gray-400"
                  }`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className={`h-9 w-9 rounded-none rounded-r-md ${viewMode === "list" ? "bg-indigo-500/20 text-indigo-400" : "text-gray-400"
                  }`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <ScrollArea className="h-[500px] overflow-y-auto custom-scrollbar">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(quizzes.length)].map((_, i) => (
                <Card key={i} className="overflow-hidden bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-3/4 mb-2 bg-gray-700" />
                    <Skeleton className="h-4 w-1/2 bg-gray-700" />
                  </CardHeader>
                  <CardContent className="pb-3">
                    <Skeleton className="h-4 w-full mb-4 bg-gray-700" />
                    <div className="grid grid-cols-2 gap-3">
                      {[...Array(4)].map((_, j) => (
                        <Skeleton key={j} className="h-16 w-full bg-gray-700" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : filteredQuizzes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-lg font-medium mb-2 text-white">No quizzes found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery ? "No quizzes match your search criteria" : "You haven't created any quizzes yet"}
            </p>
            <QuizForm subjects={subjects} onSuccess={fetchQuizzes} />
          </div>
        ) : (
          <ScrollArea className="h-[500px] overflow-y-auto custom-scrollbar">
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
              {filteredQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} subjects={subjects} handelDeleteQuiz={handelDeleteQuiz} handelPublishQuiz={handlePublishQuiz} onSuccess={fetchQuizzes} />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

export default QuizzesMainComp