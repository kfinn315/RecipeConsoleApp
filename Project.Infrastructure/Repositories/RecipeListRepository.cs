
using Project.Core.Entities;
using Project.Core.Interfaces;

namespace Project.Infrastructure.Repositories;

public class RecipeListRepository : IRepository<Recipe>
{
    private readonly List<Recipe> recipes;
    private readonly IDataStorage<List<Recipe>> stateManager;
    public RecipeListRepository(IDataStorage<List<Recipe>> manager)
    {
        recipes = manager.ReadData() ?? new List<Recipe>();
        stateManager = manager;
    }
    public void Add(Recipe item)
    {
        item.Id = recipes.Count;
        recipes.Add(item);
    }

    public void Edit(Recipe item)
    {
        recipes[recipes.IndexOf(recipes.First(x => x.Id == item.Id))] = item;
    }

    public IEnumerable<Recipe> List()
    {
        return recipes;
    }

    public void Dispose()
    {
        stateManager.WriteData(recipes);
    }

}
