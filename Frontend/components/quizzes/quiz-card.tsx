import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, Award, BookOpen } from "lucide-react"
import Link from "next/link"
import { Quiz } from "@/types/types"

interface QuizCardProps {
  quiz: Quiz
}

export function QuizCard({ quiz }: QuizCardProps) {
  // Format date if it exists
  const formatDate = (date: Date | null) => {
    if (!date) return "Not specified"
    return new Date(date).toLocaleDateString()
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{quiz.title}</CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-gray-500" />
            <span>Duration: {quiz.duration} minutes</span>
          </div>
          <div className="flex items-center text-sm">
            <Award className="mr-2 h-4 w-4 text-gray-500" />
            <span>
              Passing: {quiz.passingMarks}/{quiz.totalMarks} marks
            </span>
          </div>
          <div className="flex items-center text-sm">
            <BookOpen className="mr-2 h-4 w-4 text-gray-500" />
            <span>{quiz.totalQuestions} questions</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <span>Available until: {formatDate(quiz.endDate)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="w-full flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span>Course: {quiz.courseName}</span>
          </div>
          <Button asChild>
            <Link href={`/user/dashboard/quizzes/${quiz.id}`}>Start Quiz</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
