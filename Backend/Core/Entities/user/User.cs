using System.ComponentModel.DataAnnotations;
using CollageMangmentSystem.Core.DTO.Responses;
using CollageMangmentSystem.Core.Entities.course;
using CollageMangmentSystem.Core.Entities.department;
using CollageMangmentSystem.Core.Entities.user;
using Core.Entities.Quizzes;
using Newtonsoft.Json.Serialization;

namespace CollageMangmentSystem.Core.Entities
{
    public class User : BaseEntity
    {
        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public required string Email { get; set; }

        [Required]
        public string? ClerkId { get; set; }

        [Required]
        public bool IsBoarded { get; set; } = false;

        public UserRole Role { get; set; } = UserRole.Student;

        public string? StudentCollageId { get; set; } = string.Empty;
        public string? ProfilePicture { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; } = string.Empty;

        // the user can be instructor in a course
        public ICollection<Course>? Courses { get; set; }

        public string? Level { get; set; }

        public float? CGPA { get; set; } = float.NaN;

        // foreign key to the quiz -- each quiz can be created by one user
        public ICollection<Quiz>? Quiz { get; set; }

        public string GetRoleByIndex(int roleIndex)
        {
            return roleIndex switch
            {
                0 => UserRole.Student.ToString(),
                1 => UserRole.Teacher.ToString(),
                2 => UserRole.Admin.ToString(),
                _ => "Unknown",
            };
        }

        // each user user can be in only one department
        public Guid? DepartmentId { get; set; }
        public Department? Department { get; set; }

        public UserResponseDto ToGetStudentIdResponseDto() =>
            new()
            {
                Id = Id,
                Fullname = FullName,
                Email = Email,
                Role = Role.ToString(),
                CreatedAt = CreatedAt,
                DepId = DepartmentId ?? Guid.Empty,
                DepName = Department?.Name,
            };
    }
}
