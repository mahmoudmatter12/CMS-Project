using System.ComponentModel.DataAnnotations;
using CollageMangmentSystem.Core.DTO.Responses.course;
using CollageMangmentSystem.Core.Entities.department;
using Core.Entities.Quizzes;

namespace CollageMangmentSystem.Core.Entities.course
{
    public class Course : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Range(1, 10)]
        public int CreditHours { get; set; }

        [Range(1, 10)]
        public int? Semester { get; set; }

        [Required]
        [MaxLength(100)]
        public string CourseCode { get; set; } = string.Empty;

        public Guid? DepartmentId { get; set; }
        public Department? Department { get; set; }
        public bool IsOpen { get; set; } = false;

        public string? Description { get; set; } = string.Empty;

        // each course has only one instructor
        public Guid? InstructorId { get; set; }
        public User? Instructor { get; set; }

        public List<Guid> PrerequisiteCourseIds { get; set; } = new List<Guid>();
        public List<Course> PrerequisiteCourses { get; set; } = new List<Course>();

        public ICollection<Quiz>? CourseQuizzes { get; set; } = new List<Quiz>();

        public List<string> PrerequisiteCoursesNames()
        {
            return PrerequisiteCourses?.Select(c => c.Name).ToList() ?? new List<string>();
        }

        public CourseResponseDto ToCourseResponseDto()
        {
            // Assuming you want to convert this Course entity to a courseResponseDto
            var courseResponseDto = new CourseResponseDto
            {
                Id = this.Id,
                Name = this.Name,
                CreditHours = this.CreditHours,
                Semester = this.Semester,
                IsOpen = this.IsOpen,
                DepartmentId = this.DepartmentId,
                DepName = this.Department?.Name,
                PrerequisiteCourseIds = this.PrerequisiteCourseIds,
                CourseCode = this.CourseCode,
            };
            return courseResponseDto;
        }
    }
}
