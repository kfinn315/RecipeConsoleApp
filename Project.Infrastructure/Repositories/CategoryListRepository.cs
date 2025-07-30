
using Project.Core.Entities;
using Project.Core.Interfaces;

namespace Project.Infrastructure.Repositories;

public class CategoryListRepository : IRepository<Category>, IDisposable
{
    private readonly List<Category> categories;
    private readonly IDataStorage<List<Category>> stateManager;

    public CategoryListRepository(IDataStorage<List<Category>> manager)
    {
        categories = manager.ReadData() ?? new List<Category>();
        stateManager = manager;
    }
    public void Add(Category item)
    {
        categories.Add(item);
    }

    public void Edit(Category item)
    {
        categories.Add(item);
    }

    public IEnumerable<Category> List()
    {
        return categories;
    }

    public void Dispose()
    {
        stateManager.WriteData(categories);
    }
}