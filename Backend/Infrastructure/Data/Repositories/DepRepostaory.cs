using CollageManagementSystem.Services;
using CollageMangmentSystem.Core.Entities.department;
using CollageMangmentSystem.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CollageMangmentSystem.Infrastructure.Data.Repositories
{
    public class DepRepostaory<T> : IDepRepostaory<T> where T : class

    {
        protected readonly ApplicationDbContext _context;
        private readonly IUserService _userService;
        public DepRepostaory(ApplicationDbContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        public async Task AddAsync(Department entity)
        {
            await _context.Set<Department>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Department entity)
        {
            _context.Set<Department>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Department>> GetAllAsync()
        {
            return await _context.Set<Department>().ToListAsync();
        }

        public async Task<IEnumerable<Department>> GetAllAsyncPaged(int pageNumber, int pageSize, Func<IQueryable<Department>, IQueryable<Department>>? include = null)
        {
            var query = _context.Set<Department>().AsQueryable();

            if (include != null)
            {
                query = include(query);
            }

            return await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        }

        public async Task<Department?> GetByIdAsync(Guid id)
        {
            return await _context.Set<Department>().FindAsync(id);
        }

        public async Task<string> GetDepartmentName(Guid? departmentId)
        {
            var department = await _context.Departments.FindAsync(departmentId);
            return department != null ? department.Name : string.Empty;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Department entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteAsync(Department entity, Guid deletedById)
        {
            // Assuming T has a property called IsDeleted
            var property = typeof(T).GetProperty("IsDeleted");
            var deletedByProperty = typeof(T).GetProperty("DeletedBy");
            var deletedAtProperty = typeof(T).GetProperty("DeletedAt");
            if (property != null && deletedByProperty != null && deletedAtProperty != null)
            {
                property.SetValue(entity, true);
                deletedByProperty.SetValue(entity, deletedById);
                deletedAtProperty.SetValue(entity, DateTime.UtcNow);
                await UpdateAsync(entity);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Entity does not have the required properties for soft deletion.");
            }
        }

        public async Task<int> GetCountAsync()
        {
            return await _context.Set<Department>().CountAsync();
        }

        public async Task<string> GetDepartmentHDDName(Guid id)
        {
            var user = await _userService.GetUserById(id);
            return user?.FullName ?? string.Empty;
        }

    }
}