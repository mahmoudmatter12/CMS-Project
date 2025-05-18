using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using CollageManagementSystem.Models;
using CollageMangmentSystem.Core.DTO.Responses.course;
using CollageMangmentSystem.Core.DTO.Responses.user;
using CollageMangmentSystem.Core.Entities;
using CollageMangmentSystem.Core.Entities.course;
using CollageMangmentSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

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
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email)
                ?? throw new Exception($"User with email {email} not found.");
        }

        public async Task<User> GetUserById(Guid id)
        {
            return await _context.Users.FindAsync(id)
                ?? throw new Exception($"User with id {id} not found.");
            ;
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
            return await _context.Users.Where(u => u.DepartmentId == departmentId).ToListAsync();
        }

        // Helper method used by AuthController
        public void CreatePasswordHash(
            string password,
            out byte[] passwordHash,
            out byte[] passwordSalt
        )
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
            var user = await _context
                .Users.Include(u => u.Department)
                .FirstOrDefaultAsync(u => u.ClerkId == clerkId);
            if (user == null)
            {
                return null;
            }
            return user;
        }

        public async Task<IEnumerable<CourseResponseDto>> GetCoursesUserCanEnroll(Guid userId)
        {
            // 1. Get user enrollment information - which courses the user is already enrolled in
            var userEnrollments = await _context
                .UserEnrollments.Where(e => e.UserId == userId)
                .Select(e => e.CourseId)
                .ToListAsync();

            // 2. Get all available courses with their prerequisites
            var allCourses = await _context
                .Courses.Include(c => c.Department)
                .Include(c => c.PrerequisiteCourses)
                .Where(c => c.IsOpen)
                .ToListAsync();

            // 3. Filter the courses that the user is not enrolled in
            var coursesNotEnrolled = allCourses
                .Where(c => !userEnrollments.Contains(c.Id))
                .ToList();

            // 4. Get courses that user is already enrolled in for prerequisites checking
            var enrolledCourses = allCourses.Where(c => userEnrollments.Contains(c.Id)).ToList();

            // 5. Filter courses that the user can enroll in:
            // - User is not already enrolled
            // - Course has no prerequisites OR
            // - User has completed all prerequisites
            var eligibleCourses = coursesNotEnrolled
                .Where(course =>
                    // No prerequisites
                    course.PrerequisiteCourseIds.Count == 0
                    ||
                    // All prerequisites are satisfied
                    course.PrerequisiteCourseIds.All(prereqId => userEnrollments.Contains(prereqId))
                )
                .ToList();

            // 6. Convert to DTOs and return
            var courseDtos = eligibleCourses
                .Select(c => new CourseResponseDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    CreditHours = c.CreditHours,
                    Semester = c.Semester,
                    IsOpen = c.IsOpen,
                    DepartmentId = c.DepartmentId,
                    DepName = c.Department?.Name,
                    PrerequisiteCourseIds = c.PrerequisiteCourseIds,
                    CourseCode = c.CourseCode,
                })
                .ToList();

            foreach (var courseDto in courseDtos)
            {
                courseDto.PrerequisiteCourses = await GetPrerequisiteCoursesNames(
                    courseDto.PrerequisiteCourseIds
                );
                ;
            }
            return courseDtos;
        }

        public Task<User?> GetUserByStudentId(string studentCollageId)
        {
            throw new NotImplementedException();
        }

        public async Task<UserEnrollmentDetailesResponseDto> GetUserEnrollmentDetails(
            Guid userId,
            Guid enrollmentId
        )
        {
            var UserEnrollment = await _context
                .UserEnrollments.Include(e => e.Course)
                .ThenInclude(c => c.CourseQuizzes!)
                .ThenInclude(q => q.Creator!)
                .Include(e => e.Course)
                .ThenInclude(c => c.Department!)
                .ThenInclude(d => d.HDD!)
                .Include(e => e.Course)
                .ThenInclude(d => d.Instructor!)
                .Include(e => e.Course)
                .ThenInclude(c => c.PrerequisiteCourses!)
                .FirstOrDefaultAsync(e => e.Id == enrollmentId);

            var user = await _context.Users.FirstOrDefaultAsync(c => c.Id == userId);

            if (UserEnrollment == null || user == null)
            {
                throw new Exception($"Enrollment with id {enrollmentId} not found.");
            }

            var UserEnrollmentDetails = new UserEnrollmentDetailesResponseDto
            {
                UserId = userId,
                CourseId = UserEnrollment.CourseId,
                DepId = UserEnrollment.Course?.DepartmentId,
                QuizId =
                    UserEnrollment.Course?.CourseQuizzes?.Select(q => q.Id).ToList()
                    ?? new List<Guid>(),
                InstructorId = UserEnrollment.Course?.InstructorId,
                HODID = UserEnrollment.Course?.Department?.HDDID,
                StudentName = user.FullName ?? "No Name Available",
                StudentEmail = user.Email ?? "No Email Available",
                CourseName = UserEnrollment.Course?.Name ?? "No Course Name Available",
                CourseCode = UserEnrollment.Course?.CourseCode ?? "No Course Code Available",
                Semester = UserEnrollment.Course?.Semester ?? 0,
                CreditHours = UserEnrollment.Course?.CreditHours ?? 0,
                InstructorName =
                    UserEnrollment.Course?.Instructor?.FullName ?? "No Instructor Name Available",
                InstructorEmail =
                    UserEnrollment.Course?.Instructor?.Email ?? "No Instructor Email Available",
                InstructorImg =
                    UserEnrollment.Course?.Instructor?.ProfilePicture ?? "No Image Available",
                DepName = UserEnrollment.Course?.Department?.Name ?? "No Department Name Available",
                HODName =
                    UserEnrollment.Course?.Department?.HDD?.FullName ?? "No HOD Name Available",
                QuizMetaData =
                    UserEnrollment
                        .Course?.CourseQuizzes?.Select(q => new QuizMetaData
                        {
                            QuizId = q.Id,
                            QuizTitle = q.Title ?? "No Quiz Title",
                            QuizDescription = q.Description ?? "No Description Available",
                            QuizStartDate = q.StartDate,
                            QuizEndDate = q.EndDate,
                            QuizDuration = q.Duration,
                            QuizCreator = q.Creator?.FullName ?? "Not Available",
                        })
                        .ToList() ?? new List<QuizMetaData>(),
            };

            return UserEnrollmentDetails;
        }

        private Task<List<string>> GetPrerequisiteCoursesNames(List<Guid> prerequisiteCourseIds)
        {
            return _context
                .Courses.Where(c => prerequisiteCourseIds.Contains(c.Id))
                .Select(c => c.Name)
                .ToListAsync();
        }
    }
}
