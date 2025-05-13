"use client"

import React from 'react'
import { Quiz, Question } from '@/types/Quiz'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, Clock, Award, RotateCcw, FileText, CheckCircle } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import EditQuizCard from './EditQuizCard'
import type Subject from "@/types/subject"
import { useState } from 'react'

interface ViewQuizCardProps {
    quiz: Quiz
    trigger?: React.ReactNode
    subjects: Subject[]
    onSuccess?: () => void
}

function ViewQuizCard({ quiz, trigger, subjects, onSuccess }: ViewQuizCardProps) {
    const dueDate = quiz.dueDate ? new Date(quiz.dueDate) : null
    const isPastDue = dueDate && dueDate < new Date()
    const [isOpen, setIsOpen] = useState(false)

    // Calculate total points
    const totalPoints = quiz.questions.reduce((sum, question) => sum + question.points, 0)

    // Helper function to get correct answer text
    const getCorrectAnswerText = (question: Question) => {
        if (question.type === 'SHORT_ANSWER') {
            // For short answer, correctAnswer is the string answer
            return typeof question.correctAnswer === 'string'
                ? question.correctAnswer
                : question.textAnswer || "N/A" // fallback to "N/A" if textAnswer is not available
        } else {
            // For other types, correctAnswer is the index
            const correctIndex = typeof question.correctAnswer === 'number'
                ? question.correctAnswer
                : parseInt(question.correctAnswer) || 0
            return question.options?.[correctIndex] || "N/A" // fallback to "N/A" if index is invalid
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700">
                        <Eye className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] bg-gray-900/80 backdrop-blur-sm border-gray-700">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-bold text-white">{quiz.title}</DialogTitle>
                        <Badge className={`px-2 py-1 ${quiz.isPublished
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                            }`}>
                            {quiz.isPublished ? "Published" : "Draft"}
                        </Badge>
                    </div>

                    {quiz.description && (
                        <p className="text-sm text-gray-400 mt-2">{quiz.description}</p>
                    )}
                </DialogHeader>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                    <div className="bg-gray-800/70 rounded-lg p-3 flex items-center gap-3">
                        <FileText className="h-4 w-4 text-indigo-400" />
                        <div>
                            <p className="text-xs text-gray-400">Questions</p>
                            <p className="font-medium text-white">{quiz.questions.length}</p>
                        </div>
                    </div>

                    <div className="bg-gray-800/70 rounded-lg p-3 flex items-center gap-3">
                        <Clock className="h-4 w-4 text-indigo-400" />
                        <div>
                            <p className="text-xs text-gray-400">Time Limit</p>
                            <p className="font-medium text-white">{quiz.timeLimit} mins</p>
                        </div>
                    </div>

                    <div className="bg-gray-800/70 rounded-lg p-3 flex items-center gap-3">
                        <RotateCcw className="h-4 w-4 text-indigo-400" />
                        <div>
                            <p className="text-xs text-gray-400">Attempts</p>
                            <p className="font-medium text-white">{quiz.maxAttempts || "Unlimited"}</p>
                        </div>
                    </div>

                    <div className="bg-gray-800/70 rounded-lg p-3 flex items-center gap-3">
                        <Award className="h-4 w-4 text-indigo-400" />
                        <div>
                            <p className="text-xs text-gray-400">Pass Score</p>
                            <p className="font-medium text-white">{quiz.passingScore}%</p>
                        </div>
                    </div>
                </div>

                {dueDate && (
                    <div className={`text-sm flex items-center gap-1 ${isPastDue ? "text-rose-400" : "text-amber-400"
                        }`}>
                        <Clock className="h-3.5 w-3.5" />
                        <span>{isPastDue ? "Closed" : "Due"}: </span>
                        <span>{dueDate.toLocaleDateString()} at {dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                )}

                <Separator className="bg-gray-700/50 my-2" />

                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Questions</h3>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-300">
                            Total: {quiz.questions.length}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-300">
                            Points: {totalPoints}
                        </Badge>
                    </div>
                </div>

                <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                        {quiz.questions.map((question, index) => (
                            <Card key={question.id} className="bg-gray-800/50 border-gray-700/50">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-white font-medium">
                                            {index + 1}. {question.text}
                                        </h4>
                                        <Badge variant="outline" className="ml-2 bg-gray-800/50 border-gray-700 text-gray-300">
                                            {question.points} {question.points === 1 ? 'point' : 'points'}
                                        </Badge>
                                    </div>

                                    <Badge className="mt-2 mb-3 bg-gray-700/50 border-gray-700 text-gray-300">
                                        {question.type.replace('_', ' ').toLowerCase()}
                                    </Badge>

                                    {question.type === 'SHORT_ANSWER' ? (
                                        <div className="mt-2">
                                            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-md">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                                                    <span className="text-emerald-400 font-medium">Correct Answer:</span>
                                                    <span className="text-white">{getCorrectAnswerText(question)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-2 mt-2">
                                            {question.options.map((option, optionIndex) => {
                                                const isCorrect = typeof question.correctAnswer === 'number'
                                                    ? optionIndex === question.correctAnswer
                                                    : optionIndex === parseInt(question.correctAnswer)

                                                return (
                                                    <div
                                                        key={optionIndex}
                                                        className={`flex items-center gap-2 p-2 rounded-md ${isCorrect
                                                            ? 'bg-emerald-500/10 border border-emerald-500/30'
                                                            : 'bg-gray-700/30 border border-gray-700/30'
                                                            }`}
                                                    >
                                                        {isCorrect && (
                                                            <CheckCircle className="h-4 w-4 text-emerald-400" />
                                                        )}
                                                        <span className={isCorrect ? 'text-emerald-400' : 'text-gray-300'}>
                                                            {option}
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
                <Separator className="bg-gray-700/50 my-2" />
                <div className="flex justify-end">
                    <EditQuizCard
                        quiz={quiz}
                        subjects={subjects}
                        onSuccess={() => {
                            onSuccess?.()
                            setIsOpen(false)
                        }}
                    />
                    {/* <QuizForm subjects={subjects}
                        defaultValues={formattedQuiz}
                        isEdit={true}
                        onSuccess={handleSuccess} /> */}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ViewQuizCard