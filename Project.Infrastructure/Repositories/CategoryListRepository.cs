using System.Threading.Tasks;
using Project.Core.Entities;
using Project.Core.Interfaces;

namespace Project.Infrastructure.Repositories;

public class CategoryListRepository : IRepository<Category>
{
    private readonly IDataStorage<List<Category>> dataStorage;

    public CategoryListRepository(IDataStorage<List<Category>> dataStorage)
    {
        this.dataStorage = dataStorage;
    }
    private async Task<List<Category>> ReadAsync()
    {
        return await dataStorage.ReadDataAsync() ?? new List<Category>();
    }
    private async Task WriteAsync(List<Category> categories)
    {
        Console.WriteLine("Writing categories to storage");
        await dataStorage.WriteDataAsync(categories);
    }
    public async Task<Category> AddAsync(Category item)
    {
        ArgumentNullException.ThrowIfNull(item);
        var categories = await ReadAsync();
        item.Id = categories.Count;
        categories.Add(item);
        await WriteAsync(categories);
        return item;
    }

    public async Task UpdateAsync(Category item)
    {
        ArgumentNullException.ThrowIfNull(item);
        var categories = await ReadAsync();
        categories.Add(item);
        await WriteAsync(categories);
    }

    public async Task<IEnumerable<Category>> GetListAsync()
    {
        return await ReadAsync();
    }

    public async Task<Category?> GetByIdAsync(int id)
    {
        var categories = await ReadAsync();
        return categories.Find(x => x.Id == id);
    }

    public async Task DeleteAsync(Category existingItem)
    {
        var categories = await ReadAsync();
        categories.RemoveAll(x => x.Id == existingItem.Id);
    }
}