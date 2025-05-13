using CollageManagementSystem.Core;
using CollageMangmentSystem.Core.DTO.Requests.quiz;
using Core.Entities.Quizzes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CollageManagementSystem
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizController : ControllerBase
    {
        // Dependency Injection
        private readonly IQuizRepository _quizRepository;
        // Constructor
        public QuizController(IQuizRepository quizRepository)
        {
            _quizRepository = quizRepository;
        }
        // todo: add pagination to all endpoints

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuiz(Guid id)
        {
            var quiz = await _quizRepository.GetQuizWithQuestionsAsync(id);
            if (quiz == null)
                return NotFound();
            return Ok(quiz);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var quizzes = await _quizRepository.GetQuizzesWithQuestionsAsync();
            if (quizzes == null || !quizzes.Any())
                return NotFound("No quizzes found.");
            foreach (var quiz in quizzes)
            {
                quiz.Questions = quiz.Questions.OrderBy(q => q.QuestionText).ToList();
            }
            quizzes = quizzes.OrderBy(q => q.Title).ToList();
            return Ok(quizzes);
        }

        [HttpGet("metaData")]
        public async Task<IActionResult> GetAllMetaData()
        {
            var quizzes = await _quizRepository.GetAllQuizzesAsync();
            if (quizzes == null || !quizzes.Any())
                return NotFound("No quizzes found.");
            foreach (var quiz in quizzes)
            {
                quiz.Questions = quiz.Questions.OrderBy(q => q.QuestionText).ToList();
            }
            quizzes = quizzes.OrderBy(q => q.Title).ToList();
            return Ok(quizzes);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateQuizDto quiz)
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
                CreatorId = quiz.CreatorId,
                CourseId = quiz.CourseId,
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

            await _quizRepository.AddQuizAsync(newQuiz);

            // Ensure newQuiz.Id is set after saving
            if (newQuiz.Id == Guid.Empty)
                return StatusCode(500, "Quiz ID was not generated.");

            return CreatedAtAction(nameof(GetQuiz), new { id = newQuiz.Id }, new
            {
                Message = "Quiz created successfully",
                QuizId = newQuiz.Id,
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _quizRepository.DeleteQuizAsync(id);
            return NoContent();
        }

        [HttpGet("active")]
        public async Task<IActionResult> GetActiveQuizzes()
        {
            var active = await _quizRepository.GetActiveQuizzesAsync();
            return Ok(active);
        }

        [HttpPost("CheckQuiz")]
        public async Task<IActionResult> CheckQuiz([FromBody] QuizSubmissionDto submission)
        {
            var result = await _quizRepository.CheckAnsweringQuizAsync(submission);
            if (result == null)
                return NotFound("Quiz not found.");
            return Ok(result);
        }

        [HttpPut("{id}/ToggleActive")]
        public async Task<IActionResult> ActivateQuiz(Guid id)
        {
            var quiz = await _quizRepository.GetQuizByIdAsync(id);
            if (quiz == null)
                return NotFound();

            quiz.IsActive = !quiz.IsActive;
            await _quizRepository.UpdateQuizAsync(quiz);
            return NoContent();
        }

        [HttpPatch("{id}/Update")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CreateQuizDto quiz)
        {
            var existingQuiz = await _quizRepository.GetQuizByIdAsync(id);
            if (existingQuiz == null)
                return NotFound();

            existingQuiz.Title = quiz.Title ?? existingQuiz.Title;
            existingQuiz.Description = quiz.Description ?? existingQuiz.Description;
            existingQuiz.StartDate = quiz.StartDate ?? existingQuiz.StartDate;
            existingQuiz.EndDate = quiz.EndDate ?? existingQuiz.EndDate;
            existingQuiz.Duration = quiz.Duration != 0 ? quiz.Duration : existingQuiz.Duration;
            existingQuiz.PassingMarks = quiz.PassingMarks != 0 ? quiz.PassingMarks : existingQuiz.PassingMarks;
            existingQuiz.IsActive = quiz.IsActive;
            existingQuiz.MaxAttempts = quiz.MaxAttempts != 0 ? quiz.MaxAttempts : existingQuiz.MaxAttempts;

            // Clear existing questions
            existingQuiz.Questions.Clear();
            foreach (var q in quiz.Questions)
            {
                var question = new QuizQuestion
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
                };
                existingQuiz.Questions.Add(question);
            }

            if (!QuizValidator.IsValidQuiz(existingQuiz, out var error))
                return BadRequest(error);

            await _quizRepository.UpdateQuizAsync(existingQuiz);
            return NoContent();
        }

    }

}