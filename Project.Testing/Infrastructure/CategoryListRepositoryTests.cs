


using Moq;
using Project.Core.Entities;
using Project.Core.Interfaces;
using Project.Infrastructure.Repositories;
using Xunit;

namespace Project.UnitTests.Infrastructure;

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
        var category = new Category { Id = 3, Name = "my title" };
        var repo = new CategoryListRepository(mockDataStorage.Object);
        repo.Add(category);

        Assert.NotNull(writtenState);
        Assert.Contains(category, writtenState);
    }

    [Fact]
    public void Test_Add_CreatesId_0()
    {
        var mockDataStorage = new Mock<IDataStorage<List<Category>>>();
        List<Category>? writtenState = null;
        mockDataStorage.Setup(x => x.WriteData(It.IsAny<List<Category>>())).Callback<List<Category>>(x => writtenState = x);
        var category = new Category { Name = "my title" };
        var repo = new CategoryListRepository(mockDataStorage.Object);
        repo.Add(category);

        Assert.NotNull(writtenState);
        Assert.Contains(category, writtenState);
        Assert.Equal(0, category.Id);
    }
}