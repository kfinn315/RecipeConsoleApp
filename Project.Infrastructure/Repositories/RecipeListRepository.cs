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
    private async Task<List<Recipe>> ReadAsync()
    {
        return await dataStorage.ReadDataAsync() ?? new List<Recipe>();
    }
    private async Task WriteAsync(List<Recipe> recipes)
    {
        Console.WriteLine("Writing recipes to storage");
        await dataStorage.WriteDataAsync(recipes);
    }
    public async Task<Recipe> AddAsync(Recipe item)
    {
        ArgumentNullException.ThrowIfNull(item);
        var recipes = await ReadAsync();
        item.Id = recipes.Count;
        recipes.Add(item);
        await WriteAsync(recipes);
        return item;
    }

    public async Task UpdateAsync(Recipe item)
    {
        ArgumentNullException.ThrowIfNull(item);
        var recipes = await ReadAsync();
        recipes[recipes.IndexOf(recipes.First(x => x.Id == item.Id))] = item;
        await WriteAsync(recipes);
    }

    public async Task<IEnumerable<Recipe>> GetListAsync()
    {
        return await ReadAsync();
    }

    public async Task<Recipe?> GetByIdAsync(int id)
    {
        var recipes = await ReadAsync();
        return recipes.First(x => x.Id == id);
    }

    public async Task DeleteAsync(Recipe existingItem)
    {
        var recipes = await ReadAsync();
        recipes.RemoveAll(x => existingItem.Id == x.Id);
    }
}