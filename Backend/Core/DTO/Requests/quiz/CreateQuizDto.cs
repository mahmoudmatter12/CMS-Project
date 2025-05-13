namespace CollageMangmentSystem.Core.DTO.Requests.quiz
{
    public class CreateQuizDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public int Duration { get; set; }
        public int PassingMarks { get; set; }
        public bool IsActive { get; set; }
        public int? MaxAttempts { get; set; }
        public Guid? CreatorId { get; set; } // FK to User
        public Guid? CourseId { get; set; } // FK to Course

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public List<QuizQuestionDto> Questions { get; set; } = new();
    }
}