import { QuizCard } from "@/components/quizzes/quiz-card"
import { QuizCardSkeleton } from "@/components/quizzes/quiz-card-skeleton"
import { Quiz } from "@/types/types"
import { Suspense } from "react"

async function getQuizzes(): Promise<Quiz[]> {
  try {
    const res = await fetch("http://localhost:5168/api/Quiz/active", {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error("Failed to fetch quizzes")
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching quizzes:", error)
    return []
  }
}

export default async function QuizzesPage() {
  const quizzes = await getQuizzes()

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Available Quizzes</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<QuizzesSkeleton />}>
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium text-gray-500">No active quizzes available</h3>
              <p className="text-gray-400 mt-2">Check back later for new quizzes</p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  )
}

function QuizzesSkeleton() {
  return (
    <>
      {[...Array(2)].map((_, i) => (
        <QuizCardSkeleton key={i} />
      ))}
    </>
  )
}
