"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Award, ArrowRight } from "lucide-react"

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
  questions: Question[]
  passingScore: number
}

interface Answer {
  questionId: string
  selectedOption?: number
  textResponse?: string
  isCorrect?: boolean
}

interface QuizResultsProps {
  quiz: Quiz
  answers: Answer[]
  score: number
  onFinish: () => void
}

export default function QuizResults({ quiz, answers, score, onFinish }: QuizResultsProps) {
  const isPassed = score >= quiz.passingScore

  const getAnswerText = (question: Question, answer: Answer) => {
    if (question.type === "SHORT_ANSWER") {
      return answer.textResponse || "No answer provided"
    } else {
      return answer.selectedOption !== undefined ? question.options[answer.selectedOption] : "No answer selected"
    }
  }

  const getCorrectAnswerText = (question: Question) => {
    if (question.type === "SHORT_ANSWER") {
      return question.correctAnswer as string
    } else {
      const correctIndex =
        typeof question.correctAnswer === "number"
          ? question.correctAnswer
          : Number.parseInt(question.correctAnswer as string)
      return question.options[correctIndex]
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card className="bg-gray-800/50 border-gray-700 mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-center text-2xl">Quiz Results</CardTitle>
        </CardHeader>

        <CardContent className="text-center py-8">
          <div
            className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-4 ${
              isPassed ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            }`}
          >
            <span className="text-4xl font-bold">{score}%</span>
          </div>

          <h3 className={`text-xl font-bold mb-2 ${isPassed ? "text-green-400" : "text-red-400"}`}>
            {isPassed ? "Congratulations! You passed!" : "You did not pass."}
          </h3>

          <p className="text-gray-400 mb-6">
            {isPassed
              ? "Great job on completing the quiz successfully."
              : `You needed ${quiz.passingScore}% to pass. Keep studying and try again!`}
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Passing Score</p>
              <p className="text-white text-xl font-bold">{quiz.passingScore}%</p>
            </div>

            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Your Score</p>
              <p className={`text-xl font-bold ${isPassed ? "text-green-400" : "text-red-400"}`}>{score}%</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pb-6">
          <Button onClick={onFinish} className="bg-indigo-600 hover:bg-indigo-700">
            Return to Quizzes
          </Button>
        </CardFooter>
      </Card>

      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Award className="h-6 w-6 text-indigo-400" />
        Question Review
      </h2>

      <div className="space-y-6">
        {quiz.questions.map((question, index) => {
          const answer = answers.find((a) => a.questionId === question.id)
          const isCorrect = answer?.isCorrect

          return (
            <Card
              key={question.id}
              className={`bg-gray-800/50 border-gray-700 ${
                isCorrect ? "border-l-4 border-l-green-500" : "border-l-4 border-l-red-500"
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white flex items-center gap-2">
                    <span className="bg-gray-700 text-white text-sm px-2 py-1 rounded">{index + 1}</span>
                    {question.text}
                  </CardTitle>
                  <Badge className={`${isCorrect ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {isCorrect ? "Correct" : "Incorrect"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Your Answer:</p>
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                      )}
                      <p className={`text-white ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                        {getAnswerText(question, answer!)}
                      </p>
                    </div>
                  </div>

                  {!isCorrect && (
                    <div className="bg-green-500/10 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Correct Answer:</p>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <p className="text-green-400">{getCorrectAnswerText(question)}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Points:</span>
                    <span className="text-white">
                      {isCorrect ? question.points : 0} / {question.points}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button onClick={onFinish} className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
          Return to Quizzes <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

