using Project.Core.Entities;
using Project.Infrastructure.Database;
using Xunit;

namespace Project.Testing.Integration;

public class JsonDataStorageIntegrationTests : IDisposable
{
    string testFilePath = "./test_io_file_1.txt";

    public JsonDataStorageIntegrationTests()
    {
    }

    public void Dispose()
    {
        File.Delete(testFilePath);
    }

    [Fact]
    public async Task Test_Can_Write_AndRead_Empty_RecipesListAsync()
    {
        var jsonDataStorage = new JsonFileDataStorage<IEnumerable<Recipe>>(testFilePath);
        var recipes = new List<Recipe>();
        await jsonDataStorage.WriteDataAsync(recipes);
        var actualRecipes = await jsonDataStorage.ReadDataAsync();

        Assert.Equivalent(recipes, actualRecipes);
    }

    [Fact]
    public async Task Test_Can_Write_AndRead_RecipesListAsync()
    {
        var jsonDataStorage = new JsonFileDataStorage<IEnumerable<Recipe>>(testFilePath);
        var recipes = new List<Recipe>() { { new Recipe { Id = 0, Title = "MyRecipe", Ingredients = new List<string> { "i1", "i2" }, Instructions = "instructions000111" } } };
        await jsonDataStorage.WriteDataAsync(recipes);
        var actualRecipes = await jsonDataStorage.ReadDataAsync();

        Assert.Equivalent(recipes, actualRecipes);
    }

    [Fact]
    public async Task Test_Can_Write_AndRead_NullAsync()
    {
        var jsonDataStorage = new JsonFileDataStorage<IEnumerable<Recipe>>(testFilePath);
#pragma warning disable CS8625 // Cannot convert null literal to non-nullable reference type.
        await jsonDataStorage.WriteDataAsync(null);
#pragma warning restore CS8625 // Cannot convert null literal to non-nullable reference type.
        var actualRecipes = await jsonDataStorage.ReadDataAsync();

        Assert.Null(actualRecipes);
    }

    [Fact]
    public async Task Test_Can_Write_AndRead_CategoriesAsync()
    {
        var jsonDataStorage = new JsonFileDataStorage<IEnumerable<Category>>(testFilePath);
        var categories = new List<Category>() { { new Category { Id = 0, Name = "MyCategory0" } }, new Category { Id = 1, Name = "MyCategory1" } };
        await jsonDataStorage.WriteDataAsync(categories);
        var actualCategories = await jsonDataStorage.ReadDataAsync();

        Assert.Equivalent(categories, actualCategories);
    }
}