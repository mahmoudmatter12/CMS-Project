using CollageManagementSystem.Core.Entities.department;
using CollageMangmentSystem.Core.DTO.Responses.course;
using CollageMangmentSystem.Core.Entities.course;
using CollageMangmentSystem.Core.Entities.department;
using CollageMangmentSystem.Core.Entities.user;
using CollageMangmentSystem.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CollageMangmentSystem.Core.DTO.Requests.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminReposatory _adminReposatory;
        private readonly ILogger<AdminController> _logger;

        private readonly IDepRepostaory<Department> _departmentRepository;

        public AdminController(
            IAdminReposatory adminReposatory,
            ILogger<AdminController> logger,
            IDepRepostaory<Department> departmentRepository
        )
        {
            _departmentRepository = departmentRepository;
            _adminReposatory = adminReposatory;
            _logger = logger;
        }

        #region Users Endpoints

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _adminReposatory.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching users");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            try
            {
                var user = await _adminReposatory.GetUserByIdAsync(id);
                return Ok(user);
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, "User not found");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching user");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("/{clerkId}/delete")]
        public async Task<String> DeleteUser(string clerkId)
        {
            var s = await _adminReposatory.DeleteUser(clerkId);
            return s;
        }

        [HttpGet("users/email/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            try
            {
                var user = await _adminReposatory.GetUserByEmailAsync(email);
                if (user == null)
                {
                    return NotFound($"User with email {email} not found.");
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching user by email");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("users/name/{name}")]
        public async Task<IActionResult> GetUsersByName(string name)
        {
            try
            {
                var users = await _adminReposatory.GetUsersByNameAsync(name);
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching users by name");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("users/role/{role}")]
        public async Task<IActionResult> GetUsersByRole(UserRole role)
        {
            try
            {
                var users = await _adminReposatory.GetUsersByRoleAsync(role);
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching users by role");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPatch("users/{userId}/toggle-role")]
        public async Task<IActionResult> ToggleUserRole(Guid userId, [FromQuery] UserRole role)
        {
            try
            {
                await _adminReposatory.ToggleUserRoleAsync(userId, role);
                return Ok(new { message = "User Updated successfully , Now the user is " + role });
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, "User not found");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error toggling user role");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("users/with-roles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            try
            {
                var users = await _adminReposatory.GetUsersWithRolesAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching users with roles");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("users/course/{courseId}")]
        public async Task<IActionResult> GetUsersByCourse(Guid courseId)
        {
            try
            {
                var users = await _adminReposatory.GetUsersByCourseAsync(courseId);
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching users by course");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("users/department/{departmentId}")]
        public async Task<IActionResult> GetUsersByDepartment(
            Guid departmentId,
            [FromQuery] Guid? courseId = null,
            [FromQuery] Guid? enrollmentId = null
        )
        {
            try
            {
                var users = await _adminReposatory.GetUsersByDepartmentAsync(
                    departmentId,
                    courseId,
                    enrollmentId
                );
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching users by department");
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion

        #region Courses Endpoints

        [HttpGet("courses")]
        public async Task<IActionResult> GetAllCourses()
        {
            try
            {
                var courses = await _adminReposatory.GetAllCoursesAsync();
                return Ok(courses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching courses");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("courses/open")]
        public async Task<IActionResult> GetOpenCourses()
        {
            try
            {
                var courses = await _adminReposatory.GetOpenCoursesAsync();
                return Ok(courses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching open courses");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("course/create")]
        public async Task<CourseResponseDto> CreateCourse([FromBody] CreateCourseReqDto course)
        {
            try
            {
                var createdCourse = await _adminReposatory.CreateCourseAsync(course);
                if (createdCourse == null)
                {
                    throw new Exception("Failed to create the course. The result is null.");
                }
                var createdCourseDto = new CourseResponseDto
                {
                    CourseCode = course.CourseCode,
                    CreditHours = course.CreditHours,
                    Name = course.Name,
                    InstructorName = createdCourse.Instructor?.FullName ?? "Unknown Instructor",
                };
                return createdCourseDto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating course");
                throw new Exception("An error occurred while creating the course.", ex);
            }
        }

        [HttpDelete("course/{id}/delete")]
        public async Task<string?> DeleteCourseAsync(string id)
        {
            try
            {
                var result = await _adminReposatory.DeleteCourseAsync(id);
                if (result == null)
                {
                    return $"Course with ID {id} not found.";
                }
                return $"Course with ID {id} has been successfully deleted.";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting course");
                throw new Exception("An error occurred while deleting the course.", ex);
            }
        }

        [HttpGet("courses/{id}")]
        public async Task<IActionResult> GetCourseById(Guid id)
        {
            try
            {
                var course = await _adminReposatory.GetCourseByIdAsync(id);
                return Ok(course);
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, "Course not found");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching course");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("courses/name/{name}")]
        public async Task<IActionResult> GetCoursesByName(string name)
        {
            try
            {
                var courses = await _adminReposatory.GetCoursesByNameAsync(name);
                return Ok(courses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching courses by name");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("courses/department/{departmentId}")]
        public async Task<IActionResult> GetCoursesByDepartment(Guid departmentId)
        {
            try
            {
                var courses = await _adminReposatory.GetCoursesByDepartmentAsync(departmentId);
                return Ok(courses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching courses by department");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("courses/{courseId}/enrolled-users")]
        public async Task<IActionResult> GetCoursesWithEnrolledUsers(Guid courseId)
        {
            try
            {
                var result = await _adminReposatory.GetCoursesWithEnrolledUsersAsync(courseId);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, "Course not found");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching course with enrolled users");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPatch("courses/{courseId}/toggle-status")]
        public async Task<IActionResult> ToggleCourseStatus(Guid courseId)
        {
            try
            {
                var course = await _adminReposatory.ToggleCourseStatusAsync(courseId);
                return Ok(course);
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, "Course not found");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error toggling course status");
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion

        #region Departments Endpoints

        [HttpGet("departments")]
        public async Task<IActionResult> GetAllDepartments()
        {
            try
            {
                var departments = await _adminReposatory.GetAllDepartmentsAsync();
                return Ok(departments);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching departments");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("departments/{id}")]
        public async Task<IActionResult> GetDepartmentById(Guid id)
        {
            try
            {
                var department = await _adminReposatory.GetDepartmentByIdAsync(id);
                return Ok(department);
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, "Department not found");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching department");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("departments/name/{name}")]
        public async Task<IActionResult> GetDepartmentsByName(string name)
        {
            try
            {
                var departments = await _adminReposatory.GetDepartmentsByNameAsync(name);
                return Ok(departments);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching departments by name");
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion

        #region Enrollments Endpoints

        [HttpGet("enrollments")]
        public async Task<IActionResult> GetAllEnrollments()
        {
            try
            {
                var enrollments = await _adminReposatory.GetAllEnrollmentsAsync();
                return Ok(enrollments);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching enrollments");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("enrollments/{id}")]
        public async Task<IActionResult> GetEnrollmentById(Guid id)
        {
            try
            {
                var enrollment = await _adminReposatory.GetEnrollmentByIdAsync(id);
                return Ok(enrollment);
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex, "Enrollment not found");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching enrollment");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("enrollments/user/{userId}")]
        public async Task<IActionResult> GetEnrollmentsByUserId(Guid userId)
        {
            try
            {
                var enrollments = await _adminReposatory.GetEnrollmentsByUserIdAsync(userId);
                return Ok(enrollments);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching enrollments by user ID");
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion
    }
}
