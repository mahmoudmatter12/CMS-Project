using CollageManagementSystem.Models;
using CollageMangmentSystem.Core.Entities;
using CollageMangmentSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CollageManagementSystem.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UserService> _logger;

        public UserService(ApplicationDbContext context, ILogger<UserService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<bool> UserExists(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email) ?? throw new Exception($"User with email {email} not found.");
        }

        public async Task<User> GetUserById(Guid id)
        {
            return await _context.Users.FindAsync(id) ?? throw new Exception($"User with id {id} not found."); ;
        }

        // public async Task<User> GetUserByRefreshToken(string refreshToken)
        // {
        //     return await _context.Users
        //         .FirstOrDefaultAsync(u => u.RefreshToken == refreshToken)
        //         ?? throw new Exception($"User with refresh token {refreshToken} not found.");
        // }

        public async Task CreateUser(User user)
        {
            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"User {user.Email} created successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error creating user {user.Email}");
                throw;
            }
        }

        public async Task UpdateUser(User user)
        {
            try
            {
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"User {user.Email} updated successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating user {user.Email}");
                throw;
            }
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<List<User>> GetUsersByDepartmentId(Guid departmentId)
        {
            return await _context.Users
                .Where(u => u.DepartmentId == departmentId)
                .ToListAsync();
        }

        // Helper method used by AuthController
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        // Helper method used by AuthController
        public bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (storedHash.Length != 64 || storedSalt.Length != 128)
            {
                _logger.LogWarning("Invalid password hash or salt length");
                return false;
            }

            using var hmac = new HMACSHA512(storedSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != storedHash[i])
                {
                    return false;
                }
            }

            return true;
        }


        public async Task<string> GetRoleByUserId(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                throw new Exception($"User with id {id} not found.");
            }
            return user.GetRoleByIndex((int)user.Role);
        }
        public Task<Guid> GetUserIdFromClaims(ClaimsPrincipal userClaims)
        {
            var userIdClaim = userClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
            {
                throw new UnauthorizedAccessException("User ID not found in claims");
            }
            return Task.FromResult(userId);
        }

        public async Task<string> GetUserNameById(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                throw new Exception($"User with id {id} not found.");
            }
            return user.FullName;
        }

        public async Task<User?> GetUserByClerkId(string clerkId)
        {
            var user = await _context.Users
                .Include(u => u.Department)
                .FirstOrDefaultAsync(u => u.ClerkId == clerkId);
            if (user == null)
            {
                return null;
            }
            return user;
        }

    }
}