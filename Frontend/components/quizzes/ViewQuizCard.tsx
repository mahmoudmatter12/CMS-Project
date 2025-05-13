"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Clock, Award, FileText, RotateCcw } from "lucide-react"
import type { Quiz, Course } from "@/types/types"

interface ViewQuizCardProps {
  quiz: Quiz
  courses: Course[]
  onSuccess?: () => void
}

const ViewQuizCard = ({ quiz, courses }: ViewQuizCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // Find the course for this quiz
  const course = courses.find((c) => c?.id === quiz?.courseName)
  const courseName = course ? course.name : "No Course"
  const courseCode = course ? course.courseCode : "No Code"

  // Calculate due date
  const dueDate = quiz.endDate ? new Date(quiz.endDate) : null
  const isPastDue = dueDate && dueDate < new Date()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-indigo-400">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-gray-900/80 backdrop-blur-sm border-gray-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            <Badge
              variant={quiz.isActive ? "default" : "destructive"}
              className={`${
                quiz.isActive
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-rose-500/20 text-rose-400 border-rose-500/30"
              }`}
            >
              {quiz.isActive ? "Published" : "Draft"}
            </Badge>
            {quiz.title}
          </DialogTitle>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Badge
              variant="outline"
              className="font-mono text-xs bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
            >
              {courseCode}
            </Badge>
            <span>{courseName}</span>
            <span>•</span>
            <span>Created by: {quiz.creatorName}</span>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Quiz Details */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Quiz Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 flex items-center gap-3">
                  <FileText className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-xs text-gray-400">Questions</p>
                    <p className="font-medium text-white">{quiz.totalQuestions}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-xs text-gray-400">Time Limit</p>
                    <p className="font-medium text-white">{quiz.duration} mins</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-xs text-gray-400">Attempts</p>
                    <p className="font-medium text-white">{quiz.MaxAttempts || "Unlimited"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 flex items-center gap-3">
                  <Award className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-xs text-gray-400">Pass Score</p>
                    <p className="font-medium text-white">{quiz.passingMarks}%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Description</h3>
            <p className="text-gray-400">{quiz.description || "No description provided."}</p>
          </div>

          {/* Due Date */}
          {dueDate && (
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Schedule</h3>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-400">{isPastDue ? "Closed on" : "Due by"}:</p>
                    <p className={`font-medium ${isPastDue ? "text-rose-400" : "text-amber-400"}`}>
                      {dueDate.toLocaleDateString()} at {dueDate.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Questions Preview */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Questions Preview</h3>
            <div className="space-y-4">
              {quiz.questions.map((question, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white">Question {index + 1}</h4>
                      <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600">
                        {question.marks} {question.marks === 1 ? "point" : "points"}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-3">{question.questionText}</p>

                    {question.type === "MULTIPLE_CHOICE" && (
                      <div className="space-y-2">
                        {question.answers.map((answer, aIndex) => (
                          <div
                            key={aIndex}
                            className={`p-2 rounded-md border ${
                              typeof question.correctAnswerIndex === "number" && question.correctAnswerIndex === aIndex
                                ? "border-green-500/30 bg-green-500/10"
                                : "border-gray-700 bg-gray-700/50"
                            }`}
                          >
                            <p className="text-sm text-gray-300">{answer}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {question.type === "TRUE_FALSE" && (
                      <div className="space-y-2">
                        <div
                          className={`p-2 rounded-md border ${
                            question.correctAnswerIndex === 0
                              ? "border-green-500/30 bg-green-500/10"
                              : "border-gray-700 bg-gray-700/50"
                          }`}
                        >
                          <p className="text-sm text-gray-300">True</p>
                        </div>
                        <div
                          className={`p-2 rounded-md border ${
                            question.correctAnswerIndex === 1
                              ? "border-green-500/30 bg-green-500/10"
                              : "border-gray-700 bg-gray-700/50"
                          }`}
                        >
                          <p className="text-sm text-gray-300">False</p>
                        </div>
                      </div>
                    )}

                    {question.type === "SHORT_ANSWER" && (
                      <div className="space-y-2">
                        <div className="p-2 rounded-md border border-gray-700 bg-gray-700/50">
                          <p className="text-sm text-gray-400 italic">Short answer question</p>
                        </div>
                        <div className="p-2 rounded-md border border-green-500/30 bg-green-500/10">
                          <p className="text-sm text-gray-300">
                            <span className="text-xs text-gray-400">Correct answer: </span>
                            {question.answers[0]}
                          </p>
                        </div>
                      </div>
                    )}

                    {question.explanation && (
                      <div className="mt-3 p-2 rounded-md border border-indigo-500/30 bg-indigo-500/10">
                        <p className="text-xs text-gray-400">Explanation:</p>
                        <p className="text-sm text-gray-300">{question.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewQuizCard
