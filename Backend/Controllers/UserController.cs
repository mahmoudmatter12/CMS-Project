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
        private readonly IRepository<User> _userRepository;
        private readonly ILogger<UsersController> _logger;
        private readonly IUserService _userService;

        private readonly IRepository<Department> _dep;

        private readonly ICourseReposatory<Course> _courseReposatory;

        private readonly IUserEnrollments<UserEnrollments> _userEnrollmentsService;

        public UsersController(IRepository<User> userRepository, ILogger<UsersController> logger, IUserService userService , IRepository<Department> dep ,IUserEnrollments<UserEnrollments> userEnrollmentsService , ICourseReposatory<Course> courseReposatory)
        {
            _userRepository = userRepository;
            _logger = logger;
            _userService = userService;
            _dep = dep;
            _userEnrollmentsService = userEnrollmentsService;
            _courseReposatory = courseReposatory;
        }
    

        [HttpGet("all")]
        [EnableRateLimiting("FixedWindowPolicy")]
        public async Task<IActionResult> GetAllUsersPaged(int pageNumber = 1, int pageSize = 10)
        {
            try
            {
                var users = await _userRepository.GetAllAsyncPaged(pageNumber, pageSize);
                var totalUsers = await _userRepository.GetAllAsync();
                var usersDto = users.Select(user => user.ToGetStudentIdResponseDto()).ToList();
                foreach (var user in usersDto)
                {
                    user.DepName = GetDepNameFromId(user.DepId);
                }
                return Ok(new PagedResponse<UserResponseDto>
                {
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                    TotalCount = totalUsers.Count(),
                    TotalPages = (int)Math.Ceiling((double)totalUsers.Count() / pageSize),
                    Data = usersDto
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all users");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            try
            {
                var user = await _userRepository.GetByIdAsync(id);
                if (user == null)
                    return NotFound();
                var userDto = user.ToGetStudentIdResponseDto();
                userDto.DepName = GetDepNameFromId(user.DepartmentId ?? Guid.Empty);
                return Ok(userDto);
                
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting user with ID {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}/enrollments")]
        [EnableRateLimiting("FixedWindowPolicy")]
        public async Task<IActionResult> GetUserEnrollments(Guid id)
        {
            try
            {
                var user = await _userRepository.GetByIdAsync(id);
                if (user == null)
                    return NotFound($"User with ID {id} not found");

                var enrollments = await _userEnrollmentsService.GetUserEnrollmentsById(id);
                return Ok(new {
                    UserId = id,
                    UserName = user.FullName,
                    Enrollments = enrollments.Select(e => new
                    {
                        e.Id,
                        e.CourseId,
                        CourseName = GetCourseName(e.CourseId),
                    }).ToList()
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting enrollments for user with ID {id}");
                return StatusCode(500, "Internal server error");
            }
        }



        [HttpDelete("{id:guid}")]
        [EnableRateLimiting("FixedWindowPolicy")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            try
            {

                var user = await _userRepository.GetByIdAsync(id);
                var userId = GetUserIdFromClaims();
                if (user == null)
                    return NotFound($"User with ID {id} not found");

                await _userRepository.SoftDeleteAsync(user , userId);

                return Ok("User deleted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting user with ID {id}");
                return StatusCode(500, "Internal server error");
            }
        }



        [HttpGet("protected")]
        public async Task<IActionResult> Protected()
        {
            var userId = GetUserIdFromClaims();
            var UserRole = await _userService.GetRoleByUserId(userId);
            return Ok(new { message = "This is a protected route", userId, UserRole });
        }

        [HttpPatch("{id:guid}/update")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUserDto user)
        {
            try
            {
                var existingUser = await _userRepository.GetByIdAsync(id);
                if (existingUser == null)
                    return NotFound($"User with ID {id} not found");

                existingUser.FullName = user.FullName ?? existingUser.FullName;
                existingUser.DepartmentId = user.DepartmentId != null ? Guid.Parse(user.DepartmentId) : existingUser.DepartmentId;

                

                await _userRepository.UpdateAsync(existingUser);

                return Ok(new {
                    message = "User updated successfully",
                    existingUser,
                    depId = user.DepartmentId, // this from the [formBody]
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating user with ID {id}");
                return StatusCode(500, "Internal server error");
            }
        }


        private Guid GetUserIdFromClaims()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
            {
                throw new UnauthorizedAccessException("User ID not found in claims");
            }
            return userId;
        }

        private string GetDepNameFromId(Guid id){
            var dep = _dep.GetByIdAsync(id).Result;
            if (dep == null)
                return "Department not found";
            else
                return dep.Name ?? "Department not found";
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

    }
}