namespace CollageMangmentSystem.Core.DTO.Responses.quiz
{
    public class QuizResultDto
    {
        public Guid QuizId { get; set; }
        public int TotalMarks { get; set; }
        public int ObtainedMarks { get; set; }
        public bool IsPassed { get; set; }
        public float PassingMarks { get; set; }
        public List<QuestionResultDto>? QuestionsResult { get; set; }
    }
}