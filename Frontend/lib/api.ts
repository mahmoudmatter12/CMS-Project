import { correctQuiz, QuizResult } from "@/types/types"

export async function submitQuizAnswers(data: correctQuiz): Promise<QuizResult> {
  try {
    const response = await fetch("http://localhost:5168/api/Quiz/CheckQuiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to submit quiz answers")
    }

    return await response.json()
  } catch (error) {
    console.error("Error submitting quiz answers:", error)
    throw error
  }
}
