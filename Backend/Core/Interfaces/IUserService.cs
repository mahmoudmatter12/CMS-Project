using System.Security.Claims;
using CollageManagementSystem.Models;
using CollageMangmentSystem.Core.Entities;

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
        Task<Guid> GetUserIdFromClaims(ClaimsPrincipal userClaims);
        Task<List<User>> GetUsersByDepartmentId(Guid departmentId);
        Task<string> GetRoleByUserId(Guid id);
        Task<string> GetUserNameById(Guid id);

        Task<User?> GetUserByClerkId(string clerkId);
    }
}