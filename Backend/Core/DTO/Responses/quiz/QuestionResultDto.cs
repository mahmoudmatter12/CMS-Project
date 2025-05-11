public class QuestionResultDto
{
    public Guid QuestionId { get; set; }
    public bool IsCorrect { get; set; }
    public int AwardedMarks { get; set; }
}
