"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Question {
  id: string
  text: string
  type: string
  options: string[]
  correctAnswer: number | string
  points: number
}

interface Answer {
  questionId: string
  selectedOption?: number
  textResponse?: string
  isCorrect?: boolean
}

interface QuizQuestionProps {
  question: Question
  answer: Answer
  onChange: (answer: Partial<Answer>) => void
}

export default function QuizQuestion({ question, answer = {
  questionId: ""
}, onChange }: QuizQuestionProps) {
  const handleOptionSelect = (value: string) => {
    onChange({ selectedOption: Number.parseInt(value) })
  }

  const handleTextChange = (value: string) => {
    onChange({ textResponse: value })
  }

  if (question.type === "MULTIPLE_CHOICE" || question.type === "TRUE_FALSE") {
    return (
      <RadioGroup
        value={answer.selectedOption?.toString() || ""}
        onValueChange={handleOptionSelect}
        className="space-y-3"
      >
        {question.options.map((option, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={() => handleOptionSelect(index.toString())}
          >
            <RadioGroupItem
              value={index.toString()}
              id={`option-${question.id}-${index}`}
              className="border-indigo-500 text-indigo-500"
            />
            <Label htmlFor={`option-${question.id}-${index}`} className="flex-1 cursor-pointer text-white">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    )
  }

  if (question.type === "SHORT_ANSWER") {
    return (
      <div className="space-y-4">
        <Label htmlFor={`answer-${question.id}`} className="text-white">
          Your Answer
        </Label>
        <Textarea
          id={`answer-${question.id}`}
          value={answer.textResponse || ""}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Type your answer here..."
          className="min-h-[120px] bg-gray-700 border-gray-600 text-white focus:border-indigo-500"
        />
      </div>
    )
  }

  return (
    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
      <p className="text-red-400">Unknown question type: {question.type}</p>
    </div>
  )
}

