


using Moq;
using RecipeConsoleApp.Core.Entities;
using RecipeConsoleApp.Core.Interfaces;
using RecipeConsoleApp.Infrastructure.Repositories;
using Xunit;

namespace RecipeConsoleApp.UnitTests.Infrastructure;

public class CategoryListRepositoryTests
{
    [Fact]
    public void Test_List_Lists_Correct_Data()
    {
        var mockDataStorage = new Mock<IDataStorage<List<Category>>>();
        var expected = new List<Category>() { new Category { Id = 0, Name = "my title" } };
        mockDataStorage.Setup(x => x.ReadData()).Returns(expected);
        var repo = new CategoryListRepository(mockDataStorage.Object);

        var actual = repo.List();

        Assert.Equivalent(expected, actual);
    }

    [Fact]
    public void Test_Add_WritesCorrect_Data()
    {
        var mockDataStorage = new Mock<IDataStorage<List<Category>>>();
        List<Category>? writtenState = null;
        mockDataStorage.Setup(x => x.WriteData(It.IsAny<List<Category>>())).Callback<List<Category>>(x => writtenState = x);
        var category = new Category { Id = 0, Name = "my title" };
        using (var repo = new CategoryListRepository(mockDataStorage.Object))
        {
            repo.Add(category);
        }

        Assert.NotNull(writtenState);
        Assert.Contains(category, writtenState);
    }
}