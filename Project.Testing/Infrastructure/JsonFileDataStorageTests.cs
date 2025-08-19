using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Project.Infrastructure.Database;
using Xunit;

namespace Project.Testing.Infrastructure;

public class JsonFileDataStorageTests : IDisposable
{
    private const string TestFilePath = "test.json";
    public void Dispose() // Teardown for each test
    {
        // Cleanup
        File.Delete(TestFilePath);
    }

    [Fact]
    public async Task ReadDataAsync_ReturnsDeserializedObject_WhenFileContainsValidJson()
    {
        // Arrange
        var testData = new TestData { Id = 1, Name = "Test" };
        var json = JsonSerializer.Serialize(testData);
        await File.WriteAllTextAsync(TestFilePath, json);

        var storage = new JsonFileDataStorage<TestData>(TestFilePath);

        // Act
        var result = await storage.ReadDataAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(testData.Id, result?.Id);
        Assert.Equal(testData.Name, result?.Name);

    }

    [Fact]
    public async Task ReadDataAsync_ReturnsDefault_WhenFileIsEmpty()
    {
        // Arrange
        await File.WriteAllTextAsync(TestFilePath, string.Empty);
        var storage = new JsonFileDataStorage<TestData>(TestFilePath);

        // Act
        var result = await storage.ReadDataAsync();

        // Assert
        Assert.Null(result);

    }

    [Fact]
    public async Task ReadDataAsync_ReturnsDefault_WhenFileContainsInvalidJson()
    {
        // Arrange
        await File.WriteAllTextAsync(TestFilePath, "Invalid JSON");
        var storage = new JsonFileDataStorage<TestData>(TestFilePath);

        // Act
        var result = await storage.ReadDataAsync();

        // Assert
        Assert.Null(result);

    }

    [Fact]
    public async Task WriteDataAsync_WritesSerializedObjectToFile()
    {
        // Arrange
        var testData = new TestData { Id = 1, Name = "Test" };
        var storage = new JsonFileDataStorage<TestData>(TestFilePath);

        // Act
        await storage.WriteDataAsync(testData);

        // Assert
        var json = await File.ReadAllTextAsync(TestFilePath);
        var result = JsonSerializer.Deserialize<TestData>(json);

        Assert.NotNull(result);
        Assert.Equal(testData.Id, result?.Id);
        Assert.Equal(testData.Name, result?.Name);

    }

    [Fact]
    public async Task WriteDataAsync_OverwritesExistingFile()
    {
        // Arrange
        var initialData = new TestData { Id = 1, Name = "Initial" };
        var newData = new TestData { Id = 2, Name = "New" };

        await File.WriteAllTextAsync(TestFilePath, JsonSerializer.Serialize(initialData));
        var storage = new JsonFileDataStorage<TestData>(TestFilePath);

        // Act
        await storage.WriteDataAsync(newData);

        // Assert
        var json = await File.ReadAllTextAsync(TestFilePath);
        var result = JsonSerializer.Deserialize<TestData>(json);

        Assert.NotNull(result);
        Assert.Equal(newData.Id, result?.Id);
        Assert.Equal(newData.Name, result?.Name);

    }

    private class TestData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}