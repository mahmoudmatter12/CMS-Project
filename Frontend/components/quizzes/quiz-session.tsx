"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, AlertCircle, ArrowLeft, ArrowRight, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { submitQuizAnswers } from "@/lib/api"
import Image from "next/image"
import { Answer, Quiz, QuizResult } from "@/types/types"

interface QuizSessionProps {
  quiz: Quiz
}

export function QuizSession({ quiz }: QuizSessionProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [timeLeft, setTimeLeft] = useState(quiz.duration * 60) // Convert minutes to seconds
  const [isFinished, setIsFinished] = useState(false)

  const currentQuestion = quiz.questions?.[currentStep] || null
  const progress = quiz.questions?.length
    ? ((currentStep + 1) / quiz.questions.length) * 100
    : 0

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    // Save the answer
    const existingAnswerIndex = answers.findIndex((a) => a.questionId === currentQuestion.questionText)

    if (existingAnswerIndex >= 0) {
      // Update existing answer
      const updatedAnswers = [...answers]
      updatedAnswers[existingAnswerIndex] = {
        questionId: currentQuestion.questionText,
        selectedAnswerIndex: selectedAnswer,
      }
      setAnswers(updatedAnswers)
    } else {
      // Add new answer
      setAnswers([
        ...answers,
        {
          questionId: currentQuestion.questionText,
          selectedAnswerIndex: selectedAnswer,
        },
      ])
    }

    // Move to next question or finish
    if (currentStep < quiz.questions.length - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedAnswer(null)
    } else {
      handleFinish()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)

      // Restore previous answer if it exists
      const previousAnswer = answers.find((a) => a.questionId === quiz.questions[currentStep - 1].questionText)

      setSelectedAnswer(previousAnswer ? previousAnswer.selectedAnswerIndex : null)
    }
  }

  const handleFinish = async () => {
    setIsSubmitting(true)
    setIsFinished(true)

    try {
      // Save the last answer if not already saved
      if (selectedAnswer !== null) {
        const existingAnswerIndex = answers.findIndex((a) => a.questionId === currentQuestion.questionText)

        if (existingAnswerIndex === -1) {
          setAnswers([
            ...answers,
            {
              questionId: currentQuestion.questionText,
              selectedAnswerIndex: selectedAnswer,
            },
          ])
        }
      }

      // Submit answers
      const result = await submitQuizAnswers({
        quizId: quiz.id,
        answers: answers,
      })

      setQuizResult(result)
    } catch (error) {
      console.error("Error submitting quiz:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format time left as mm:ss
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  if (quizResult) {
    return <QuizResults result={quizResult} quiz={quiz} />
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            Question {currentStep + 1} of {quiz.questions?.length ?? 0}
          </CardTitle>
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatTimeLeft()}</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>

      <CardContent className="pt-6">
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">{currentQuestion?.questionText}</h3>
          {currentQuestion?.imageUrl && (
            <div className="my-4">
              <Image
                src={currentQuestion.imageUrl}
                alt="Question image"
                className="max-w-full rounded-md"
                width={500}
                height={300}
                priority
              />
            </div>
          )}
        </div>

        <RadioGroup
          value={selectedAnswer?.toString() || ""}
          onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
          className="space-y-3"
        >
          {currentQuestion?.answers?.map((answer, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
                selectedAnswer === index ? "bg-gray-100 border-gray-300" : ""
              }`}
            >
              <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
              <Label htmlFor={`answer-${index}`} className="flex-grow cursor-pointer">
                {answer}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {currentQuestion?.hint && (
          <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Hint:</p>
              <p>{currentQuestion.hint}</p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>

        <Button onClick={handleNext} disabled={selectedAnswer === null || isSubmitting}>
          {currentStep < (quiz.questions?.length ?? 0) - 1 ? (
            <>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Finish Quiz"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

interface QuizResultsProps {
  result: QuizResult
  quiz: Quiz
}

function QuizResults({ result, quiz }: QuizResultsProps) {
  const router = useRouter()
  const percentage = Math.round((result.obtainedMarks / result.totalMarks) * 100)

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className={`${result.isPassed ? "bg-green-50" : "bg-red-50"} rounded-t-lg`}>
        <CardTitle className="text-center text-2xl">Quiz Results</CardTitle>
        <CardDescription className="text-center text-lg">
          {result.isPassed ? "Congratulations! You passed the quiz." : "You did not pass the quiz."}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="text-center mb-8">
          <div className="text-5xl font-bold mb-2">
            {result.obtainedMarks}/{result.totalMarks}
          </div>
          <p className="text-xl text-gray-500">{percentage}% Score</p>
          <div className="mt-4">
            <Progress
              value={percentage}
              className={`h-3 ${result.isPassed ? "bg-green-500" : "bg-red-500"}`}
            />
          </div>
          <p className="mt-4 text-gray-500">
            Passing score: {result.passingMarks}/{result.totalMarks}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Question Results:</h3>

          {result.questionsResult.map((qResult, index) => {
            const question = quiz.questions[index]
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  qResult.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start">
                  {qResult.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">{question.questionText}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {qResult.isCorrect
                        ? `Correct (+${qResult.awardedMarks} marks)`
                        : `Incorrect (0/${question.marks} marks)`}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>

      <CardFooter className="flex justify-center border-t pt-6">
        <Button onClick={() => router.push("/user/dashboard/quizzes")}>Back to Quizzes</Button>
      </CardFooter>
    </Card>
  )
}
