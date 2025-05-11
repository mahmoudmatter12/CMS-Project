using System.ComponentModel.DataAnnotations;

namespace CollageMangmentSystem.Core.DTO.Requests
{
    public class UpdateUserDto
    {
        // [Required(ErrorMessage = "Full name is required")]
        [MaxLength(100, ErrorMessage = "Full name cannot exceed 100 characters")]
        [RegularExpression(@"^[a-zA-Z]*$", ErrorMessage = "Full name can only contain letters")]
        public string? FullName { get; set; }
        public string? Role { get; set; }
        public string? ProfilePicture { get; set; } = string.Empty;
        public string? StudentCollageId { get; set; } = string.Empty;
        public string? Level { get; set; }
        public float? CGPA { get; set; } = float.NaN;
        public string? DepartmentId { get; set; }

    }
}