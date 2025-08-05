
using Project.Core.Entities;
using Project.Core.Interfaces;

namespace Project.Infrastructure.Repositories;

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
    public void Add(Recipe item)
    {
        var recipes = Read();
        item.Id = recipes.Count;
        recipes.Add(item);
        Write(recipes);
    }

    public void Edit(Recipe item)
    {
        var recipes = Read();
        recipes[recipes.IndexOf(recipes.First(x => x.Id == item.Id))] = item;
        Write(recipes);
    }

    public IEnumerable<Recipe> List()
    {
        return Read();
    }
}
