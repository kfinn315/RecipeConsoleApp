


using Moq;
using Project.Core.Entities;
using Project.Core.Interfaces;
using Project.Infrastructure.Repositories;
using Xunit;

namespace Project.UnitTests.Infrastructure;

public class RecipeListRepositoryTests
{
    [Fact]
    public void Test_List_Lists_Correct_Data()
    {
        var mockDataStorage = new Mock<IDataStorage<List<Recipe>>>();
        var expected = new List<Recipe>() { new Recipe { Id = 0, Title = "my title", Ingredients = new List<string>(), Instructions = "", Categories = new List<string>() { "c1", "c2" } } };
        mockDataStorage.Setup(x => x.ReadData()).Returns(expected);
        var repo = new RecipeListRepository(mockDataStorage.Object);

        var actual = repo.List();

        Assert.Equivalent(expected, actual);
    }

    [Fact]
    public void Test_Add_WritesCorrect_Data()
    {
        var mockDataStorage = new Mock<IDataStorage<List<Recipe>>>();
        List<Recipe>? writtenState = null;
        mockDataStorage.Setup(x => x.WriteData(It.IsAny<List<Recipe>>())).Callback<List<Recipe>>(x => writtenState = x);
        var recipe = new Recipe { Id = 0, Title = "my title", Ingredients = new List<string>(), Instructions = "", Categories = new List<string>() { "c1", "c2" } };
        using (var repo = new RecipeListRepository(mockDataStorage.Object))
        {
            repo.Add(recipe);
        }

        Assert.NotNull(writtenState);
        Assert.Contains(recipe, writtenState);
    }
}