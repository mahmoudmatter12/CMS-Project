"use client"

import React from "react"
import { toast } from "sonner"
import { QuizForm } from "./QuizForm"
import { Course, QuestionType, Quiz } from "@/types/types"
interface EditQuizCardProps {
    quiz: Quiz
    subjects: Course[]
    onSuccess?: () => void
}

function EditQuizCard({ quiz, subjects, onSuccess }: EditQuizCardProps) {

    // Format the quiz data for the form
    const formattedQuiz = {
        ...quiz,
        dueDate: quiz.duration ? new Date(quiz.duration).toISOString().slice(0, 16) : null,
        questions: quiz.questions.map((question) => ({
            ...question,
            type: question.type as QuestionType,
            correctAnswerIndex: typeof question.correctAnswerIndex === "number" ? question.correctAnswerIndex : parseInt(question.correctAnswerIndex),
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
                courses={subjects} 
                defaultValues={formattedQuiz} 
                isEdit={true} 
                onSuccess={handleSuccess}
            />
        </>
    )
}

export default EditQuizCard