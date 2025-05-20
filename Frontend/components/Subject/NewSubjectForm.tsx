"use client"

import type React from "react"

import { useState } from "react"
import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { FiPlus, FiEdit2, FiBook, FiLock, FiBookOpen, FiUser } from "react-icons/fi"
import { FaGraduationCap } from "react-icons/fa"
import { createCourseSchema } from "@/lib/schemas/CreateCourse"
import { useCourseData } from "@/lib/hooks/use-course-data"
import { MultiSelect } from "./multi-select"
import type { User } from "@/types/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

type SubjectFormValues = z.infer<typeof createCourseSchema>

interface SubjectFormProps {
    defaultValues?: Partial<SubjectFormValues>
    isEdit?: boolean
    onSuccess?: () => void
    onOpenChange?: (open: boolean) => void
    children?: React.ReactNode
    Instructors: User[] | null
}

export default function NewSubjectForm({
    defaultValues,
    isEdit = false,
    onSuccess,
    onOpenChange,
    Instructors,
}: SubjectFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { departments, courses, isLoadingDepartments, isLoadingCourses } = useCourseData()

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isDirty },
        setValue,
        watch,
    } = useForm<SubjectFormValues>({
        resolver: zodResolver(createCourseSchema),
        defaultValues: {
            name: "",
            courseCode: "",
            isOpen: false,
            prerequisiteCourseIds: [],
            creditHours: 3,
            semester: 1,
            ...defaultValues,
        },
    })

    const selectedInstructorId = watch("InstructorId")

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
        if (!open) reset()
        onOpenChange?.(open)
    }

    const handleFormSubmit: SubmitHandler<SubjectFormValues> = async (data) => {
        console.log("Form data:", data)
        setIsSubmitting(true)
        try {
            const response = await fetch("http://localhost:5168/api/Admin/course/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const error = await response.json()
                toast.error(error.error || "An error occurred")
                return
            }

            toast.success(`Subject ${isEdit ? "updated" : "created"} successfully!`)
            handleOpenChange(false)
            onSuccess?.()
            reset()
        } catch (error) {
            console.error(error)
            toast.error(error instanceof Error ? error.message : "An error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Convert courses to options format for MultiSelect
    const prerequisiteOptions = courses.map((course) => ({
        id: course.id,
        label: `${course.courseCode} - ${course.name}`,
    }))

    const selectInstructor = (instructorId: string) => {
        setValue("InstructorId", instructorId, { shouldValidate: true })
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white">
                    {isEdit ? (
                        <>
                            <FiEdit2 size={16} /> Edit Subject
                        </>
                    ) : (
                        <>
                            <FiPlus size={16} /> Add Subject
                        </>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-gray-900/80 backdrop-blur-sm border-gray-700 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-white">
                        <FiBook size={20} />
                        {isEdit ? "Edit Subject" : "Create New Subject"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Update the subject details below." : "Fill out the form to add a new subject."}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <h2 className="text-lg font-semibold text-white">Subject Details</h2>
                    <p className="text-sm text-gray-400">
                        {isEdit ? "Update the subject details below." : "Fill out the form to add a new subject."}
                    </p>
                </div>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            {/* Subject Code */}
                            <div className="space-y-2 text-white">
                                <Label htmlFor="subjectCode">Subject Code *</Label>
                                <Input
                                    id="subjectCode"
                                    placeholder="MATH101"
                                    {...register("courseCode")}
                                    className={errors.courseCode ? "border-red-500" : ""}
                                />
                                {errors.courseCode && <p className="text-sm text-red-500">{errors.courseCode.message}</p>}
                            </div>
                        </div>

                        {/* Subject Name */}
                        <div className="space-y-2 text-white">
                            <Label htmlFor="name">Subject Name *</Label>
                            <Input
                                id="name"
                                placeholder="Calculus I"
                                {...register("name")}
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>
                    </div>

                    {/* Department - Select this first to filter prerequisites */}
                    <div className="space-y-2">
                        <Label htmlFor="departmentId" className="text-white">
                            Department *
                        </Label>
                        <Controller
                            name="departmentId"
                            control={control}
                            render={({ field }) => (
                                <select id="departmentId" {...field} className="w-full p-2 border rounded-lg text-indigo-500 min-h-[50px] font-bold">
                                    <option value="">Select a department</option>
                                    {isLoadingDepartments ? (
                                        <option value="" disabled>
                                            Loading departments...
                                        </option>
                                    ) : (
                                        departments.map((department) => (
                                            <option key={department.id} value={department.id}>
                                                {department.name}
                                            </option>
                                        ))
                                    )}
                                </select>
                            )}
                        />
                        {errors.departmentId && <p className="text-sm text-red-500">{errors.departmentId.message}</p>}
                    </div>

                    {/* Instructor - Enhanced UI */}
                    <div className="space-y-2">
                        <Label className="text-white flex items-center gap-2">
                            <FiUser size={16} />
                            Instructor *
                        </Label>
                        <Controller
                            name="InstructorId"
                            control={control}
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {Instructors?.map((instructor) => (
                                            <motion.div
                                                key={instructor.id}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => selectInstructor(instructor.id)}
                                                className={`relative cursor-pointer rounded-lg p-4 transition-all duration-200 ${selectedInstructorId === instructor.id
                                                        ? "bg-gradient-to-br from-purple-700 to-blue-700 text-white shadow-lg"
                                                        : "bg-gray-800 hover:bg-gray-700 text-white"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-12 w-12 border-2 border-gray-700">
                                                        <AvatarImage
                                                            src={instructor.profilePicture || "/placeholder.svg?height=40&width=40"}
                                                            alt={instructor.fullname}
                                                        />
                                                        <AvatarFallback className="bg-gray-700 text-white">
                                                            {instructor.fullname
                                                                .split(" ")
                                                                .map((name) => name[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium truncate">{instructor.fullname}</p>
                                                        <p className="text-xs opacity-70 truncate">{instructor.depName}</p>
                                                    </div>
                                                </div>
                                                {selectedInstructorId === instructor.id && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute top-2 right-2 h-5 w-5 bg-white rounded-full flex items-center justify-center"
                                                    >
                                                        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <input type="hidden" {...field} value={field.value || ""} />
                                </div>
                            )}
                        />
                        {errors.InstructorId && <p className="text-sm text-red-500">{errors.InstructorId.message}</p>}
                    </div>

                    {/* Prerequisites - Using custom MultiSelect component */}
                    <Controller
                        name="prerequisiteCourseIds"
                        control={control}
                        render={({ field }) => (
                            <MultiSelect
                                label="Prerequisites"
                                options={prerequisiteOptions}
                                selectedValues={field.value || []}
                                onChange={field.onChange}
                                error={errors.prerequisiteCourseIds?.message}
                                isLoading={isLoadingCourses}
                            />
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        {/* Credit Hours */}
                        <div className="space-y-2 ">
                            <Label htmlFor="creditHours" className="text-white">
                                Credit Hours
                            </Label>
                            <Controller
                                name="creditHours"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <Input
                                            id="creditHours"
                                            type="number"
                                            min="1"
                                            max="6"
                                            {...field}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                            className="pl-10 text-white min-h-[50px]"
                                        />
                                        <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                )}
                            />
                            {errors.creditHours && <p className="text-sm text-red-500">{errors.creditHours.message}</p>}
                        </div>

                        {/* Semester */}
                        <div className="space-y-2">
                            <Label htmlFor="semester" className="text-white">
                                Semester
                            </Label>
                            <Controller
                                name="semester"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="semester"
                                        type="number"
                                        min="1"
                                        max="2"
                                        {...field}
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        className="text-white min-h-[50px]"
                                    />
                                )}
                            />
                            {errors.semester && <p className="text-sm text-red-500">{errors.semester.message}</p>}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <Label className="text-white">Status</Label>
                        <Controller
                            name="isOpen"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center gap-3 p-2 border rounded-lg text-white min-h-[50px]">
                                    {field.value ? <FiBookOpen className="text-green-500" /> : <FiLock className="text-red-500" />}
                                    <Label htmlFor="isOpen" className="flex-1 cursor-pointer">
                                        {field.value ? "Open for Enrollment" : "Closed for Enrollment"}
                                    </Label>
                                    <Checkbox id="isOpen" checked={field.value} onCheckedChange={field.onChange} className="h-5 w-5" />
                                </div>
                            )}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            onClick={() => handleOpenChange(false)}
                            className="gap-2 cursor-pointer  bg-red-600 hover:bg-red-700 text-white border border-red-600"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || (!isEdit && !isDirty)}
                            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white"
                            onClick={() => {
                                if (isEdit) {
                                    toast("Updating subject...")
                                } else {
                                    toast("Creating subject...")
                                }
                            }}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin">↻</span> Processing...
                                </>
                            ) : isEdit ? (
                                "Update Subject"
                            ) : (
                                "Create Subject"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
