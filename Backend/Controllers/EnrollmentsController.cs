using CollageManagementSystem.Core.Entities.userEnrollments;
using CollageManagementSystem.Services;
using CollageMangmentSystem.Core.Entities.course;
using CollageMangmentSystem.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace CollageMangmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentsController : ControllerBase
    {
        private readonly IUserEnrollments<UserEnrollments> _userEnrollmentsService;
        private readonly ILogger<EnrollmentsController> _logger;
        private readonly IUserService _userService;
        private readonly ICourseReposatory<Course> _courseReposatory;

        public EnrollmentsController(IUserEnrollments<UserEnrollments> userEnrollmentsService,
            ILogger<EnrollmentsController> logger, ICourseReposatory<Course> courseReposatory, IUserService userService)
        {
            _logger = logger;
            _userEnrollmentsService = userEnrollmentsService;
            _courseReposatory = courseReposatory;
            _userService = userService;
        }

        [HttpGet("{id}/enrollments")]
        [EnableRateLimiting("FixedWindowPolicy")]
        public async Task<IActionResult> GetUserEnrollments(Guid id)
        {
            var enrollments = await _userEnrollmentsService.GetUserEnrollmentsById(id);
            if (enrollments == null || enrollments.Count == 0)
            {
                return NoContent();
            }
            return Ok(new
            {
                Message = "User enrollments retrieved successfully",
                UserName = GetUserName(id),
                Enrollments = enrollments.Select(e => new
                {
                    EnrollmentId = e.Id,
                    e.CourseId,
                    CourseName = GetCourseName(e.CourseId),
                    EnrollDate = e.EnrollDate
                })
            });
        }

        [HttpPost("add")]
        [EnableRateLimiting("FixedWindowPolicy")]
        public async Task<IActionResult> AddUserEnrollment([FromBody] CreateUserEnrollmentDto userEnrollment)
        {
            // Input validation
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid request data", Errors = ModelState.Values.SelectMany(v => v.Errors) });
            }


            var courseName = GetCourseName(userEnrollment.CourseId);
            var userName = GetUserName(userEnrollment.UserId);

            try
            {
                // Check for existing enrollment
                var existingEnrollment = await _userEnrollmentsService.IsAlreadyEnrolled(
                    userEnrollment.UserId,
                    userEnrollment.CourseId);

                if (existingEnrollment)
                {
                    return Conflict(new
                    {
                        Message = "User is already enrolled in this course",
                        CourseName = courseName
                    });
                }

                // Create new enrollment
                var newEnrollment = new UserEnrollments
                {
                    UserId = userEnrollment.UserId,
                    CourseId = userEnrollment.CourseId,
                    EnrollDate = DateTime.UtcNow,

                };

                await _userEnrollmentsService.AddUserEnrollment(newEnrollment);

                // Return more complete response
                return CreatedAtAction(
                    nameof(GetUserEnrollments),
                    new { id = userEnrollment.UserId },
                    new
                    {
                        Message = "Enrollment created successfully",
                        EnrollmentId = newEnrollment.Id, // Assuming your entity has an Id
                        UserEnrollment = new
                        {
                            CourseName = courseName,
                            UserName = userName,
                        }
                    });
            }
            catch (Exception ex)
            {
                // Log the exception
                _logger.LogError(ex, "Error creating user enrollment");
                return StatusCode(500, new { Message = "An error occurred while processing your request" });
            }
        }

      

        private string GetCourseName(Guid courseId)
        {

            var courseName = _courseReposatory.GetCourseNameById(courseId);
            if (courseName == null)
            {
                throw new Exception("Course not found");
            }
            return courseName.Result;
        }

        private string GetUserName(Guid userId)
        {
            var userName = _userService.GetUserNameById(userId);
            if (userName == null)
            {
                throw new Exception("User not found");
            }
            return userName.Result;
        }

    }
}