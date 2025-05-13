"use client"

import React from "react"
import type { Quiz } from "@/types/Quiz"
import { toast } from "sonner"
import { QuizForm } from "./QuizForm"
import { Course } from "@/types/types"
interface EditQuizCardProps {
    quiz: Quiz
    subjects: Course[]
    onSuccess?: () => void
}

function EditQuizCard({ quiz, subjects, onSuccess }: EditQuizCardProps) {

    // Format the quiz data for the form
    const formattedQuiz = {
        ...quiz,
        dueDate: quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : null,
        questions: quiz.questions.map((question) => ({
            ...question,
            type: question.type as "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER",
            correctAnswer: typeof question.correctAnswer === "string" ? parseInt(question.correctAnswer, 10) : question.correctAnswer,
        })),
    }

    const handleSuccess = () => {
        if (onSuccess) {
            onSuccess()
        }
        toast.success("Quiz updated successfully!")
    }

    return (
        <>
            <QuizForm 
                subjects={subjects} 
                defaultValues={formattedQuiz} 
                isEdit={true} 
                onSuccess={handleSuccess}
            />
        </>
    )
}

export default EditQuizCard