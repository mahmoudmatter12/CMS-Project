import { QuestionType } from '@/types/types'
import * as z from 'zod'

// Student Registration Schema
export const studentSchema = z.object({
  studentId: z.string().min(6, "Student ID must be at least 6 characters"),
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  course: z.string().min(1, "Please select a course"),
  enrollmentDate: z.string().min(1, "Enrollment date is required"),
  bio: z.string().optional()
})

// Course Creation Schema
export const courseSchema = z.object({
  courseCode: z.string().min(4, "Course code must be at least 4 characters"),
  title: z.string().min(5, "Course title is required"),
  description: z.string().min(20, "Description should be at least 20 characters"),
  credits: z.number().min(1, "Credits must be at least 1"),
  department: z.string().min(1, "Please select a department")
})

// Faculty Login Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
})



export const quizSchema = z.object({
  title: z.string().min(5, "Quiz title is required"),
  description: z.string().min(20, "Description should be at least 20 characters"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  passingMarks: z.number().min(1, "Passing marks must be at least 1"),
  isActive: z.boolean(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  totalMarks: z.number().min(1, "Total marks must be at least 1"),
  totalQuestions: z.number().min(1, "Total questions must be at least 1"),
  creatorId: z.string().min(1, "Creator name is required"),
  courseId: z.string().min(1, "Course name is required"),
  MaxAttempts: z.number().optional(),
  questions: z.array(
    z.object({
      questionText: z.string().min(5, "Question text is required"),
      type: z.enum([QuestionType.MULTIPLE_CHOICE, QuestionType.TRUE_FALSE, QuestionType.SHORT_ANSWER]),
      answers: z.array(z.string()).min(2, "At least two answers are required"),
      correctAnswerIndex: z.union([z.number(), z.string()]),
      marks: z.number().min(1, "Marks must be at least 1"),
      hint: z.string().optional(),
      explanation: z.string().optional(),
      imageUrl: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  ),
})