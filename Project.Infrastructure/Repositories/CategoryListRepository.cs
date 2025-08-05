
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
    private List<Category> Read()
    {
        return dataStorage.ReadData() ?? new List<Category>();
    }
    private void Write(List<Category> categories)
    {
        Console.WriteLine("Writing categories to storage");
        dataStorage.WriteData(categories);
    }
    public void Add(Category item)
    {
        var categories = Read();
        if (item.Id == null)
        {
            item.Id = categories.Count;
        }
        categories.Add(item);
        Write(categories);
    }

    public void Edit(Category item)
    {
        var categories = Read();
        categories.Add(item);
        Write(categories);
    }

    public IEnumerable<Category> List()
    {
        return Read();
    }

}