namespace CollageManagementSystem.Core.Entities.userEnrollments
{
    public class CreateUserEnrollmentDto
    {
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }
    }

}