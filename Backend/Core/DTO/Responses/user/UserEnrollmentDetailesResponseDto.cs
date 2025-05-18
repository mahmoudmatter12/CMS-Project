using CollageMangmentSystem.Core.Entities;

namespace CollageMangmentSystem.Core.DTO.Responses.user
{
    public class UserEnrollmentDetailesResponseDto
    {
        // enrrollment has a course course has a instructor as a user and the course has a prerequestis and the course has a department and the department has a HOD and the course may have a quizzes is creadted for
        // and this quizzes has a metaData we nned to get

        // IDs
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }
        public Guid? DepId { get; set; }
        public List<Guid>? QuizId { get; set; }
        public Guid? InstructorId { get; set; }
        public Guid? HODID { get; set; }

        // user Part
        public string? StudentName { get; set; }

        public string? StudentEmail { get; set; }

        // course Part
        public string? CourseName { get; set; }
        public string? CourseCode { get; set; }
        public int? Semester { get; set; }
        public int? CreditHours { get; set; }

        // instructor Part

        public string? InstructorName { get; set; }
        public string? InstructorEmail { get; set; }
        public string? InstructorImg { get; set; }

        // department Part
        public string? DepName { get; set; }
        public string? HODName { get; set; }

        // quiz Part
        public List<QuizMetaData>? QuizMetaData { get; set; } = new List<QuizMetaData>();
    }

    public class QuizMetaData
    {
        public Guid? QuizId { get; set; }
        public string? QuizTitle { get; set; }
        public string? QuizDescription { get; set; }
        public DateTime? QuizStartDate { get; set; }
        public DateTime? QuizEndDate { get; set; }
        public int? QuizDuration { get; set; }
        public string? QuizCreator { get; set; }
    }
}
