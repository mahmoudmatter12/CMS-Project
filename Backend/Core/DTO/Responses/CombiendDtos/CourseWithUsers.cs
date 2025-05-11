using CollageMangmentSystem.Core.Entities;

namespace CollageMangmentSystem.Core.DTO.Responses.CombiendDtos;

public class CourseWithUsers
{
    public Guid CourseId { get; set; }
    public string CourseName { get; set; } = string.Empty;
    public List<User> Users { get; set; } = new List<User>();
}
