// Core/Interfaces/IRepository.cs
namespace CollageMangmentSystem.Core.Interfaces
{
    public interface IRepository<T>
        where T : class
    {
        Task<T?> GetByIdAsync(Guid id);
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task SaveChangesAsync();
        Task<IEnumerable<T>> GetAllAsyncPaged(
            int pageNumber,
            int pageSize,
            Func<IQueryable<T>, IQueryable<T>>? include = null
        );
        Task SoftDeleteAsync(T entity, Guid deletedById);

        Task<int> GetCountAsync();
    }
}
