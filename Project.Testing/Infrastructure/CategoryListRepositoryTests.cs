using Moq;
using Project.Core.Entities;
using Project.Core.Interfaces;
using Project.Infrastructure.Repositories;
using Xunit;

namespace Project.Testing.Infrastructure;
/*
Reads and writes Category data to dataStorage
// Read:
// - does not return null, returns an empty list if datastorage returns null
// - returns list of items from datastorage
// - what if datastorage returns incorrect data type? return empty list
// Write:
// - writes list of categories to datastorage
// - if parameter `categories` is null, writes empty list to datastorage
Add:
- throw ArgumentNullException if parameter `item` is null
- assigns Id to parameter category
- writes parameter `item` to datastorage
- returns `item` (w/ Id set)
Update:
- throw ArgumentNullException if parameter `item` is null
- writes parameter `item` to datastorage, removing previous item from storage w/ the id
*/

public class CategoryListRepositoryTests
{
    [Fact]
    public async Task GetListAsync_Returns_Data()
    {
        var mockDataStorage = new Mock<IDataStorage<List<Category>>>();
        var expected = new List<Category>() { new Category { Id = 0, Name = "my title" }, new Category { Id = 1, Name = "my title1" } };
        mockDataStorage.Setup(x => x.ReadDataAsync()).ReturnsAsync(expected);
        var repo = new CategoryListRepository(mockDataStorage.Object);

        var actual = await repo.GetListAsync();

        Assert.Equivalent(expected, actual);
    }

    [Fact]
    public async Task AddAsync_Writes_Data()
    {
        var mockDataStorage = new Mock<IDataStorage<List<Category>>>();
        List<Category>? writtenState = null;
        mockDataStorage.Setup(x => x.WriteDataAsync(It.IsAny<List<Category>>())).Callback<List<Category>>(x => writtenState = x);
        var category = new Category { Id = 3, Name = "my title" };
        var repo = new CategoryListRepository(mockDataStorage.Object);
        await repo.AddAsync(category);

        Assert.NotNull(writtenState);
        Assert.Contains(category, writtenState);
    }

    [Fact]
    public async Task AddAsync_Creates_Id()
    {
        var mockDataStorage = new Mock<IDataStorage<List<Category>>>();
        List<Category>? writtenState = null;
        mockDataStorage.Setup(x => x.WriteDataAsync(It.IsAny<List<Category>>())).Callback<List<Category>>(x => writtenState = x);
        var category = new Category { Name = "my title" };
        var repo = new CategoryListRepository(mockDataStorage.Object);
        await repo.AddAsync(category);

        Assert.NotNull(writtenState);
        Assert.Contains(category, writtenState);
        Assert.NotNull(category.Id);
    }

    [Fact]
    public async Task AddAsync_Throws_ArgumentNullException_If_Item_IsNull()
    {
        // - throw ArgumentNullException if parameter `item` is null
        var mockDataStorage = new Mock<IDataStorage<List<Category>>>();
        var repo = new CategoryListRepository(mockDataStorage.Object);

        await Assert.ThrowsAsync<ArgumentNullException>(() => repo.AddAsync(null));

    }

    [Fact]
    public async Task AddAsync_Returns_Created()
    {
        // - returns `item` (w/ Id set)

        var mockDataStorage = new Mock<IDataStorage<List<Category>>>();
        List<Category>? writtenState = null;
        mockDataStorage.Setup(x => x.WriteDataAsync(It.IsAny<List<Category>>())).Callback<List<Category>>(x => writtenState = x);
        var category = new Category { Name = "my title" };
        var repo = new CategoryListRepository(mockDataStorage.Object);
        var actual = await repo.AddAsync(category);

        Assert.Equal(writtenState.First(), actual);
    }
}