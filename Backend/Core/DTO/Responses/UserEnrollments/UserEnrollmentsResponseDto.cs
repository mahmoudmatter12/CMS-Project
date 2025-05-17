using CollageManagementSystem.Core.Entities.userEnrollments;
using CollageMangmentSystem.Core.Entities;
using CollageMangmentSystem.Core.Entities.course;

namespace CollageMangmentSystem.Controllers
{
    public class UserEnrollmentsResponseDto
    {
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }
        public DateTime EnrollDate { get; set; } = DateTime.UtcNow;
        public string? Status { get; set; } = UserCourseStatus.Enrolled;
    }
}
