namespace CollageMangmentSystem.Core.DTO.Requests.quiz
{
    public class CreateQuizDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public int Duration { get; set; }
        public int PassingMarks { get; set; }
        public bool IsActive { get; set; }
        public int? MaxAttempts { get; set; }
        public List<QuizQuestionDto> Questions { get; set; } = new();
    }
}