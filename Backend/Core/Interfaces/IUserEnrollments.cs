namespace CollageManagementSystem.Core.Entities.userEnrollments
{
    public interface IUserEnrollments <T> where T : class
    {
        Task<List<UserEnrollments>> GetUserEnrollmentsById(Guid id);
        Task<List<UserEnrollments>> GetAllUserEnrollments();
        Task AddUserEnrollment(T userEnrollment);
        Task<bool> DeleteUserEnrollment(Guid id);

        Task SoftDeleteUserEnrollment(Guid id, Guid userID);
        Task<T> GetByIdAsync(Guid id);

        Task<bool> IsAlreadyEnrolled(Guid userId, Guid courseId);

    }
}