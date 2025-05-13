'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import SubjectMainComp from '../Subject/SubjectMainComp'
import QuizzesMainComp from '../quizzes/QuizzesMainComp'
import { Course } from '@/types/types'

function ManagmentGrid() {
    const [courses, setcourses] = useState<Course[]>([])

    const fetchSubjects = async () => {
        try {
            const res = await fetch("http://localhost:5168/api/Admin/courses/open")
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const data = await res.json()
            console.log("Fetched courses:", data)
            if (Array.isArray(data)) {
                setcourses(data)
            }
        } catch (error) {
            console.error("Error fetching subjects:", error)
        }
    }

    useEffect(() => {
        fetchSubjects()
    }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* All Subjects */}
            <SubjectMainComp />
            <QuizzesMainComp courses={courses} />
        </div>
    )
}

export default ManagmentGrid