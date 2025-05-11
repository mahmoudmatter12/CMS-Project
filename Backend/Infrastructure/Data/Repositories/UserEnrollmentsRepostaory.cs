using CollageMangmentSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CollageManagementSystem.Core.Entities.userEnrollments
{
    public class UserEnrollmentsRepostaory<T> : IUserEnrollments<T> where T : UserEnrollments
    {
        private readonly ApplicationDbContext _context;
        public UserEnrollmentsRepostaory(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddUserEnrollment(T userEnrollment)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                await _context.UserEnrollments.AddAsync(userEnrollment);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            var userEnrollment = await _context.Set<T>().FindAsync(id);
            if (userEnrollment == null)
            {
                throw new Exception($"User enrollment with id {id} not found.");
            }
            return userEnrollment;
        }

        // soft delete
        public async Task SoftDeleteUserEnrollment(Guid id , Guid userID)
        {
            var userEnrollment = await _context.Set<T>().FindAsync(id);
            if (userEnrollment == null)
            {
                throw new Exception($"User enrollment with id {id} not found.");
            }

            userEnrollment.IsDeleted = true;
            userEnrollment.DeletedAt = DateTime.UtcNow;
            userEnrollment.DeletedBy = userID.ToString();
            _context.Set<T>().Update(userEnrollment);
            await _context.SaveChangesAsync();
        }
        // hard delete
        public Task<bool> DeleteUserEnrollment(Guid id)
        {
            var userEnrollment = _context.Set<T>().Find(id);
            if (userEnrollment == null)
            {
                return Task.FromResult(false);
            }

            _context.Set<T>().Remove(userEnrollment);
            return _context.SaveChangesAsync().ContinueWith(t => t.Result > 0);
        }

        public Task<List<UserEnrollments>> GetAllUserEnrollments()
        {
            return _context.UserEnrollments.ToListAsync();
        }

        public Task<List<UserEnrollments>> GetUserEnrollmentsById(Guid id)
        {
            return _context.UserEnrollments
                .Where(ue => ue.UserId == id)
                .ToListAsync();
        }

        public async Task<bool> IsAlreadyEnrolled(Guid userId, Guid courseId)
        {
            var enrollment = await _context.UserEnrollments
                .AsNoTracking() // Recommended for read-only operations
                .FirstOrDefaultAsync(ue => ue.UserId == userId && ue.CourseId == courseId);

            return enrollment != null;
        }


    }
}
