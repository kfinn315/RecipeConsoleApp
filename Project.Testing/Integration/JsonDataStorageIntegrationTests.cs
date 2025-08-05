using Project.Core.Entities;
using Project.Infrastructure.Database;
using Xunit;

namespace Project.Testing.Integration;

public class JsonDataStorageIntegrationTests : IDisposable
{
    string testFilePath = "./test_io_file.txt";

    public JsonDataStorageIntegrationTests()
    {
    }

    public void Dispose()
    {
        File.Delete(testFilePath);
    }

    [Fact]
    public void Test_Can_Write_AndRead_Empty_RecipesList()
    {
        var jsonDataStorage = new JsonFileDataStorage<IEnumerable<Recipe>>(testFilePath);
        var recipes = new List<Recipe>();
        jsonDataStorage.WriteData(recipes);
        var actualRecipes = jsonDataStorage.ReadData();

        Assert.Equivalent(recipes, actualRecipes);
    }

    [Fact]
    public void Test_Can_Write_AndRead_RecipesList()
    {
        var jsonDataStorage = new JsonFileDataStorage<IEnumerable<Recipe>>(testFilePath);
        var recipes = new List<Recipe>() { { new Recipe { Id = 0, Title = "MyRecipe", Ingredients = new List<string> { "i1", "i2" }, Instructions = "instructions000111" } } };
        jsonDataStorage.WriteData(recipes);
        var actualRecipes = jsonDataStorage.ReadData();

        Assert.Equivalent(recipes, actualRecipes);
    }

    [Fact]
    public void Test_Can_Write_AndRead_Null()
    {
        var jsonDataStorage = new JsonFileDataStorage<IEnumerable<Recipe>>(testFilePath);
#pragma warning disable CS8625 // Cannot convert null literal to non-nullable reference type.
        jsonDataStorage.WriteData(null);
#pragma warning restore CS8625 // Cannot convert null literal to non-nullable reference type.
        var actualRecipes = jsonDataStorage.ReadData();

        Assert.Null(actualRecipes);
    }

    [Fact]
    public void Test_Can_Write_AndRead_Categories()
    {
        var jsonDataStorage = new JsonFileDataStorage<IEnumerable<Category>>(testFilePath);
        var recipes = new List<Category>() { { new Category { Id = 0, Name = "MyCategory0" } }, new Category { Id = 1, Name = "MyCategory1" } };
        jsonDataStorage.WriteData(recipes);
        var actualRecipes = jsonDataStorage.ReadData();

        Assert.Equivalent(recipes, actualRecipes);
    }
}