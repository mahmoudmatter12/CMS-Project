using CollageMangmentSystem.Core.Entities.department;

namespace CollageMangmentSystem.Core.Interfaces
{
    public interface IDepRepostaory<T> : IRepository<Department> where T : class
    {
        Task<string> GetDepartmentName(Guid? departmentId);
        Task<string> GetDepartmentHDDName(Guid id);
    }
}