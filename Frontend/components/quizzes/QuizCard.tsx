"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Award, FileText, RotateCcw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ViewQuizCard from "./ViewQuizCard"
import { FaTrash } from "react-icons/fa"
import { useMemo } from "react"
import type { Course, Quiz } from "@/types/types"

interface QuizCardProps {
  quiz: Quiz
  handlePublishQuiz: (id: string) => void
  courses: Course[]
  onSuccess?: () => void
  handleDeleteQuiz?: (id: string) => void
  isRegistered?: boolean
  hasAttemptsLeft?: boolean
}

const QuizCard = ({
  quiz,
  handlePublishQuiz,
  courses,
  onSuccess,
  handleDeleteQuiz,
}: QuizCardProps) => {
  const course = useMemo(() => courses.find((c) => c?.courseCode === quiz?.courseName), [courses, quiz.courseName])
  const courseName = course ? course.name : "No Course"
  const courseCode = course ? course.courseCode : "No Code"

  // Get creator name
  const creatorName = quiz.creatorName || "Unknown"

  // Calculate due date
  const dueDate = quiz.endDate ? new Date(quiz.endDate) : null
  const isPastDue = dueDate && dueDate < new Date()

  // Calculate total points
  // const totalPoints = quiz.questions.reduce((sum, q) => sum + q.marks, 0)
  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] 
      bg-gray-800/50 border ${quiz.isActive ? "border-emerald-500/30" : "border-rose-500/30"}`}
    >
      {/* Status indicator line at top */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${quiz.isActive ? "bg-emerald-500" : "bg-rose-500"}`} />

      <CardHeader className="pb-2 pt-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg line-clamp-1 text-white">{quiz.title}</h3>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="font-mono text-xs bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
              >
                {courseCode}
              </Badge>
              <span className="text-xs text-gray-400">{courseName}</span>
            </div>
            <p className="text-xs text-gray-400">Created by: {creatorName}</p>
          </div>

          <Badge
            variant={quiz.isActive ? "default" : "destructive"}
            className={`ml-2 whitespace-nowrap ${
              quiz.isActive
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : "bg-rose-500/20 text-rose-400 border-rose-500/30"
            }`}
          >
            {quiz.isActive ? "Published" : "Draft"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {quiz.description ? (
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">{quiz.description}</p>
        ) : (
          <p className="text-sm text-gray-500 mb-4 italic">No description provided</p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-700/50 rounded-lg p-3 flex items-center gap-3">
            <FileText className="h-4 w-4 text-indigo-400" />
            <div>
              <p className="text-xs text-gray-400">Questions</p>
              <p className="font-medium text-white">{quiz.totalQuestions}</p>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-3 flex items-center gap-3">
            <Clock className="h-4 w-4 text-indigo-400" />
            <div>
              <p className="text-xs text-gray-400">Time Limit</p>
              <p className="font-medium text-white">{quiz.duration} mins</p>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-3 flex items-center gap-3">
            <RotateCcw className="h-4 w-4 text-indigo-400" />
            <div>
              <p className="text-xs text-gray-400">Attempts</p>
              <p className="font-medium text-white">{quiz.MaxAttempts || "Unlimited"}</p>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-3 flex items-center gap-3">
            <Award className="h-4 w-4 text-indigo-400" />
            <div>
              <p className="text-xs text-gray-400">Pass Score</p>
              <p className="font-medium text-white">{quiz.passingMarks}%</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-3 border-t border-gray-700">
        <div>
          {dueDate ? (
            <div className={`text-sm flex items-center gap-1 ${isPastDue ? "text-rose-400" : "text-amber-400"}`}>
              <Clock className="h-3.5 w-3.5" />
              <span>{isPastDue ? "Closed" : "Due"}: </span>
              <span>{dueDate.toLocaleDateString()}</span>
            </div>
          ) : (
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>No due date</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ViewQuizCard quiz={quiz} courses={courses} onSuccess={onSuccess} />
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                <p>Preview Quiz</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-red-500"
                  onClick={() => handleDeleteQuiz && handleDeleteQuiz(quiz.id)}
                >
                  <FaTrash className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button
            onClick={() => handlePublishQuiz(quiz.id)}
            size="sm"
            className={`ml-1 ${
              quiz.isActive
                ? "bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border-rose-500/30"
                : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/30 cursor-pointer"
            }`}
          >
            {quiz.isActive ? "Unpublish" : "Publish"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default QuizCard
