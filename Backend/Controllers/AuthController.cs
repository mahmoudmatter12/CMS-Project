namespace CollageManagementSystem.Controllers
{
    using CollageManagementSystem.DTOs.Requests.Auth;
    using CollageManagementSystem.Services;
    using CollageMangmentSystem.Core.DTO.Responses;
    using CollageMangmentSystem.Core.Entities;
    using CollageMangmentSystem.Core.Entities.department;
    using CollageMangmentSystem.Core.Interfaces;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IDepRepostaory<Department> _departmentRepository;

        public AuthController(IUserService userService , IDepRepostaory<Department> departmentRepository)
        {
            _departmentRepository = departmentRepository;
            _userService = userService;
        }

        [HttpPost("ClerkRegister")]
        public async Task<IActionResult> ClerkRegister([FromBody] CreateUserDto registerDto)
        {
            if (registerDto == null)
            {
                return BadRequest("Invalid registration data.");
            }

            var userExists = await _userService.UserExists(registerDto.Email);
            if (userExists)
            {
                return Conflict("User already exists.");
            }

            var user = new User
            {
                Email = registerDto.Email,
                FullName = registerDto.FullName,
                DepartmentId = registerDto.DepartmentId,
                ProfilePicture = registerDto.ProfilePicture,
                ClerkId = registerDto.ClerkId,
                StudentCollageId = registerDto.StudentCollageId,
                IsBoarded = registerDto.IsBoarded,
                Level = registerDto.Level,
                CGPA = registerDto.CGPA,
            };

            await _userService.CreateUser(user);

            return CreatedAtAction(nameof(ClerkRegister), new { id = user.Id }, user);

        }

        [HttpGet("{clerkId}")]
        public async Task<IActionResult> GetUserById(string clerkId)
        {
            var user = await _userService.GetUserByClerkId(clerkId);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            
            var UserDto = new UserResponseDto{
                Id = user.Id,
                Fullname = user.FullName,
                Email = user.Email,
                DepId = user.DepartmentId ?? Guid.Empty,
                DepName = await _departmentRepository.GetDepartmentName(user.DepartmentId),
                ProfilePicture = user.ProfilePicture,
                ClerkId = user.ClerkId,
                StudentCollageId = user.StudentCollageId,
                IsBoarded = user.IsBoarded,
                Role = await _userService.GetRoleByUserId(user.Id),
                CreatedAt = user.CreatedAt,
                Level = user.Level,
                CGPA = user.CGPA,
            };
            return Ok(UserDto);
        }

    }
}