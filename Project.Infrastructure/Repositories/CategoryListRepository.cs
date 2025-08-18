using Project.Core.Entities;
using Project.Core.Interfaces;

namespace Project.Infrastructure.Repositories;

//Make these methods Async - they read and write from filesystem which can take time

public class CategoryListRepository : IRepository<Category>
{
    private readonly IDataStorage<List<Category>> dataStorage;

    public CategoryListRepository(IDataStorage<List<Category>> dataStorage)
    {
        this.dataStorage = dataStorage;
    }
    private List<Category> Read()
    {
        return dataStorage.ReadData() ?? new List<Category>();
    }
    private void Write(List<Category> categories)
    {
        Console.WriteLine("Writing categories to storage");
        dataStorage.WriteData(categories);
    }
    public Category Add(Category item)
    {
        ArgumentNullException.ThrowIfNull(item);
        var categories = Read();
        item.Id = categories.Count;
        categories.Add(item);
        Write(categories);
        return item;
    }

    public void Update(Category item)
    {
        ArgumentNullException.ThrowIfNull(item);
        var categories = Read();
        categories.Add(item);
        Write(categories);
    }

    public IEnumerable<Category> List()
    {
        return Read();
    }

}