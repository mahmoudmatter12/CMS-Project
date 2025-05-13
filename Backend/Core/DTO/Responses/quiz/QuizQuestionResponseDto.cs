using Core.Entities.Quizzes;

namespace CollageMangmentSystem.Core.DTO.Responses.quiz
{
    public class QuizQuestionResponseDto
    {
        public string QuestionText { get; set; } = string.Empty;

        public QuestionType Type { get; set; }

        public List<string> Answers { get; set; } = new();
        public int CorrectAnswerIndex { get; set; }

        public int Marks { get; set; } = 1;
        public string? Hint { get; set; }
        public string? Explanation { get; set; }
        public string? ImageUrl { get; set; }
        public List<string> Tags { get; set; } = new();
    }
}