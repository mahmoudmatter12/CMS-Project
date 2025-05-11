public class QuizSubmissionDto
{
    public Guid QuizId { get; set; }
    public List<QuizAnswerDto> Answers { get; set; } = new();
}
