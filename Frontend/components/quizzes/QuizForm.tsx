"use client"

import { useState, useRef } from "react"
import { useForm, type SubmitHandler, Controller, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { AlertCircle, Award, ChevronLeft, ChevronRight, Clock, Hash, Loader2, Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"

// Zod schema for validation
const quizSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100),
    description: z.string().max(500).optional(),
    subjectId: z.string().min(1, "Subject is required"),
    isPublished: z.boolean().default(false),
    dueDate: z.string().optional().nullable(),
    timeLimit: z.number().min(1, "Minimum 1 minute").max(300, "Maximum 5 hours"),
    maxAttempts: z.number().min(0, "Must be 0 or more").default(0),
    passingScore: z.number().min(0, "Minimum 0%").max(100, "Maximum 100%").default(60),
    questions: z
        .array(
            z.object({
                text: z.string().min(5, "Question must be at least 5 characters"),
                type: z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE", "SHORT_ANSWER"]),
                options: z.array(z.string().min(1, "Option cannot be empty")).min(2, "At least 2 options required"),
                correctAnswer: z.number().min(0, "Select a correct answer"),
                points: z.number().min(1, "Minimum 1 point").default(1),
                textAnswer: z.string().optional(),
            }),
        )
        .min(1, "At least one question is required"),
})

type QuizFormValues = z.infer<typeof quizSchema>

interface QuizFormProps {
    subjects: { id: string; name: string; subjectCode: string }[]
    defaultValues?: Partial<QuizFormValues> & { id?: string }
    isEdit?: boolean
    onSuccess?: () => void
}


