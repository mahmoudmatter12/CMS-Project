using Microsoft.EntityFrameworkCore;

namespace Core.Entities.Quizzes
{
    [Owned]
    public class QuizQuestion
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public required string QuestionText { get; set; }
        public QuestionType Type { get; set; }
        public required List<string> Answers { get; set; } = new();
        public int CorrectAnswerIndex { get; set; }

        public int Marks { get; set; }
        public string? Hint { get; set; }
        public string? Explanation { get; set; }
        public string? ImageUrl { get; set; }
        public List<string> Tags { get; set; } = new();

        // Foreign Key
        public Guid QuizId { get; set; }

        // Navigation Property
        public Quiz? Quiz { get; set; }

        public bool IsValid()
        {
            return Type switch
            {
                QuestionType.TrueFalse => Answers.Count == 2 && (CorrectAnswerIndex == 0 || CorrectAnswerIndex == 1),
                QuestionType.MultipleChoice => Answers.Count > 1 && CorrectAnswerIndex >= 0 && CorrectAnswerIndex < Answers.Count,
                QuestionType.ShortAnswer => Answers.Count == 1 && CorrectAnswerIndex == 0,
                _ => false
            };
        }
    }



}