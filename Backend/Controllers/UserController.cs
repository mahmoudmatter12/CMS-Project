// Controllers/UsersController.cs
using System.Security.Claims;
using CollageManagementSystem.Core.Entities.userEnrollments;
using CollageManagementSystem.Services;
using CollageMangmentSystem.Core.DTO.Requests;
using CollageMangmentSystem.Core.DTO.Responses;
using CollageMangmentSystem.Core.DTO.Responses.user;
using CollageMangmentSystem.Core.Entities;
using CollageMangmentSystem.Core.Entities.course;
using CollageMangmentSystem.Core.Entities.department;
using CollageMangmentSystem.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace CollageMangmentSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IDepRepostaory<Department> _depRepo;
        private readonly ICourseReposatory<Course> _courseReposatory;
        private readonly IUserEnrollments<UserEnrollments> _userEnrollmentsService;
        private readonly ILogger<UsersController> _logger;

        public UsersController(
            IUserService userService,
            IDepRepostaory<Department> depRepo,
            ICourseReposatory<Course> courseReposatory,
            IUserEnrollments<UserEnrollments> userEnrollmentsService,
            ILogger<UsersController> logger
        )
        {
            _userService = userService;
            _depRepo = depRepo;
            _courseReposatory = courseReposatory;
            _userEnrollmentsService = userEnrollmentsService;
            _logger = logger;
        }

        [HttpGet("{id}")]
        [EnableRateLimiting("FixedWindowPolicy")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }
            return Ok(user);
        }

        [HttpGet("{userId}/available-courses")]
        public async Task<IActionResult> GetCoursesUserCanEnroll(Guid userId)
        {
            var courses = await _userService.GetCoursesUserCanEnroll(userId);
            return Ok(courses);
        }

        [HttpGet("user/{userId}/enrollment/{enrollmentId}")]
        public async Task<IActionResult> GetUserEnrollmentDetails(Guid userId, Guid enrollmentId)
        {
            var enrollmentDetails = await _userService.GetUserEnrollmentDetails(
                userId,
                enrollmentId
            );
            if (enrollmentDetails == null)
            {
                return NotFound(new { Message = "Enrollment not found" });
            }
            return Ok(enrollmentDetails);
        }

    }
}
