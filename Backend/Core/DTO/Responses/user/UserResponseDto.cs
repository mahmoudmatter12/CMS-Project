using CollageMangmentSystem.Core.Entities;
using CollageMangmentSystem.Core.Entities.user;

namespace CollageMangmentSystem.Core.DTO.Responses
{
    public class UserResponseDto
    {
        public Guid Id { get; set; }
        public string Fullname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? ProfilePicture { get; set; } = string.Empty;
        public string? ClerkId { get; set; } = string.Empty;
        public string? StudentCollageId { get; set; } = string.Empty;
        public bool IsBoarded { get; set; } = false;
        public string Role { get; set; } = string.Empty;
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public Guid DepId { get; set; } = Guid.Empty;
        public string? DepName { get; set; } = string.Empty;
        public string? Level { get; set; }
        public float? CGPA { get; set; }
    }
}