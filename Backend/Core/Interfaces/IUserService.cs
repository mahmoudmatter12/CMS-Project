using System.Security.Claims;
using CollageManagementSystem.Models;
using CollageMangmentSystem.Core.DTO.Responses.course;
using CollageMangmentSystem.Core.DTO.Responses.user;
using CollageMangmentSystem.Core.Entities;
using CollageMangmentSystem.Core.Entities.course;

namespace CollageManagementSystem.Services
{
    public interface IUserService
    {
        Task<bool> UserExists(string email);
        Task<User> GetUserByEmail(string email);
        Task<User> GetUserById(Guid id);
        Task<IEnumerable<User>> GetAllUsers();

        // Task<User> GetUserByRefreshToken(string refreshToken);
        Task CreateUser(User user);
        Task UpdateUser(User user);
        Task<List<User>> GetUsersByDepartmentId(Guid departmentId);
        Task<string> GetRoleByUserId(Guid id);
        Task<string> GetUserNameById(Guid id);
        Task<User?> GetUserByClerkId(string clerkId);

        Task<IEnumerable<CourseResponseDto>> GetCoursesUserCanEnroll(Guid userId);
        Task<User?> GetUserByStudentId(string studentCollageId);

        Task<UserEnrollmentDetailesResponseDto> GetUserEnrollmentDetails(
            Guid userId,
            Guid enrollmentId
        );
    }
}
