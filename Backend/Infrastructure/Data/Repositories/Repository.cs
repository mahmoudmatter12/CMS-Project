// Infrastructure/Data/Repositories/Repository.cs
using CollageMangmentSystem.Core.Interfaces;
using Microsoft.EntityFrameworkCore; // Required for ToListAsync and other EF Core async methods

namespace CollageMangmentSystem.Infrastructure.Data.Repositories;
public class Repository<T> : IRepository<T> where T : class
{
    protected readonly ApplicationDbContext _context;

    public Repository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<T?> GetByIdAsync(Guid id)
        => await _context.Set<T>().FindAsync(id);

    public async Task<IEnumerable<T>> GetAllAsync()
        => await _context.Set<T>().ToListAsync();

    public async Task AddAsync(T entity)
    {
        await _context.Set<T>().AddAsync(entity);
        await _context.SaveChangesAsync(); // Add this line
    }

    public async Task UpdateAsync(T entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(T entity)
    {
        _context.Set<T>().Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<T>> GetAllAsyncPaged(int pageNumber, int pageSize, Func<IQueryable<T>, IQueryable<T>>? include = null)
    {
        var query = _context.Set<T>().AsQueryable();

        if (include != null)
        {
            query = include(query);
        }

        return await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
    }

    public async Task<int> GetCountAsync()
    {
        return await _context.Set<T>().CountAsync();
    }

    public async Task SoftDeleteAsync(T entity , Guid deletedById)
    {
        // Assuming T has a property called IsDeleted
        var property = typeof(T).GetProperty("IsDeleted");
        var deletedByProperty = typeof(T).GetProperty("DeletedBy");
        var deletedAt = typeof(T).GetProperty("DeletedAt");
        if (property != null && deletedByProperty != null && deletedAt != null)
        {
            deletedAt.SetValue(entity, DateTime.UtcNow);
            property.SetValue(entity, true);
            deletedByProperty.SetValue(entity, deletedById.ToString());
            await UpdateAsync(entity);
            await _context.SaveChangesAsync();
        }
        else
        {
            throw new Exception("Soft delete properties not found");
        }
    }
}