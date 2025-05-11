using Core.Entities.Quizzes;

public static class QuizValidator
{
    public static bool IsValidQuiz(Quiz quiz, out string error)
    {
        if (string.IsNullOrWhiteSpace(quiz.Title))
        {
            error = "Quiz title is required.";
            return false;
        }

        if (quiz.Questions == null || quiz.Questions.Count == 0)
        {
            error = "Quiz must contain at least one question.";
            return false;
        }

        foreach (var question in quiz.Questions)
        {
            if (!IsValidQuestion(question, out error))
                return false;
        }

        error = string.Empty;
        return true;
    }

    public static bool IsValidQuestion(QuizQuestion question, out string error)
    {
        if (string.IsNullOrWhiteSpace(question.QuestionText))
        {
            error = "Question text is required.";
            return false;
        }

        if (question.Type == QuestionType.ShortAnswer && question.Answers.Count != 1)
        {
            error = "Short answer question must have exactly one answer.";
            return false;
        }

        if (question.CorrectAnswerIndex < 0 || question.CorrectAnswerIndex >= question.Answers.Count)
        {
            error = "Correct answer index is out of range.";
            return false;
        }

        error = string.Empty;
        return true;
    }
}
