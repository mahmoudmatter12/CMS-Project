using CollageMangmentSystem.Core.Entities;
using CollageMangmentSystem.Core.Entities.course;

namespace CollageManagementSystem.Core.Entities.userEnrollments
{
    public class UserEnrollments : BaseEntity
    {
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }
        public DateTime EnrollDate { get; set; } = DateTime.UtcNow;
        public string? Status { get; set; } = UserCourseStatus.Enrolled;

        public Course? Course { get; set; }
        public User? User { get; set; }

        public string GetUserCourseStatus(int status)
        {
            return status switch
            {
                0 => UserCourseStatus.Enrolled,
                1 => UserCourseStatus.Completed,
                2 => UserCourseStatus.Dropped,
                _ => UserCourseStatus.Enrolled,
            };
        }
    }
}
