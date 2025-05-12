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
        public CourseController(IRepository<Course> courseRepo, IUserService userService, IDepRepostaory<Department> depRepo, ICourseReposatory<Course> courseReposatory)
        {
            _courseReposatory = courseReposatory;
            _CourseRepo = courseRepo;
            _userService = userService;
            _depRepo = depRepo;
        }

        // [HttpGet("all")]
        // [EnableRateLimiting("FixedWindowPolicy")]
        // public async Task<IActionResult> GetAllCourses()
        // {
        //     var courses = await _CourseRepo.GetAllAsync();
        //     var courseDtos = courses.Select(c => c.ToCourseResponseDto()).ToList();
        //     foreach (var courseDto in courseDtos)
        //     {
        //         courseDto.DepName = await _depRepo.GetDepartmentName(courseDto.DepartmentId);
        //         courseDto.PrerequisiteCourses = await _courseReposatory.GetCourseNamesByIds(courseDto.PrerequisiteCourseIds);
        //     }
        //     return Ok(courseDtos);
        // }
        // paged
        // [HttpGet("all")]
        // [EnableRateLimiting("FixedWindowPolicy")]
        // public async Task<IActionResult> GetAllCourses([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        // {
        //     var TotalCount = await _CourseRepo.GetCountAsync();
        //     var courses = await _CourseRepo.GetAllAsyncPaged(pageNumber, pageSize);
        //     var courseDtos = courses.Select(c => c.ToCourseResponseDto()).ToList();
        //     foreach (var courseDto in courseDtos)
        //     {
        //         courseDto.DepName = await _depRepo.GetDepartmentName(courseDto.DepartmentId);
        //         courseDto.PrerequisiteCourses = await _courseReposatory.GetCourseNamesByIds(courseDto.PrerequisiteCourseIds);
        //     }
        //     return Ok(new PagedResponse<courseResponseDto>
        //     {
        //         PageNumber = pageNumber,
        //         PageSize = pageSize,
        //         TotalCount = TotalCount,
        //         TotalPages = (int)Math.Ceiling((double)TotalCount / pageSize),
        //         Data = courseDtos
        //     });
        // }


        // [HttpGet("{id:guid}")]
        // [EnableRateLimiting("FixedWindowPolicy")]
        // public async Task<IActionResult> GetCourseById(Guid id)
        // {
        //     var course = await _CourseRepo.GetByIdAsync(id);
        //     if (course == null)
        //     {
        //         return NotFound("Course not found");
        //     }
        //     var courseDtos = course.ToCourseResponseDto();
        //     courseDtos.DepName = await _depRepo.GetDepartmentName(courseDtos.DepartmentId);
        //     courseDtos.PrerequisiteCourses = await _courseReposatory.GetCourseNamesByIds(courseDtos.PrerequisiteCourseIds);
        //     return Ok(courseDtos);
        // }

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
                CourseCode = course.CourseCode
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
            var courseDtos = new courseResponseDto
            {
                Id = course.Id,
                Name = course.Name,
                CreditHours = course.CreditHours,
                Semester = course.Semester,
                IsOpen = course.IsOpen,
                CourseCode = course.CourseCode,
                DepName = await _depRepo.GetDepartmentName(course.DepartmentId),
                PrerequisiteCourses = course.PrerequisiteCoursesNames()
            };
            return Ok(courseDtos);
        }

        [HttpDelete("{id:guid}")]
        [EnableRateLimiting("FixedWindowPolicy")]
        public async Task<IActionResult> DeleteCourse(Guid id)
        {
            var course = await _CourseRepo.GetByIdAsync(id);
            if (course == null)
            {
                return NotFound("Course not found");
            }

            // Get current user ID from the service
            var currentUserId = _userService.GetUserIdFromClaims(User) ?? null;
            if (currentUserId == null)
            {
                return Unauthorized("User ID not found in claims");
            }
            // Soft delete the course
            await _CourseRepo.SoftDeleteAsync(course, currentUserId.Result); // This will trigger your soft delete logic

            // Return appropriate response
            return Ok(new
            {
                Message = "Course soft deleted successfully",
                DeletedAt = DateTime.UtcNow,
                DeletedBy = currentUserId.Result
            });
        }

    }
}