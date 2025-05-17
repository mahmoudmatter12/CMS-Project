using CollageManagementSystem.Core.Entities.department;
using CollageManagementSystem.Services;
using CollageMangmentSystem.Core.DTO.Responses.course;
using CollageMangmentSystem.Core.DTO.Responses.user;
using CollageMangmentSystem.Core.Entities.course;
using CollageMangmentSystem.Core.Entities.department;
using CollageMangmentSystem.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace CollageMangmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly IRepository<Course> _CourseRepo;
        private readonly IDepRepostaory<Department> _depRepo;
        private readonly ICourseReposatory<Course> _courseReposatory;
        private readonly IUserService _userService;

        public CourseController(
            IRepository<Course> courseRepo,
            IUserService userService,
            IDepRepostaory<Department> depRepo,
            ICourseReposatory<Course> courseReposatory
        )
        {
            _courseReposatory = courseReposatory;
            _CourseRepo = courseRepo;
            _userService = userService;
            _depRepo = depRepo;
        }

        [HttpPost("add")]
        [EnableRateLimiting("FixedWindowPolicy")]
        public async Task<IActionResult> CreateCourse([FromBody] CreateCourseReqDto course)
        {
            if (course == null)
            {
                return BadRequest("Course cannot be null");
            }

            var newCourse = new Course
            {
                Name = course.Name,
                CreditHours = course.CreditHours,
                Semester = course.Semester,
                IsOpen = course.IsOpen,
                DepartmentId = course.DepartmentId,
                PrerequisiteCourseIds = course.PrerequisiteCourseIds ?? new List<Guid>(),
                CourseCode = course.CourseCode,
            };

            await _CourseRepo.AddAsync(newCourse);
            return CreatedAtAction(nameof(CreateCourse), new { id = newCourse.Id }, newCourse);
        }

        [HttpPost("Toggel/{id:guid}")]
        [EnableRateLimiting("FixedWindowPolicy")]
        public async Task<IActionResult> ToggleCourse(Guid id)
        {
            var course = await _CourseRepo.GetByIdAsync(id);
            if (course == null)
            {
                return NotFound("Course not found");
            }

            course.IsOpen = !course.IsOpen;
            await _CourseRepo.UpdateAsync(course);
            var courseDtos = new CourseResponseDto
            {
                Id = course.Id,
                Name = course.Name,
                CreditHours = course.CreditHours,
                Semester = course.Semester,
                IsOpen = course.IsOpen,
                CourseCode = course.CourseCode,
                DepName = await _depRepo.GetDepartmentName(course.DepartmentId),
                PrerequisiteCourses = course.PrerequisiteCoursesNames(),
            };
            return Ok(courseDtos);
        }
    }
}
