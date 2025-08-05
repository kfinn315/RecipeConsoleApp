using System.Text.Json;
using Moq;
using Project.Core.Entities;
using Project.Infrastructure.Database;
using Project.Infrastructure.Repositories;
using Xunit;

namespace Project.Testing.Integration;

public class CategoriesRepositoryIntegrationTests : IDisposable
{
    string testFilePath = "./test_io_file.txt";

    public CategoriesRepositoryIntegrationTests()
    {
    }

    public void Dispose()
    {
        File.Delete(testFilePath);
    }

    [Fact]
    public void Test_Can_Write_RecipesList()
    {
        var jsonDataStorage = new JsonFileDataStorage<List<Recipe>>(testFilePath);
        var repository = new RecipeListRepository(jsonDataStorage);
        var recipe = new Recipe { Id = 0, Title = "recipe1", Ingredients = new List<string> { "i0", "i1", "i2" }, Instructions = "Do this do that" };
        repository.Add(recipe);


        using var streamReader = new StreamReader(testFilePath, new FileStreamOptions() { Access = FileAccess.Read, Mode = FileMode.Open });
        var json = streamReader.ReadToEnd();
        var actualRecipes = JsonSerializer.Deserialize<List<Recipe>>(json);
        Assert.NotNull(actualRecipes);
        Assert.Equivalent(recipe, actualRecipes.First());
    }

    [Fact]
    public void Test_Can_Read_RecipesList()
    {
        var recipe = new Recipe { Id = 0, Title = "recipe1", Ingredients = new List<string> { "i0", "i1", "i2" }, Instructions = "Do this do that" };
        using (var streamWriter = new StreamWriter(testFilePath, new FileStreamOptions() { Access = FileAccess.Write, Mode = FileMode.Create }))
        {
            var json = JsonSerializer.Serialize(new List<Recipe> { recipe });
            streamWriter.Write(json);
        }
        var jsonDataStorage = new JsonFileDataStorage<List<Recipe>>(testFilePath);
        var repository = new RecipeListRepository(jsonDataStorage);

        var actualRecipes = repository.List();
        Assert.Equivalent(recipe, actualRecipes?.FirstOrDefault());
    }
}