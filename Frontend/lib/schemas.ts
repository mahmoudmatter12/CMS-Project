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