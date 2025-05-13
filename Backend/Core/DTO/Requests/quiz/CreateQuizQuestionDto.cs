using Core.Entities.Quizzes;

namespace CollageMangmentSystem.Core.DTO.Requests.quiz
{
    public class QuizQuestionDto
    {
        public required string QuestionText { get; set; }
        public QuestionType Type { get; set; }
        public List<string> Answers { get; set; } = new();
        public int Marks { get; set; }
        public int CorrectAnswerIndex { get; set; }
        public string? Hint { get; set; }
        public string? Explanation { get; set; }
        public string? ImageUrl { get; set; }
        public List<string>? Tags { get; set; } = new();

    }
}