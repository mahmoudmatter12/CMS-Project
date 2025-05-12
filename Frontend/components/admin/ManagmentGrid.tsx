'use client'
import { Course } from '@/lib/mock-data'
import React, { useEffect } from 'react'
import { useState } from 'react'
import SubjectMainComp from '../Subject/SubjectMainComp'

function ManagmentGrid() {
    const [subjects, setSubjects] = useState<Course[]>([])

    const fetchSubjects = async () => {
        try {
            const res = await fetch("http://localhost:5168/api/Admin/courses")
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const data = await res.json()
            if (data.subjects && Array.isArray(data.subjects)) {
                setSubjects(data.subjects)
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
            {/* <QuizzesMainComp subjects={subjects} /> */}
        </div>
    )
}

export default ManagmentGrid