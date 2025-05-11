using System.ComponentModel.DataAnnotations;

namespace CollageMangmentSystem.Core.DTO.Requests
{
    public class AddUserDto
    {
       

        [MaxLength(100, ErrorMessage = "Last name cannot exceed 100 characters")]
        [RegularExpression(@"^[a-zA-Z]*$", ErrorMessage = "Last name can only contain letters")]
        public string? FullName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [MaxLength(255, ErrorMessage = "Email cannot exceed 255 characters")]
        public required string Email { get; set; }
    }
}