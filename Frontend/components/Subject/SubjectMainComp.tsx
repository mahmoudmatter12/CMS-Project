"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiSearch, FiFilter, FiRefreshCw, FiGrid, FiList, FiDownload, FiPlus } from "react-icons/fi"
import { FaBook, FaLock, FaLockOpen, FaTrash, FaEdit, FaChalkboardTeacher } from "react-icons/fa"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SubjectCardSkeleton } from "./SubjectCardSkeleton"
import SubjectCard from "./SubjectCard"
import NewSubjectForm from "./NewSubjectForm"
import type { Course, User } from "@/types/types"

export default function SubjectMainComp() {
    const [subjects, setSubjects] = useState<Course[]>([])
    const [filteredSubjects, setFilteredSubjects] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<"all" | "open" | "closed">("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
    const [refreshing, setRefreshing] = useState(false)
    const [Instructors, setInstructors] = useState<User[] | null>(null)

    const fetchSubjects = async () => {
        setLoading(true)
        setRefreshing(true)
        try {
            const res = await fetch("http://localhost:5168/api/Admin/courses")
            const data = await res.json()
            if (Array.isArray(data)) {
                setSubjects(data)
                setFilteredSubjects(data)
            } else {
                console.error("Unexpected response format:", data)
                toast.error("Failed to load subjects")
            }
        } catch (error) {
            console.error("Error fetching subjects:", error)
            toast.error("Failed to load subjects")
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const fetchInstructors = async () => {
        try {
            const res = await fetch(`http://localhost:5168/api/Admin/users/role/2`)
            const data = await res.json()
            if (Array.isArray(data)) {
                const instructors = data.map((instructor) => ({
                    id: instructor.id,
                    fullname: instructor.fullname,
                    email: instructor.email,
                    profilePicture: instructor.profilePicture,
                    departmentId: instructor.departmentId,
                    depName: instructor.depName,
                    clerkId: instructor.clerkId,
                    studentCollageId: instructor.studentCollageId,
                    isBoarded: instructor.isBoarded,
                    role: instructor.role,
                    cgpa: instructor.cgpa,
                    level: instructor.level,
                }))
                console.log("Instructors:", instructors)
                setInstructors(instructors)
            } else {
                console.error("Unexpected response format:", data)
                toast.error("Failed to load instructors")
            }
        } catch (error) {
            console.error("Error fetching instructors:", error)
            toast.error("Failed to load instructors")
        }
    }


    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this subject?")
        if (!confirmDelete) return

        try {
            const response = await fetch(`http://localhost:5168/api/Admin/course/${id}/delete`, { method: "DELETE" })
            if (response.ok) {
                toast.success("Subject deleted successfully")
                setSubjects((prev) => prev.filter((subject) => subject.id !== id))
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to delete subject")
        }
    }

    const handleToggleStatus = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5168/api/Admin/courses/${id}/toggle-status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action: "toggle" }),
            })

            if (response.ok) {
                const updatedSubject = await response.json()
                setSubjects((prevSubjects) =>
                    prevSubjects.map((subject) => {
                        if (subject.id === id) {
                            return { ...subject, ...updatedSubject }
                        }
                        return subject
                    }),
                )
                toast.success(`Subject ${updatedSubject.isOpen ? "opened" : "closed"} successfully`)
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to update subject")
        }
    }

    useEffect(() => {
        fetchSubjects()
        fetchInstructors()
    }, [])

    useEffect(() => {
        let filtered = subjects

        if (filter === "open") {
            filtered = filtered.filter((subject) => subject.isOpen)
        } else if (filter === "closed") {
            filtered = filtered.filter((subject) => !subject.isOpen)
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(
                (subject) => subject.courseCode?.toLowerCase().includes(query) || subject.name?.toLowerCase().includes(query),
            )
        }

        setFilteredSubjects(filtered)
    }, [subjects, filter, searchQuery])

    const openSubjectsCount = subjects.filter((s) => s.isOpen).length
    const closedSubjectsCount = subjects.filter((s) => !s.isOpen).length

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-6 rounded-xl border border-indigo-800/30 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                    <div className="bg-indigo-500/20 p-4 rounded-xl">
                        <FaChalkboardTeacher className="text-indigo-400 text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Subject Management</h1>
                        <p className="text-gray-400 mt-1">
                            Manage your academic subjects, including adding, editing, and deleting them.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={fetchSubjects}
                                    variant="outline"
                                    size="sm"
                                    disabled={refreshing}
                                    className="gap-2 bg-transparent  hover:text-indigo-400 border-indigo-700/20 hover:bg-indigo-700/20 cursor-pointer"
                                >
                                    <FiRefreshCw className={`${refreshing ? "animate-spin" : ""}`} />
                                    Refresh
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Refresh subject list</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="sm" className="cursor-pointer gap-2 bg-transparent  hover:text-indigo-400 border-indigo-700/20 hover:bg-indigo-700/20">
                                    <FiDownload />
                                    Export
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Export subjects as CSV</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <NewSubjectForm onSuccess={fetchSubjects} Instructors={Instructors} />
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 overflow-hidden">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Total Subjects</p>
                                <p className="text-3xl font-bold text-white mt-1">{subjects.length}</p>
                            </div>
                            <div className="bg-indigo-500/20 p-3 rounded-full">
                                <FaBook className="text-indigo-400 text-xl" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 overflow-hidden">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Open Subjects</p>
                                <p className="text-3xl font-bold text-green-400 mt-1">{openSubjectsCount}</p>
                            </div>
                            <div className="bg-green-500/20 p-3 rounded-full">
                                <FaLockOpen className="text-green-400 text-xl" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 overflow-hidden">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Closed Subjects</p>
                                <p className="text-3xl font-bold text-red-400 mt-1">{closedSubjectsCount}</p>
                            </div>
                            <div className="bg-red-500/20 p-3 rounded-full">
                                <FaLock className="text-red-400 text-xl" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Controls */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="text-gray-400" />
                            </div>
                            <Input
                                type="text"
                                placeholder="Search by code or name..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-800 border-gray-700 text-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="flex items-center gap-2">
                                <Select value={filter} onValueChange={(value) => setFilter(value as "all" | "open" | "closed")}>
                                    <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white cursor-pointer">
                                        <FiFilter className="mr-2 text-gray-400" />
                                        <SelectValue placeholder="Filter subjects" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                        <SelectItem value="all" className="cursor-pointer">All Subjects</SelectItem>
                                        <SelectItem value="open" className="cursor-pointer">Open Only</SelectItem>
                                        <SelectItem value="closed" className="cursor-pointer">Closed Only</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-1 bg-gray-800 border border-gray-700 rounded-md">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setViewMode("cards")}
                                    className={`rounded-md ${viewMode === "cards" ? "bg-indigo-700/30 text-indigo-300" : ""} cursor-pointer`}
                                    title="Card View"
                                >
                                    <FiGrid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setViewMode("table")}
                                    className={`rounded-md ${viewMode === "table" ? "bg-indigo-700/30 text-indigo-300" : ""} cursor-pointer`}
                                    title="Table View"
                                >
                                    <FiList className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Content Area */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm overflow-hidden">
                <AnimatePresence mode="wait">
                    {viewMode === "cards" ? (
                        <motion.div
                            key="cards"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="h-[450px] overflow-y-auto"
                        >
                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                                    {[...Array(6)].map((_, i) => (
                                        <SubjectCardSkeleton key={i} />
                                    ))}
                                </div>
                            ) : filteredSubjects.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
                                    {filteredSubjects.map((subject, index) => (
                                        <motion.div
                                            key={subject.id || subject.courseCode}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                        >
                                            <SubjectCard subject={subject} onToggle={handleToggleStatus} onDelete={handleDelete} />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-16 text-center flex flex-col items-center">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-gray-800/50 p-6 rounded-full inline-block mb-4"
                                    >
                                        <FaBook className="text-gray-400 text-3xl" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold text-white mb-2">No subjects found</h3>
                                    <p className="text-gray-400 max-w-md mx-auto pb-4">
                                        {searchQuery ? "Try adjusting your search or filter" : "No subjects are currently registered"}
                                    </p>
                                    <NewSubjectForm onSuccess={fetchSubjects} Instructors={Instructors} />
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="table"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-auto"
                            style={{ maxHeight: "600px" }}
                        >
                                <div className="rounded-lg border border-gray-700 overflow-hidden ">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-gray-400">
                                            <thead className="text-xs text-gray-300 uppercase bg-gray-800/50 sticky top-0">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Code
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Credits
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Prerequisites
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-right">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading ? (
                                                    [...Array(5)].map((_, i) => (
                                                        <tr key={i} className="border-b border-gray-700/50 animate-pulse">
                                                            <td className="px-6 py-4">
                                                                <div className="h-4 bg-gray-700 rounded w-16"></div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="h-4 bg-gray-700 rounded w-32"></div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="h-4 bg-gray-700 rounded w-8"></div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="h-4 bg-gray-700 rounded w-24"></div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="h-4 bg-gray-700 rounded w-16"></div>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <div className="h-4 bg-gray-700 rounded w-20 ml-auto"></div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : filteredSubjects.length > 0 ? (
                                                    filteredSubjects.map((subject, index) => (
                                                        <motion.tr
                                                            key={`subject-${subject.id}`}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.2, delay: index * 0.03 }}
                                                            className="border-b border-gray-700/50 hover:bg-gray-800/30"
                                                        >
                                                            <td className="px-6 py-4 font-mono text-blue-400">{subject.courseCode}</td>
                                                            <td className="px-6 py-4 font-medium text-white">{subject.name}</td>
                                                            <td className="px-6 py-4">{subject.creditHours || "-"}</td>
                                                            <td className="px-6 py-4">
                                                                {subject.prerequisiteCourseNames?.length > 0 ? (
                                                                    <div className="flex flex-wrap gap-1">
                                                                        {subject.prerequisiteCourseNames.map((pre) => (
                                                                            <Badge key={pre} variant="outline" className="text-xs text-white">
                                                                                {pre}
                                                                            </Badge>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    "None"
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <Badge
                                                                    className={
                                                                        subject.isOpen ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                                                    }
                                                                >
                                                                    {subject.isOpen ? "Open" : "Closed"}
                                                                </Badge>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <div className="flex justify-end gap-2">
                                                                    <TooltipProvider>
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    size="sm"
                                                                                    variant="ghost"
                                                                                    onClick={() => handleToggleStatus(subject.id)}
                                                                                    className="text-gray-400 hover:text-amber-400 hover:bg-amber-500/10"
                                                                                >
                                                                                    {subject.isOpen ? <FaLock size={14} /> : <FaLockOpen size={14} />}
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                <p>{subject.isOpen ? "Close enrollment" : "Open enrollment"}</p>
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>

                                                                    <TooltipProvider>
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    size="sm"
                                                                                    variant="ghost"
                                                                                    className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                                                                                >
                                                                                    <FaEdit size={14} />
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                <p>Edit subject</p>
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>

                                                                    <TooltipProvider>
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    size="sm"
                                                                                    variant="ghost"
                                                                                    onClick={() => handleDelete(subject.id)}
                                                                                    className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                                                                                >
                                                                                    <FaTrash size={14} />
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                <p>Delete subject</p>
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>
                                                                </div>
                                                            </td>
                                                        </motion.tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={6} className="px-6 py-16 text-center">
                                                            <div className="flex flex-col items-center">
                                                                <div className="bg-gray-800/50 p-6 rounded-full inline-block mb-4">
                                                                    <FaBook className="text-gray-400 text-3xl" />
                                                                </div>
                                                                <h3 className="text-xl font-semibold text-white mb-2">No subjects found</h3>
                                                                <p className="text-gray-400 max-w-md mx-auto mb-4">
                                                                    {searchQuery
                                                                        ? "Try adjusting your search or filter"
                                                                        : "No subjects are currently registered"}
                                                                </p>
                                                                <NewSubjectForm onSuccess={fetchSubjects} Instructors={Instructors} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>

            {/* Floating Action Button for Mobile */}
            <div className="fixed bottom-6 right-6 md:hidden">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <NewSubjectForm onSuccess={fetchSubjects} Instructors={Instructors}>
                        <Button size="lg" className="rounded-full w-14 h-14 bg-indigo-600 hover:bg-indigo-700 shadow-lg">
                            <FiPlus size={24} />
                        </Button>
                    </NewSubjectForm>
                </motion.div>
            </div>
        </div>
    )
}
