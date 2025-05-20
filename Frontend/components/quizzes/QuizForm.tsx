"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useForm, type SubmitHandler, Controller, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
    AlertCircle,
    Award,
    BookOpen,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    FileQuestion,
    Hash,
    HelpCircle,
    Loader2,
    Plus,
    Trash2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { quizSchema } from "@/lib/schemas"
import { QuestionType, type Quiz, type Question } from "@/types/types"
import { useCurrentUser } from "@/lib/hooks/UseUser"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Type for form values based on the provided schema
type QuizFormValues = z.infer<typeof quizSchema>

interface QuizFormProps {
    courses: { id: string; name: string; courseCode: string }[]
    defaultValues?: Partial<Quiz>
    isEdit?: boolean
    onSuccess?: () => void
    children?: React.ReactNode
}

export function QuizForm({ courses, defaultValues, isEdit = false, onSuccess, children }: QuizFormProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { user } = useCurrentUser()

    const formRef = useRef<HTMLFormElement>(null)

    const {
        register,
        control,
        reset,
        watch,
        getValues,
        formState: { errors },
    } = useForm<QuizFormValues>({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            title: "",
            description: "",
            duration: 60, // 60 minutes by default
            passingMarks: 50,
            isActive: false,
            startDate: null,
            endDate: null,
            totalMarks: 0,
            totalQuestions: 0,
            creatorId: user?.id || "",
            courseId: "",
            MaxAttempts: 0,
            questions: [] as Question[],
            ...defaultValues,
        },
        mode: "onChange",
    })

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "questions",
    })

    const handleFormSubmit: SubmitHandler<QuizFormValues> = async (data) => {
        if (!confirm("Are you sure you want to submit the quiz?")) {
            return
        }

        setIsSubmitting(true)

        try {
            // Calculate total marks and questions
            const totalMarks = data.questions.reduce((sum, q) => sum + q.marks, 0)
            const totalQuestions = data.questions.length

            // Create the complete quiz object
            const quizData = {
                ...data,
                questions: data.questions.map((q) => ({
                    ...q,
                    type: Object.values(QuestionType).indexOf(q.type),
                })),
                totalMarks,
                totalQuestions,
                creatorId: user?.id || data.creatorId,
            }


            const endpoint = isEdit ? `/api/quizzes/${defaultValues?.id}/update` : "http://localhost:5168/api/Quiz/create"

            console.log("Sending quiz data:", quizData)

            const response = await fetch(endpoint, {
                method: isEdit ? "PATCH" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(quizData),
            })

            if (!response.ok) {
                const errorText = await response.text()
                console.error("Error response:", errorText)
                throw new Error(errorText)
            }

            toast.success(isEdit ? "Quiz updated successfully!" : "Quiz created successfully!")
            setIsOpen(false)
            onSuccess?.()
            reset()
        } catch (error) {
            console.error("Error:", error)
            const errorMessage = error instanceof Error ? error.message : `Failed to ${isEdit ? "update" : "create"} quiz`
            toast.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    const addQuestion = (type: QuestionType) => {
        const baseQuestion: Question = {
            questionText: "",
            type,
            marks: 1,
            correctAnswerIndex: type === QuestionType.TRUE_FALSE ? 0 : 0,
            answers:
                type === QuestionType.TRUE_FALSE ? ["True", "False"] : type === QuestionType.MULTIPLE_CHOICE ? ["", ""] : [""],
            hint: "",
            explanation: "",
            imageUrl: "",
            tags: [],
        }
        append(baseQuestion)
        setCurrentStep(2)
    }

    const addOption = (questionIndex: number) => {
        const currentQuestion = fields[questionIndex]
        update(questionIndex, {
            ...currentQuestion,
            answers: [...currentQuestion.answers, ""],
        })
    }

    const removeOption = (questionIndex: number, optionIndex: number) => {
        const currentQuestion = fields[questionIndex]
        const newAnswers = currentQuestion.answers.filter((_, idx) => idx !== optionIndex)

        update(questionIndex, {
            ...currentQuestion,
            answers: newAnswers,
            // Adjust correct answer if needed
            correctAnswerIndex:
                typeof currentQuestion.correctAnswerIndex === "number" && currentQuestion.correctAnswerIndex >= optionIndex
                    ? Math.max(0, currentQuestion.correctAnswerIndex - 1)
                    : currentQuestion.correctAnswerIndex,
        })
    }

    // Calculate total marks for display
    const totalMarks = fields.reduce((sum, field) => sum + (Number(field.marks) || 0), 0)

    // Check if step 1 is valid
    const isStep1Valid = !!watch("title") && !!watch("courseId") && watch("duration") > 0 && watch("passingMarks") > 0

    // Get selected course details
    const selectedCourseId = watch("courseId")
    const selectedCourse = courses.find((course) => course.id === selectedCourseId)

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!isSubmitting) {
                    setIsOpen(open)
                }
            }}
        >
            <DialogTrigger asChild>
                {children || (
                    <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
                        <Plus size={16} />
                        {isEdit ? "Edit Quiz" : "Create Quiz"}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                className="sm:max-w-3xl bg-gray-900/80 backdrop-blur-sm border-gray-700 max-h-[90vh] overflow-y-auto"
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl text-white">
                        <FileQuestion className="h-5 w-5 text-indigo-400" />
                        {isEdit ? "Edit Quiz" : "Create New Quiz"}
                    </DialogTitle>
                </DialogHeader>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-6">
                    <div className={`flex items-center ${currentStep === 1 ? "text-indigo-400" : "text-gray-400"}`}>
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? "bg-indigo-600 text-white" : "bg-gray-700"
                                }`}
                        >
                            1
                        </div>
                        <span className="ml-2 font-medium">Quiz Details</span>
                    </div>

                    <div className="flex-1 h-px bg-gray-700 mx-4"></div>

                    <div className={`flex items-center ${currentStep === 2 ? "text-indigo-400" : "text-gray-400"}`}>
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? "bg-indigo-600 text-white" : "bg-gray-700"
                                }`}
                        >
                            2
                        </div>
                        <span className="ml-2 font-medium">Questions</span>
                    </div>
                </div>

                <form
                    ref={formRef}
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleFormSubmit(getValues())
                    }}
                    className="space-y-6"
                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                >
                    {/* Step 1: Quiz Details */}
                    <div className={currentStep !== 1 ? "hidden" : "space-y-6"}>
                        <Card className="bg-gray-800/50 border-gray-700">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg text-white flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-indigo-400" />
                                    Basic Information
                                </CardTitle>
                                <CardDescription>Enter the basic details for your quiz</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Quiz Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-white">
                                        Quiz Title <span className="text-rose-500">*</span>
                                    </Label>
                                    <Input
                                        id="title"
                                        {...register("title")}
                                        placeholder="Introduction to Calculus"
                                        className={`bg-gray-800 border-gray-700 text-white ${errors.title ? "border-rose-500" : ""}`}
                                    />
                                    {errors.title && <p className="text-rose-500 text-sm">{errors.title.message}</p>}
                                </div>

                                {/* Course Selection - Enhanced with Command */}

                                {/* Course Selection - Fixed Implementation */}
                                <div className="space-y-2">
                                    <Label htmlFor="course" className="text-white">
                                        Course <span className="text-rose-500">*</span>
                                    </Label>
                                    <Controller
                                        name="courseId"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value || ""}>
                                                <SelectTrigger
                                                    id="course"
                                                    className={`bg-gray-800 border-gray-700 text-white ${errors.courseId ? "border-rose-500" : ""}`}
                                                >
                                                    <SelectValue placeholder="Select course" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-[300px]">
                                                    <div className="px-2 py-1.5">
                                                        <Input
                                                            placeholder="Search courses..."
                                                            className="bg-gray-700 border-gray-600 text-white h-8"
                                                            onChange={(e) => {
                                                                // This doesn't actually filter the dropdown items, but in a real implementation
                                                                // you would filter the courses array based on this input
                                                                console.log("Searching for:", e.target.value)
                                                            }}
                                                        />
                                                    </div>
                                                    <Separator className="my-1 bg-gray-700" />
                                                    {courses.length === 0 ? (
                                                        <SelectItem value="empty" disabled className="text-gray-500">
                                                            No courses available
                                                        </SelectItem>
                                                    ) : (
                                                        courses.map((course) => (
                                                            <SelectItem
                                                                key={course.id}
                                                                value={course.id}
                                                                className="hover:bg-gray-700 focus:bg-gray-700"
                                                            >
                                                                <div className="flex flex-col">
                                                                    <span className="font-medium">{course.name}</span>
                                                                    <span className="text-xs text-gray-400">{course.courseCode}</span>
                                                                </div>
                                                            </SelectItem>
                                                        ))
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.courseId && <p className="text-rose-500 text-sm">{errors.courseId.message}</p>}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-white">
                                        Description <span className="text-rose-500">*</span>
                                    </Label>
                                    <Textarea
                                        id="description"
                                        {...register("description")}
                                        placeholder="Brief description of the quiz"
                                        rows={3}
                                        className={`bg-gray-800 border-gray-700 text-white resize-none ${errors.description ? "border-rose-500" : ""
                                            }`}
                                    />
                                    {errors.description && <p className="text-rose-500 text-sm">{errors.description.message}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 border-gray-700">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg text-white flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-indigo-400" />
                                    Quiz Settings
                                </CardTitle>
                                <CardDescription>Configure the quiz parameters</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="timing" className="w-full">
                                    <TabsList className="grid grid-cols-3 bg-gray-700/50">
                                        <TabsTrigger value="timing" className="data-[state=active]:bg-indigo-600">
                                            Timing
                                        </TabsTrigger>
                                        <TabsTrigger value="grading" className="data-[state=active]:bg-indigo-600">
                                            Grading
                                        </TabsTrigger>
                                        <TabsTrigger value="access" className="data-[state=active]:bg-indigo-600">
                                            Access
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="timing" className="pt-4 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* Duration */}
                                            <div className="space-y-2">
                                                <Label htmlFor="duration" className="flex items-center gap-2 text-white">
                                                    <Clock className="h-4 w-4 text-indigo-400" /> Duration (mins){" "}
                                                    <span className="text-rose-500">*</span>
                                                </Label>
                                                <Input
                                                    id="duration"
                                                    type="number"
                                                    {...register("duration", { valueAsNumber: true })}
                                                    min="1"
                                                    max="300"
                                                    className={`bg-gray-800 border-gray-700 text-white ${errors.duration ? "border-rose-500" : ""}`}
                                                />
                                                {errors.duration && <p className="text-rose-500 text-sm">{errors.duration.message}</p>}
                                            </div>

                                            {/* Start Date */}
                                            <div className="space-y-2">
                                                <Label htmlFor="startDate" className="flex items-center gap-2 text-white">
                                                    <Calendar className="h-4 w-4 text-indigo-400" /> Start Date
                                                </Label>
                                                <Controller
                                                    name="startDate"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            id="startDate"
                                                            type="datetime-local"
                                                            value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                                                            onChange={(e) => {
                                                                const date = e.target.value ? new Date(e.target.value) : null
                                                                field.onChange(date)
                                                            }}
                                                            className="bg-gray-800 border-gray-700 text-white"
                                                        />
                                                    )}
                                                />
                                            </div>

                                            {/* End Date */}
                                            <div className="space-y-2">
                                                <Label htmlFor="endDate" className="flex items-center gap-2 text-white">
                                                    <Calendar className="h-4 w-4 text-indigo-400" /> End Date
                                                </Label>
                                                <Controller
                                                    name="endDate"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            id="endDate"
                                                            type="datetime-local"
                                                            value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                                                            onChange={(e) => {
                                                                const date = e.target.value ? new Date(e.target.value) : null
                                                                field.onChange(date)
                                                            }}
                                                            className="bg-gray-800 border-gray-700 text-white"
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="grading" className="pt-4 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Passing Marks */}
                                            <div className="space-y-2">
                                                <Label htmlFor="passingMarks" className="flex items-center gap-2 text-white">
                                                    <Award className="h-4 w-4 text-indigo-400" /> Passing Marks (%)
                                                </Label>
                                                <Input
                                                    id="passingMarks"
                                                    type="number"
                                                    {...register("passingMarks", { valueAsNumber: true })}
                                                    min="0"
                                                    max="100"
                                                    className={`bg-gray-800 border-gray-700 text-white ${errors.passingMarks ? "border-rose-500" : ""}`}
                                                />
                                                {errors.passingMarks && <p className="text-rose-500 text-sm">{errors.passingMarks.message}</p>}
                                            </div>

                                            {/* Max Attempts */}
                                            <div className="space-y-2">
                                                <Label htmlFor="MaxAttempts" className="flex items-center gap-2 text-white">
                                                    <Hash className="h-4 w-4 text-indigo-400" /> Max Attempts
                                                </Label>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Input
                                                                id="MaxAttempts"
                                                                type="number"
                                                                {...register("MaxAttempts", { valueAsNumber: true })}
                                                                min="0"
                                                                placeholder="0 = unlimited"
                                                                className="bg-gray-800 border-gray-700 text-white"
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                                                            <p>Set to 0 for unlimited attempts</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="access" className="pt-4 space-y-4">
                                        {/* Active Toggle */}
                                        <div className="flex items-center space-x-2">
                                            <Controller
                                                name="isActive"
                                                control={control}
                                                render={({ field }) => (
                                                    <Checkbox
                                                        id="isActive"
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="h-5 w-5 border-gray-600 data-[state=checked]:bg-indigo-600"
                                                    />
                                                )}
                                            />
                                            <Label htmlFor="isActive" className="text-white cursor-pointer">
                                                Make this quiz active and available to students
                                            </Label>
                                        </div>

                                        {/* Creator ID (hidden) */}
                                        <div className="hidden">
                                            <Input id="creatorId" {...register("creatorId")} defaultValue={user?.id || ""} />
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        {/* Course Preview */}
                        {selectedCourse && (
                            <Card className="bg-indigo-900/20 border-indigo-500/30">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-white flex items-center gap-2">Selected Course</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-indigo-500/20 p-3 rounded-full">
                                            <BookOpen className="h-5 w-5 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white">{selectedCourse.name}</h3>
                                            <p className="text-sm text-gray-400">{selectedCourse.courseCode}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Step 2: Questions */}
                    <div className={currentStep !== 2 ? "hidden" : "space-y-6"}>
                        {/* Summary */}
                        <Card className="bg-indigo-900/20 border-indigo-500/30">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg text-white">{watch("title") || "Untitled Quiz"}</CardTitle>
                                {selectedCourse && (
                                    <CardDescription>
                                        {selectedCourse.courseCode} - {selectedCourse.name}
                                    </CardDescription>
                                )}
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="flex flex-wrap gap-3">
                                    <Badge
                                        variant="outline"
                                        className="flex items-center gap-1 bg-gray-800/50 border-gray-700 text-indigo-400"
                                    >
                                        <Clock className="h-3 w-3" /> {watch("duration")} min
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="flex items-center gap-1 bg-gray-800/50 border-gray-700 text-indigo-400"
                                    >
                                        <AlertCircle className="h-3 w-3" /> {fields.length} questions
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="flex items-center gap-1 bg-gray-800/50 border-gray-700 text-indigo-400"
                                    >
                                        <Award className="h-3 w-3" /> {totalMarks} points
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="flex items-center gap-1 bg-gray-800/50 border-gray-700 text-indigo-400"
                                    >
                                        <Hash className="h-3 w-3" /> {watch("passingMarks")}% passing
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Question Type Buttons */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-col h-24 gap-2 bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-indigo-500/20 hover:border-indigo-500/30"
                                onClick={() => addQuestion(QuestionType.MULTIPLE_CHOICE)}
                            >
                                <AlertCircle className="h-5 w-5 text-indigo-400" />
                                Multiple Choice
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-col h-24 gap-2 bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-indigo-500/20 hover:border-indigo-500/30"
                                onClick={() => addQuestion(QuestionType.TRUE_FALSE)}
                            >
                                <AlertCircle className="h-5 w-5 text-indigo-400" />
                                True/False
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-col h-24 gap-2 bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-indigo-500/20 hover:border-indigo-500/30"
                                onClick={() => addQuestion(QuestionType.SHORT_ANSWER)}
                            >
                                <AlertCircle className="h-5 w-5 text-indigo-400" />
                                Short Answer
                            </Button>
                        </div>

                        {/* Questions List */}
                        {fields.length === 0 ? (
                            <div className="text-center py-12 text-gray-400 border border-dashed border-gray-600 rounded-lg">
                                <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                                <h3 className="text-lg font-medium text-gray-300 mb-2">No questions added yet</h3>
                                <p className="text-sm max-w-md mx-auto mb-4">
                                    Select a question type above to start building your quiz
                                </p>
                            </div>
                        ) : (
                            <ScrollArea className="h-[400px]">
                                <div className="space-y-6">
                                    {fields.map((question, qIndex) => (
                                        <Card key={question.id} className="overflow-hidden bg-gray-800/50 border-gray-700">
                                            <CardHeader className="bg-gray-700/50 py-3 px-4 flex flex-row justify-between items-center space-y-0">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="bg-gray-800/50 border-gray-700 text-white">
                                                        Q{qIndex + 1}
                                                    </Badge>
                                                    <Badge variant="outline" className="bg-indigo-500/20 border-indigo-500/30 text-indigo-400">
                                                        {question.type.replace("_", " ")}
                                                    </Badge>
                                                    <Badge variant="outline" className="bg-amber-500/20 border-amber-500/30 text-amber-400">
                                                        {question.marks} {question.marks === 1 ? "point" : "points"}
                                                    </Badge>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                                                    onClick={() => remove(qIndex)}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </CardHeader>
                                            <CardContent className="p-4 space-y-4">
                                                {/* Question Text */}
                                                <div className="space-y-2">
                                                    <Label htmlFor={`question-${qIndex}`} className="text-white">
                                                        Question Text <span className="text-rose-500">*</span>
                                                    </Label>
                                                    <Input
                                                        id={`question-${qIndex}`}
                                                        {...register(`questions.${qIndex}.questionText`)}
                                                        className={`bg-gray-800 border-gray-700 text-white ${errors.questions?.[qIndex]?.questionText ? "border-rose-500" : ""
                                                            }`}
                                                    />
                                                    {errors.questions?.[qIndex]?.questionText && (
                                                        <p className="text-rose-500 text-sm">{errors.questions[qIndex]?.questionText?.message}</p>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {/* Question Marks */}
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`marks-${qIndex}`} className="text-white">
                                                            Marks <span className="text-rose-500">*</span>
                                                        </Label>
                                                        <Input
                                                            id={`marks-${qIndex}`}
                                                            type="number"
                                                            {...register(`questions.${qIndex}.marks`, { valueAsNumber: true })}
                                                            min="1"
                                                            className={`bg-gray-800 border-gray-700 text-white ${errors.questions?.[qIndex]?.marks ? "border-rose-500" : ""
                                                                }`}
                                                        />
                                                        {errors.questions?.[qIndex]?.marks && (
                                                            <p className="text-rose-500 text-sm">{errors.questions[qIndex]?.marks?.message}</p>
                                                        )}
                                                    </div>

                                                    {/* Optional: Hint */}
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`hint-${qIndex}`} className="text-white">
                                                            Hint (Optional)
                                                        </Label>
                                                        <Input
                                                            id={`hint-${qIndex}`}
                                                            {...register(`questions.${qIndex}.hint`)}
                                                            className="bg-gray-800 border-gray-700 text-white"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Options (for multiple choice/true-false) */}
                                                {(question.type === QuestionType.MULTIPLE_CHOICE ||
                                                    question.type === QuestionType.TRUE_FALSE) && (
                                                        <div className="space-y-3">
                                                            <Label className="text-white">
                                                                Options <span className="text-rose-500">*</span>
                                                            </Label>
                                                            {question.answers.map((answer, aIndex) => (
                                                                <div key={aIndex} className="flex items-center gap-3">
                                                                    <Controller
                                                                        name={`questions.${qIndex}.correctAnswerIndex`}
                                                                        control={control}
                                                                        render={({ field }) => (
                                                                            <input
                                                                                type="radio"
                                                                                id={`option-${qIndex}-${aIndex}`}
                                                                                checked={Number(field.value) === aIndex}
                                                                                onChange={() => field.onChange(aIndex)}
                                                                                className="h-4 w-4 text-indigo-600"
                                                                                title={`Select option ${aIndex + 1} as correct answer`}
                                                                            />
                                                                        )}
                                                                    />
                                                                    <Input
                                                                        {...register(`questions.${qIndex}.answers.${aIndex}`)}
                                                                        className={`bg-gray-800 border-gray-700 text-white ${errors.questions?.[qIndex]?.answers?.[aIndex] ? "border-rose-500" : ""
                                                                            }`}
                                                                        placeholder={`Option ${aIndex + 1}`}
                                                                    />
                                                                    {question.type === QuestionType.MULTIPLE_CHOICE && question.answers.length > 2 && (
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                                                                            onClick={() => removeOption(qIndex, aIndex)}
                                                                        >
                                                                            <Trash2 size={14} />
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                            {question.type === QuestionType.MULTIPLE_CHOICE && (
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="mt-2 bg-gray-800/50 border-gray-700 text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500/30"
                                                                    onClick={() => addOption(qIndex)}
                                                                >
                                                                    <Plus size={14} className="mr-2" />
                                                                    Add Option
                                                                </Button>
                                                            )}
                                                        </div>
                                                    )}

                                                {/* Short Answer */}
                                                {question.type === QuestionType.SHORT_ANSWER && (
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`answer-${qIndex}`} className="text-white">
                                                            Correct Answer <span className="text-rose-500">*</span>
                                                        </Label>
                                                        <Input
                                                            id={`answer-${qIndex}`}
                                                            {...register(`questions.${qIndex}.answers.0`)}
                                                            placeholder="Enter the correct answer"
                                                            className={`bg-gray-800 border-gray-700 text-white ${errors.questions?.[qIndex]?.answers?.[0] ? "border-rose-500" : ""
                                                                }`}
                                                        />
                                                        <Controller
                                                            name={`questions.${qIndex}.correctAnswerIndex`}
                                                            control={control}
                                                            defaultValue="0"
                                                            render={({ field }) => <input type="hidden" {...field} value="0" />}
                                                        />
                                                    </div>
                                                )}

                                                {/* Explanation (Optional) */}
                                                <div className="space-y-2">
                                                    <Label htmlFor={`explanation-${qIndex}`} className="text-white">
                                                        Explanation (Optional)
                                                    </Label>
                                                    <Textarea
                                                        id={`explanation-${qIndex}`}
                                                        {...register(`questions.${qIndex}.explanation`)}
                                                        placeholder="Explain why this answer is correct"
                                                        className="bg-gray-800 border-gray-700 text-white resize-none"
                                                        rows={2}
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>
                        )}
                    </div>

                    {/* Form Navigation */}
                    <Separator className="bg-gray-700" />
                    <div className="flex justify-between">
                        {currentStep === 2 ? (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setCurrentStep(1)}
                                className="flex items-center gap-2 bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700"
                            >
                                <ChevronLeft size={16} />
                                Back to Details
                            </Button>
                        ) : (
                            <div></div>
                        )}

                        <div className="flex gap-2">
                            {currentStep === 1 && (
                                <Button
                                    type="button"
                                    variant="default"
                                    onClick={() => setCurrentStep(2)}
                                    disabled={!isStep1Valid}
                                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Continue to Questions
                                    <ChevronRight size={16} />
                                </Button>
                            )}

                            {currentStep === 2 && (
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || fields.length === 0}
                                    variant="default"
                                    className="min-w-[120px] bg-indigo-600 hover:bg-indigo-700"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="animate-spin h-4 w-4" />
                                            {isEdit ? "Updating..." : "Creating..."}
                                        </span>
                                    ) : isEdit ? (
                                        "Update Quiz"
                                    ) : (
                                        "Create Quiz"
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

