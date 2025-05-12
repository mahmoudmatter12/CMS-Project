"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import type { Department, Course } from "@/types/types"

export function useCourseData() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true)
  const [isLoadingCourses, setIsLoadingCourses] = useState(true)

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoadingDepartments(true)
      try {
        const response = await fetch("http://localhost:5168/api/Admin/departments")
        if (!response.ok) {
          throw new Error("Failed to fetch departments")
        }
        const data = await response.json()
        setDepartments(data)
      } catch (error) {
        console.error("Failed to fetch departments:", error)
        toast.error("Failed to load departments. Please try again.")
      } finally {
        setIsLoadingDepartments(false)
      }
    }

    fetchDepartments()
  }, [])

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoadingCourses(true)
      try {
        const response = await fetch("http://localhost:5168/api/Admin/courses/open")
        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }
        const data = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("Failed to fetch courses:", error)
        toast.error("Failed to load prerequisite courses. Please try again.")
      } finally {
        setIsLoadingCourses(false)
      }
    }

    fetchCourses()
  }, [])

  // Filter courses by department
  const getFilteredCourses = (departmentId: string | null) => {
    if (!departmentId) return courses

    // You can adjust this logic based on your requirements
    // For example, you might want to show only courses from the same department
    // or show all courses regardless of department
    return courses
  }

  return {
    departments,
    courses,
    isLoadingDepartments,
    isLoadingCourses,
    getFilteredCourses,
  }
}
