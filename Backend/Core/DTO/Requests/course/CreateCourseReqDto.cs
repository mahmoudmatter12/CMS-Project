using System.ComponentModel.DataAnnotations;

namespace CollageManagementSystem.Core.Entities.department
{
    public class CreateCourseReqDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Range(1, 10)]
        public int CreditHours { get; set; }

        [Range(1, 10)]
        public int? Semester { get; set; }
        public required string CourseCode { get; set; }

        public Guid? DepartmentId { get; set; }

        public bool IsOpen { get; set; } = false;

        public List<Guid>? PrerequisiteCourseIds { get; set; } = new List<Guid>();
        public Guid? InstructorId { get; set; }
    }
}
