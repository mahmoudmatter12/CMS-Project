using Core.Entities.Quizzes;

namespace CollageMangmentSystem.Core.Entities
{
    public class QuizCreator
    {
        public Guid CreatorId { get; set; }
        public User creator { get; set; } = null!;
        public Guid QuizId { get; set; }
        public Quiz Quiz { get; set; } = null!;
    }
    
}