using CollageMangmentSystem.Core.Entities;
using CollageMangmentSystem.Core.Entities.course;
using Core.Entities.Quizzes;

namespace CollageMangmentSystem.Core.DTO.Responses.quiz
{
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
        public string? CreatorName { get; set; }
        public string? CourseName { get; set; }

        public int? MaxAttempts { get; set; }

        public List<QuizQuestionResponseDto> Questions { get; set; } = new();

    }
}