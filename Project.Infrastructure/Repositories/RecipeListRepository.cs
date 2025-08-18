using Project.Core.Entities;
using Project.Core.Interfaces;

namespace Project.Infrastructure.Repositories;

//Make these methods Async - they read and write from filesystem which can take time

public class RecipeListRepository : IRepository<Recipe>
{
    private readonly IDataStorage<List<Recipe>> dataStorage;
    public RecipeListRepository(IDataStorage<List<Recipe>> dataStorage)
    {
        this.dataStorage = dataStorage;
    }
    private List<Recipe> Read()
    {
        return dataStorage.ReadData() ?? new List<Recipe>();
    }
    private void Write(List<Recipe> recipes)
    {
        Console.WriteLine("Writing recipes to storage");
        dataStorage.WriteData(recipes);
    }
    public Recipe Add(Recipe item)
    {
        ArgumentNullException.ThrowIfNull(item);
        var recipes = Read();
        item.Id = recipes.Count;
        recipes.Add(item);
        Write(recipes);
        return item;
    }

    public void Update(Recipe item)
    {
        ArgumentNullException.ThrowIfNull(item);
        var recipes = Read();
        recipes[recipes.IndexOf(recipes.First(x => x.Id == item.Id))] = item;
        Write(recipes);
    }

    public IEnumerable<Recipe> List()
    {
        return Read();
    }
}