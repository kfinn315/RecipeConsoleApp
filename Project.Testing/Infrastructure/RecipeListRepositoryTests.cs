


using System.Threading.Tasks;
using Moq;
using Project.Core.Entities;
using Project.Core.Interfaces;
using Project.Infrastructure.Repositories;
using Xunit;

namespace Project.UnitTests.Infrastructure;

/*
Reads and writes Recipe data to dataStorage
// Read:
// - does not return null, returns an empty list if datastorage returns null
// - returns list of items from datastorage
// - what if datastorage returns incorrect data type? return empty list
// Write:
// - writes list of categories to datastorage
// - if parameter `recipes` is null, writes empty list to datastorage
Add:
- throw ArgumentNullException if parameter `item` is null
- assigns Id to parameter `item`
- writes parameter `item` to datastorage
- returns `item` (w/ Id set)
Update:
- throw ArgumentNullException if parameter `item` is null
- writes parameter `item` to datastorage, removing previous item from storage w/ the id
*/

public class RecipeListRepositoryTests
{
    [Fact]
    public async Task GetListAsync_Returns_Correct_Data()
    {
        var mockDataStorage = new Mock<IDataStorage<List<Recipe>>>();
        var expected = new List<Recipe>() { new Recipe { Id = 0, Title = "my title", Ingredients = new List<string>(), Instructions = "", Categories = new List<int>() { 1, 254 } } };
        mockDataStorage.Setup(x => x.ReadDataAsync()).ReturnsAsync(expected);
        var repo = new RecipeListRepository(mockDataStorage.Object);

        var actual = await repo.GetListAsync();

        Assert.Equivalent(expected, actual);
    }

    [Fact]
    public async Task AddAsync_WritesCorrect_Data()
    {
        var mockDataStorage = new Mock<IDataStorage<List<Recipe>>>();
        List<Recipe>? writtenState = null;
        mockDataStorage.Setup(x => x.WriteDataAsync(It.IsAny<List<Recipe>>())).Callback<List<Recipe>>(x => writtenState = x);
        var recipe = new Recipe { Id = 0, Title = "my title", Ingredients = new List<string>(), Instructions = "", Categories = new List<int>() { 1, 2 } };
        var repo = new RecipeListRepository(mockDataStorage.Object);
        await repo.AddAsync(recipe);

        Assert.NotNull(writtenState);
        Assert.Contains(recipe, writtenState);
    }


    [Fact]
    public async Task AddAsync_Throws_ArgumentNullException_If_Item_IsNull()
    {
        // - throw ArgumentNullException if parameter `item` is null
        var mockDataStorage = new Mock<IDataStorage<List<Recipe>>>();
        var repo = new RecipeListRepository(mockDataStorage.Object);

        await Assert.ThrowsAsync<ArgumentNullException>(() => repo.AddAsync(null));

    }

    [Fact]
    public async Task AddAsync_Returns_Created()
    {
        // - returns `item` (w/ Id set)

        var mockDataStorage = new Mock<IDataStorage<List<Recipe>>>();
        List<Recipe>? writtenState = null;
        mockDataStorage.Setup(x => x.WriteDataAsync(It.IsAny<List<Recipe>>())).Callback<List<Recipe>>(x => writtenState = x);
        var recipe = new Recipe { Title = "my title" };
        var repo = new RecipeListRepository(mockDataStorage.Object);
        var actual = await repo.AddAsync(recipe);

        Assert.Equal(writtenState.First(), actual);
    }
}