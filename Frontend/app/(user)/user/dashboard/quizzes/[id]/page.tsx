import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Award, BookOpen } from "lucide-react"
import { Quiz } from "@/types/types"
import { QuizSession } from "@/components/quizzes/quiz-session"

async function getQuiz(id: string): Promise<Quiz> {
  try {
    const res = await fetch(`http://localhost:5168/api/Quiz/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error("Failed to fetch quiz")
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching quiz:", error)
    throw error
  }
}

export default async function QuizPage({ params }: { params: { id: string } }) {
  const quiz = await getQuiz(params.id)

  return (
    <div className="container py-8">
      <Suspense fallback={<QuizDetailsSkeleton />}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
          <p className="text-gray-500">{quiz.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-lg">{quiz.duration} minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Passing Score</p>
                    <p className="text-lg">
                      {quiz.passingMarks}/{quiz.totalMarks}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Questions</p>
                    <p className="text-lg">{quiz.totalQuestions} questions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <QuizSession quiz={quiz} />
      </Suspense>
    </div>
  )
}

function QuizDetailsSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="h-10 w-3/4 mb-2" />
      <Skeleton className="h-5 w-full mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Skeleton className="h-5 w-5 mr-2" />
                <div className="w-full">
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Skeleton className="h-[600px] w-full rounded-lg" />
      </div>
    </div>
  )
}
