using CollageMangmentSystem.Core.DTO.Requests.quiz;
using CollageMangmentSystem.Core.Entities;

namespace Core.Entities.Quizzes
{
    public class Quiz : BaseEntity
    {
        // Quiz MetaData
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int Duration { get; set; } // in minutes
        public int PassingMarks { get; set; }
        public bool IsActive { get; set; }
        public int? MaxAttempts { get; set; }

        // foreign key to the creator -- each user can create multiple quizzes
        // but each quiz can be created by only one user
        public Guid? CreatorId { get; set; } // FK to User
        public User? Creator { get; set; }   // Navigation property
        public ICollection<QuizQuestion> Questions { get; set; } = new List<QuizQuestion>();

        public string GetDurationString()
        {
            if (StartDate.HasValue && EndDate.HasValue)
            {
                var duration = EndDate.Value - StartDate.Value;
                return duration.ToString(@"hh\:mm\:ss");
            }
            return "Forever";
        }


        public Quiz CreateQuizDto(CreateQuizDto quiz)
        {
            var newQuiz = new Quiz
            {
                Title = quiz.Title,
                Description = quiz.Description,
                StartDate = quiz.StartDate,
                EndDate = quiz.EndDate,
                Duration = quiz.Duration,
                PassingMarks = quiz.PassingMarks,
                IsActive = quiz.IsActive,
                MaxAttempts = quiz.MaxAttempts,
                Questions = quiz.Questions.Select(q => new QuizQuestion
                {
                    QuestionText = q.QuestionText,
                    Type = q.Type,
                    Answers = q.Answers,
                    Marks = q.Marks,
                    CorrectAnswerIndex = q.CorrectAnswerIndex,
                    Hint = q.Hint,
                    Explanation = q.Explanation,
                    ImageUrl = q.ImageUrl,
                    Tags = q.Tags ?? new List<string>(),
                }).ToList()
            };

            return newQuiz;
        }
    }


}