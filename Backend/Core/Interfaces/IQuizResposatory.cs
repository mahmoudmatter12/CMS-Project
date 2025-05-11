using Core.Entities.Quizzes;

namespace CollageManagementSystem.Core
{
    public interface IQuizRepository
    {
        Task<Quiz?> GetQuizByIdAsync(Guid id);
        Task<IEnumerable<Quiz>> GetAllQuizzesAsync();
        Task AddQuizAsync(Quiz quiz);
        Task UpdateQuizAsync(Quiz quiz);
        Task DeleteQuizAsync(Guid id);
        Task<IEnumerable<Quiz>> GetActiveQuizzesAsync();

        Task<IEnumerable<QuizQuestion>> GetAllQuestionsAsync(Guid QuizID);

        Task<IEnumerable<QuizWithQuestionsResponseDto>> GetQuizWithQuestionsAsync(Guid quizId);

        Task<IEnumerable<QuizWithQuestionsResponseDto>> GetQuizzesWithQuestionsAsync();
    }

}