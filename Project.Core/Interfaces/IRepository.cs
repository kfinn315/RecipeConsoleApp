using Project.Core.Entities;

namespace Project.Core.Interfaces;

public interface IRepository<T>
{
    Task<IEnumerable<T>> GetListAsync();
    Task<T> AddAsync(T item);
    Task UpdateAsync(T item);
    Task<T?> GetByIdAsync(int id);
    Task DeleteAsync(T existingItem);
}