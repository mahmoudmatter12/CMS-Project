"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { AlertCircle, ArrowLeft, ArrowRight, Clock, CheckCircle } from "lucide-react"
import QuizQuestion from "./QuizQuestion"
import QuizResults from "./QuizResults"

interface Question {
  id: string
  text: string
  type: string
  options: string[]
  correctAnswer: number | string
  points: number
}

interface Quiz {
  id: string
  title: string
  timeLimit: number
  questions: Question[]
  passingScore: number
}

interface Answer {
  questionId: string
  selectedOption?: number
  textResponse?: string
  isCorrect?: boolean
}

interface QuizSessionProps {
  quiz: Quiz
  onComplete: (score: number) => void
}

export default function QuizSession({ quiz, onComplete }: QuizSessionProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60) // in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize answers array with empty answers for each question
  useEffect(() => {
    const initialAnswers = quiz.questions.map((question) => ({
      questionId: question.id,
      selectedOption: undefined,
      textResponse: undefined,
      isCorrect: undefined,
    }))
    setAnswers(initialAnswers)
  }, [quiz.questions])

  // Timer effect
  useEffect(() => {
    // Start the timer
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up, submit the quiz
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Store session start time in localStorage
    const sessionData = {
      quizId: quiz.id,
      startTime: Date.now(),
      timeLimit: quiz.timeLimit * 60,
      answers: [],
    }
    localStorage.setItem(`quiz_session_${quiz.id}`, JSON.stringify(sessionData))

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [quiz.id, quiz.timeLimit])

  // Save answers to localStorage whenever they change
  useEffect(() => {
    const sessionData = localStorage.getItem(`quiz_session_${quiz.id}`)
    if (sessionData) {
      const parsedData = JSON.parse(sessionData)
      localStorage.setItem(
        `quiz_session_${quiz.id}`,
        JSON.stringify({
          ...parsedData,
          answers,
        }),
      )
    }
  }, [answers, quiz.id])

  // Handle browser refresh or tab close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = "You have an active quiz session. Are you sure you want to leave?"
      return e.returnValue
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  // Format time remaining as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (questionId: string, answer: Partial<Answer>) => {
    setAnswers((prev) => prev.map((a) => (a.questionId === questionId ? { ...a, ...answer } : a)))
  }

  const handleNextQuestion = () => {
    if (currentStep < quiz.questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const calculateScore = () => {
    let totalPoints = 0
    let earnedPoints = 0

    quiz.questions.forEach((question, index) => {
      const answer = answers[index]
      totalPoints += question.points

      let isCorrect = false

      if (question.type === "SHORT_ANSWER") {
        // For short answer, compare text (case insensitive)
        const correctAnswer =
          typeof question.correctAnswer === "string" ? question.correctAnswer.toLowerCase().trim() : ""
        const userAnswer = answer.textResponse?.toLowerCase().trim() || ""
        isCorrect = userAnswer !== "" && correctAnswer === userAnswer
      } else {
        // For multiple choice or true/false
        isCorrect = answer.selectedOption === question.correctAnswer
      }

      // Update the answer with correctness
      setAnswers((prev) => prev.map((a, i) => (i === index ? { ...a, isCorrect } : a)))

      if (isCorrect) {
        earnedPoints += question.points
      }
    })

    // Calculate percentage score
    const percentageScore = Math.round((earnedPoints / totalPoints) * 100)
    return percentageScore
  }

  const handleSubmitQuiz = async () => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      // Stop the timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      // Calculate the score
      const calculatedScore = calculateScore()
      setScore(calculatedScore)

      // Submit the quiz results to the server
      const response = await fetch("/api/quizzes/quiz-attempts/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizId: quiz.id,
          answers: answers,
          score: calculatedScore,
          timeSpent: quiz.timeLimit * 60 - timeRemaining,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit quiz")
      }

      // Clear the session data
      localStorage.removeItem(`quiz_session_${quiz.id}`)

      // Show the results
      setQuizCompleted(true)

      // Call the onComplete callback
      onComplete(calculatedScore)
    } catch (error) {
      console.error("Error submitting quiz:", error)
      toast.error("Failed to submit quiz. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // If quiz is completed, show results
  if (quizCompleted) {
    return <QuizResults quiz={quiz} answers={answers} score={score} onFinish={() => router.push("/user/quizzes")} />
  }

  const currentQuestion = quiz.questions[currentStep]
  const progress = ((currentStep + 1) / quiz.questions.length) * 100
  const currentAnswer = answers[currentStep]
  const isLastQuestion = currentStep === quiz.questions.length - 1

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Timer and Progress Bar */}
      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className={`h-5 w-5 ${timeRemaining < 60 ? "text-red-500 animate-pulse" : "text-indigo-400"}`} />
            <span className={`font-mono text-lg font-bold ${timeRemaining < 60 ? "text-red-500" : "text-white"}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
          <div className="text-gray-400">
            Question {currentStep + 1} of {quiz.questions.length}
          </div>
        </div>
        <Progress value={progress} className="h-2 bg-gray-700" indicatorClassName="bg-indigo-500" />
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="bg-indigo-500 text-white text-sm px-2 py-1 rounded">{currentStep + 1}</span>
            {currentQuestion.text}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <QuizQuestion
            question={currentQuestion}
            answer={currentAnswer}
            onChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
          />
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevQuestion}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              {isSubmitting ? "Submitting..." : "Submit Quiz"} <CheckCircle className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Navigation buttons for all questions */}
      <div className="mt-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {quiz.questions.map((_, index) => {
            const isAnswered =
              answers[index]?.selectedOption !== undefined || answers[index]?.textResponse !== undefined

            return (
              <Button
                key={index}
                variant={currentStep === index ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentStep(index)}
                className={`w-10 h-10 p-0 ${
                  isAnswered
                    ? "bg-indigo-500/20 border-indigo-500 text-indigo-400"
                    : "bg-gray-800 border-gray-700 text-gray-400"
                } ${currentStep === index ? "ring-2 ring-indigo-500" : ""}`}
              >
                {index + 1}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Warning about leaving */}
      <div className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-400 font-medium">Warning</p>
          <p className="text-gray-400 text-sm">
            If you leave this page, the timer will continue to run. Your answers are saved automatically, but you must
            return and submit before the time expires.
          </p>
        </div>
      </div>
    </div>
  )
}