export function QuizForm({ subjects, defaultValues, isEdit = false, onSuccess }: QuizFormProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formRef = useRef<HTMLFormElement>(null)

    const {
        register,
        // handleSubmit,
        control,
        reset,
        watch,
        // setValue,
        getValues,
        formState: { errors },
    } = useForm<QuizFormValues>({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            title: "",
            description: "",
            subjectId: "",
            isPublished: false,
            dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
            timeLimit: 30,
            maxAttempts: 0,
            passingScore: 60,
            questions: [],
            ...defaultValues,
        },
        mode: "onChange",
    })

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "questions",
    })



    const handleFormSubmit: SubmitHandler<QuizFormValues> = async (data) => {
        // Get the complete form data from React Hook Form
        const formData = getValues()
        console.log("Form data from React Hook Form:", formData)
        console.log("Form data from the function handel :", data)

        if (!confirm("Are you sure you want to submit the quiz?")) {
            return
        }

        setIsSubmitting(true)

        try {
            const endpoint = isEdit ? `/api/quizzes/${defaultValues?.id}/update` : "/api/quizzes/create"

            // Log the data being sent to the API
            console.log("Sending data to API:", formData)

            const response = await fetch(endpoint, {
                method: isEdit ? "PATCH" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
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

    const addQuestion = (type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER") => {
        const baseQuestion = {
            text: "",
            type,
            points: 1,
            correctAnswer: 0,
            options: type === "TRUE_FALSE" ? ["True", "False"] : type === "MULTIPLE_CHOICE" ? ["", ""] : [""],
        }
        append(baseQuestion)
        setCurrentStep(2)
    }

    const addOption = (questionIndex: number) => {
        const currentQuestion = fields[questionIndex]
        update(questionIndex, {
            ...currentQuestion,
            options: [...currentQuestion.options, ""]
        })
    }


    const removeOption = (questionIndex: number, optionIndex: number) => {
        const currentQuestion = fields[questionIndex]
        const newOptions = currentQuestion.options.filter((_, idx) => idx !== optionIndex)

        update(questionIndex, {
            ...currentQuestion,
            options: newOptions,
            // Adjust correct answer if needed
            correctAnswer: currentQuestion.correctAnswer >= optionIndex
                ? Math.max(0, currentQuestion.correctAnswer - 1)
                : currentQuestion.correctAnswer
        })
    }

    const isStep1Valid = watch("title") && watch("subjectId")
    const totalPoints = fields.reduce((sum, field) => sum + (field.points || 1), 0)


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
                <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus size={16} />
                    {isEdit ? "Edit Quiz" : "Create Quiz"}
                </Button>
            </DialogTrigger>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                className="sm:max-w-2xl bg-gray-900/80 backdrop-blur-sm border-gray-700 max-h-[90vh] overflow-y-auto"
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl text-white">
                        <AlertCircle className="h-5 w-5 text-indigo-400" />
                        {isEdit ? "Edit Quiz" : "Create New Quiz"}
                    </DialogTitle>
                </DialogHeader>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-6">
                    <div className={`flex items-center ${currentStep === 1 ? "text-indigo-400" : "text-gray-400"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? "bg-indigo-600 text-white" : "bg-gray-700"
                            }`}>
                            1
                        </div>
                        <span className="ml-2 font-medium">Quiz Details</span>
                    </div>

                    <div className="flex-1 h-px bg-gray-700 mx-4"></div>

                    <div className={`flex items-center ${currentStep === 2 ? "text-indigo-400" : "text-gray-400"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? "bg-indigo-600 text-white" : "bg-gray-700"
                            }`}>
                            2
                        </div>
                        <span className="ml-2 font-medium">Questions</span>
                    </div>
                </div>

                <form
                    ref={formRef}
                    onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(formRef.current!)
                        const data = Object.fromEntries(formData.entries())
                        const quizData = {
                            title: data.title as string,
                            description: data.description as string,
                            subjectId: data.subjectId as string,
                            isPublished: data.isPublished === "true",
                            dueDate: data.dueDate ? (data.dueDate as string) : null,
                            timeLimit: parseInt(data.timeLimit as string, 10),
                            maxAttempts: parseInt(data.maxAttempts as string, 10),
                            passingScore: parseInt(data.passingScore as string, 10),
                            questions: fields.map((field, index) => ({
                                text: data[`questions.${index}.text`] as string,
                                type: data[`questions.${index}.type`] as "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER",
                                points: parseInt(data[`questions.${index}.points`] as string, 10),
                                options: Array.isArray(data[`questions.${index}.options`])
                                    ? (typeof data[`questions.${index}.options`] === "string"
                                        ? (data[`questions.${index}.options`] as string).split(",")
                                        : [])
                                    : [(data[`questions.${index}.options.0`] as string)],
                                correctAnswer: parseInt(data[`questions.${index}.correctAnswer`] as string, 10) || 0,
                            })),
                        }
                        handleFormSubmit(quizData)
                    }}
                    className="space-y-6"
                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                >
                    {/* Step 1: Quiz Details */}
                    <div className={currentStep !== 1 ? "hidden" : "space-y-4"}>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Quiz Title */}
                            <div className="space-y-2 col-span-2">
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

                            {/* Subject Selection */}
                            <div className="space-y-2">
                                <Label htmlFor="subject" className="text-white">
                                    Subject <span className="text-rose-500">*</span>
                                </Label>
                                <Controller
                                    name="subjectId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger
                                                id="subject"
                                                className={`bg-gray-800 border-gray-700 text-white ${errors.subjectId ? "border-rose-500" : ""}`}
                                            >
                                                <SelectValue placeholder="Select subject" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                                {subjects.map((subject) => (
                                                    <SelectItem
                                                        key={subject.id}
                                                        value={subject.id}
                                                        className="hover:bg-gray-700"
                                                    >
                                                        {subject.subjectCode} - {subject.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.subjectId && <p className="text-rose-500 text-sm">{errors.subjectId.message}</p>}
                                <input type="hidden" name="subjectId" value={watch("subjectId")} />
                            </div>

                            {/* Time Limit */}
                            <div className="space-y-2">
                                <Label htmlFor="timeLimit" className="flex items-center gap-2 text-white">
                                    <Clock className="h-4 w-4 text-indigo-400" /> Time Limit (mins) <span className="text-rose-500">*</span>
                                </Label>
                                <Input
                                    id="timeLimit"
                                    type="number"
                                    {...register("timeLimit", { valueAsNumber: true })}
                                    min="1"
                                    max="300"
                                    className={`bg-gray-800 border-gray-700 text-white ${errors.timeLimit ? "border-rose-500" : ""}`}
                                />
                                {errors.timeLimit && <p className="text-rose-500 text-sm">{errors.timeLimit.message}</p>}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-white">Description</Label>
                            <Textarea
                                id="description"
                                {...register("description")}
                                placeholder="Brief description of the quiz"
                                rows={3}
                                className="bg-gray-800 border-gray-700 text-white resize-none"
                            // value={isEdit ? watch("description") : ""}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {/* Max Attempts */}
                            <div className="space-y-2">
                                <Label htmlFor="maxAttempts" className="flex items-center gap-2 text-white">
                                    <Hash className="h-4 w-4 text-indigo-400" /> Max Attempts
                                </Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Input
                                                id="maxAttempts"
                                                type="number"
                                                {...register("maxAttempts", { valueAsNumber: true })}
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

                            {/* Passing Score */}
                            <div className="space-y-2">
                                <Label htmlFor="passingScore" className="flex items-center gap-2 text-white">
                                    <Award className="h-4 w-4 text-indigo-400" /> Passing Score (%)
                                </Label>
                                <Input
                                    id="passingScore"
                                    type="number"
                                    {...register("passingScore", { valueAsNumber: true })}
                                    min="0"
                                    max="100"
                                    className="bg-gray-800 border-gray-700 text-white"
                                />
                            </div>

                            {/* Due Date */}
                            <div className="space-y-2">
                                <Label htmlFor="dueDate" className="text-white">Due Date</Label>
                                <Input
                                    id="dueDate"
                                    type="datetime-local"
                                    {...register("dueDate")}
                                    min={new Date().toISOString().slice(0, 16)}
                                    className="bg-gray-800 border-gray-700 text-white"
                                />
                            </div>
                        </div>

                        {/* Publish Toggle */}
                        <Card className="bg-gray-800/50 border-gray-700">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <Controller
                                        name="isPublished"
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                <Checkbox
                                                    id="isPublished"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="h-5 w-5 border-gray-600 data-[state=checked]:bg-indigo-600"
                                                />
                                                <Label htmlFor="isPublished" className="text-white cursor-pointer">
                                                    Publish this quiz immediately
                                                </Label>
                                                <input type="hidden" name="isPublished" value={field.value ? "true" : "false"} />
                                            </>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Step 2: Questions */}
                    <div className={currentStep !== 2 ? "hidden" : "space-y-4"}>
                        {/* Summary */}
                        <Card className="bg-indigo-500/10 border-indigo-500/30">
                            <CardContent className="p-4">
                                <div className="flex flex-wrap gap-2 justify-between items-center">
                                    <h3 className="font-medium text-white">{watch("title") || "Untitled Quiz"}</h3>
                                    <div className="flex gap-2">
                                        <Badge variant="outline" className="flex items-center gap-1 bg-gray-800/50 border-gray-700 text-indigo-400">
                                            <Clock className="h-3 w-3" /> {watch("timeLimit")} min
                                        </Badge>
                                        <Badge variant="outline" className="flex items-center gap-1 bg-gray-800/50 border-gray-700 text-indigo-400">
                                            <AlertCircle className="h-3 w-3" /> {fields.length} questions
                                        </Badge>
                                        <Badge variant="outline" className="flex items-center gap-1 bg-gray-800/50 border-gray-700 text-indigo-400">
                                            <Award className="h-3 w-3" /> {totalPoints} points
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Question Type Buttons */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-col h-24 gap-2 bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-indigo-500/20 hover:border-indigo-500/30"
                                onClick={() => addQuestion("MULTIPLE_CHOICE")}
                            >
                                <AlertCircle className="h-5 w-5 text-indigo-400" />
                                Multiple Choice
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-col h-24 gap-2 bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-indigo-500/20 hover:border-indigo-500/30"
                                onClick={() => addQuestion("TRUE_FALSE")}
                            >
                                <AlertCircle className="h-5 w-5 text-indigo-400" />
                                True/False
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-col h-24 gap-2 bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-indigo-500/20 hover:border-indigo-500/30"
                                onClick={() => addQuestion("SHORT_ANSWER")}
                            >
                                <AlertCircle className="h-5 w-5 text-indigo-400" />
                                Short Answer
                            </Button>
                        </div>

                        {/* Questions List */}
                        {fields.length === 0 ? (
                            <div className="text-center py-8 text-gray-400 border border-dashed border-gray-600 rounded-lg">
                                No questions added yet. Select a question type above.
                            </div>
                        ) : (
                            <ScrollArea className="h-[350px]">
                                <div className="space-y-6">
                                    {fields.map((question, qIndex) => (
                                        <Card key={question.id} className="overflow-hidden bg-gray-800/50 border-gray-700">
                                            <div className="bg-gray-700/50 px-4 py-2 flex justify-between items-center">
                                                <h4 className="font-medium flex items-center gap-2 text-white">
                                                    Question {qIndex + 1}
                                                    <Badge variant="outline" className="bg-gray-800/50 border-gray-700 text-indigo-400">
                                                        {question.type.replace("_", " ").toLowerCase()}
                                                    </Badge>
                                                </h4>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                                                    onClick={() => remove(qIndex)}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                            <CardContent className="p-4 space-y-4">
                                                {/* Question Text */}
                                                <div className="space-y-2">
                                                    <Label htmlFor={`question-${qIndex}`} className="text-white">
                                                        Question Text <span className="text-rose-500">*</span>
                                                    </Label>
                                                    <Input
                                                        id={`question-${qIndex}`}
                                                        {...register(`questions.${qIndex}.text`)}
                                                        defaultValue={isEdit ? question.text : ""}
                                                        className={`bg-gray-800 border-gray-700 text-white ${errors.questions?.[qIndex]?.text ? "border-rose-500" : ""
                                                            }`}
                                                    />
                                                    {errors.questions?.[qIndex]?.text && (
                                                        <p className="text-rose-500 text-sm">{errors.questions[qIndex]?.text?.message}</p>
                                                    )}
                                                </div>

                                                {/* Question Points */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`points-${qIndex}`} className="text-white">
                                                            Points <span className="text-rose-500">*</span>
                                                        </Label>
                                                        <Input
                                                            id={`points-${qIndex}`}
                                                            type="number"
                                                            {...register(`questions.${qIndex}.points`, { valueAsNumber: true })}
                                                            defaultValue={isEdit ? question.points : 1}
                                                            min="1"
                                                            className="bg-gray-800 border-gray-700 text-white"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Options (for multiple choice/true-false) */}
                                                {(question.type === "MULTIPLE_CHOICE" || question.type === "TRUE_FALSE") && (
                                                    <div className="space-y-3">
                                                        <Label className="text-white">
                                                            Options <span className="text-rose-500">*</span>
                                                        </Label>
                                                        {question.options.map((option, oIndex) => (
                                                            <div key={oIndex} className="flex items-center gap-3">
                                                                <input
                                                                    type="radio"
                                                                    id={`option-${qIndex}-${oIndex}`}
                                                                    {...register(`questions.${qIndex}.correctAnswer`)}
                                                                    value={oIndex}
                                                                    defaultChecked={isEdit && question.correctAnswer === oIndex}
                                                                    className="h-4 w-4 text-indigo-600"
                                                                />
                                                                <Input
                                                                    {...register(`questions.${qIndex}.options.${oIndex}`)}
                                                                    defaultValue={isEdit ? option : ""}
                                                                    className={`bg-gray-800 border-gray-700 text-white ${errors.questions?.[qIndex]?.options?.[oIndex] ? "border-rose-500" : ""
                                                                        }`}
                                                                    placeholder={`Option ${oIndex + 1}`}
                                                                />
                                                                {question.type === "MULTIPLE_CHOICE" && question.options.length > 2 && (
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                                                                        onClick={() => removeOption(qIndex, oIndex)}
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        ))}
                                                        {question.type === "MULTIPLE_CHOICE" && (
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
                                                {question.type === "SHORT_ANSWER" && (
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`answer-${qIndex}`} className="text-white">
                                                            Correct Answer <span className="text-rose-500">*</span>
                                                        </Label>
                                                        <Input
                                                            id={`answer-${qIndex}`}
                                                            {...register(`questions.${qIndex}.options.0`)}
                                                            defaultValue={isEdit ? question.textAnswer : "no answer"}
                                                            placeholder="Enter the correct answer"
                                                            className="bg-gray-800 border-gray-700 text-white"
                                                        />
                                                    </div>
                                                )}

                                                <input type="hidden" name={`questions.${qIndex}.type`} value={question.type} />
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>
                        )}
                    </div>

                    {/* Form Navigation */}
                    <div className="flex justify-between pt-4 border-t border-gray-700">
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
