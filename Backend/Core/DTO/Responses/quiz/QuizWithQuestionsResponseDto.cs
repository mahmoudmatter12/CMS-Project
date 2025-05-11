using Core.Entities.Quizzes;

public class QuizWithQuestionsResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public int Duration { get; set; } // in minutes
    public int PassingMarks { get; set; }
    public bool IsActive { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public int TotalMarks { get; set; }

    public int TotalQuestions { get; set; }

    public List<QuizQuestionResponseDto> Questions { get; set; } = new();

    public void Todto(Quiz quiz)
    {
        Title = quiz.Title;
        Description = quiz.Description ?? "No Description";
        Duration = quiz.Duration;
        PassingMarks = quiz.PassingMarks;
        IsActive = quiz.IsActive;
        StartDate = quiz.StartDate ?? DateTime.MinValue;
        EndDate = quiz.EndDate ?? DateTime.MinValue;
        TotalMarks = quiz.Questions.Sum(q => q.Marks);
        TotalQuestions = quiz.Questions.Count;
        Questions = (from q in quiz.Questions
                     select new QuizQuestionResponseDto
                     {
                         QuestionText = q.QuestionText,
                         Type = q.Type,
                         Marks = q.Marks,
                         Answers = q.Answers,
                         CorrectAnswerIndex = q.CorrectAnswerIndex
                     }).ToList();
    }
}
