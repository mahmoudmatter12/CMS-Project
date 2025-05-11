using System.ComponentModel.DataAnnotations;

namespace CollageManagementSystem.DTOs.Requests.Auth
{
    public class CreateUserDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string FullName { get; set; } = string.Empty;

        public Guid? DepartmentId { get; set; }
        public string? ProfilePicture { get; set; } = string.Empty;
        public string? ClerkId { get; set; } = string.Empty;
        public bool IsBoarded { get; set; } = false;

        public string? Level { get; set; }
        public string? StudentCollageId { get; set; } = string.Empty;

        public float? CGPA { get; set; }

    }
}