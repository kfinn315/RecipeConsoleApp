using System.Text.Json;
using Moq;
using Project.Core.Interfaces;
using Project.Infrastructure.Database;
using Xunit;

namespace Project.UnitTests.Infrastructure;

public class JsonDataStorageUnitTests
{
    [Fact]
    public void Test_ReadData_Returns_String()
    {
        string testData = "Blah";
        var _streamReaderMock = new Mock<StreamReader>("test.json");
        var _mockStreamIO = new Mock<IStreamIO>();
        _mockStreamIO.Setup(x => x.StreamReader).Returns(_streamReaderMock.Object);
        _streamReaderMock.Setup(x => x.ReadToEnd()).Returns(JsonSerializer.Serialize(testData));

        var jsonDataStorage = new JsonDataStorage<string>(_mockStreamIO.Object);

        var data = jsonDataStorage.ReadData();
        Assert.Equal(testData, data);
    }

    [Fact]
    public void Test_ReadData_Returns_List()
    {
        var testData = new List<string>() { "hello", "world" };
        var _streamReaderMock = new Mock<StreamReader>("test.json");
        var _mockStreamIO = new Mock<IStreamIO>();
        _mockStreamIO.Setup(x => x.StreamReader).Returns(_streamReaderMock.Object);
        _streamReaderMock.Setup(x => x.ReadToEnd()).Returns(JsonSerializer.Serialize(testData));

        var jsonDataStorage = new JsonDataStorage<List<string>>(_mockStreamIO.Object);

        var data = jsonDataStorage.ReadData();
        Assert.Equivalent(testData, data);
    }
    [Fact]
    public void Test_ReadData_ReturnsNull_WhenNotJSON()
    {
        var testData = new List<string>() { "hello", "world" };
        var _streamReaderMock = new Mock<StreamReader>("test.json");
        var _mockStreamIO = new Mock<IStreamIO>();
        _mockStreamIO.Setup(x => x.StreamReader).Returns(_streamReaderMock.Object);
        _streamReaderMock.Setup(x => x.ReadToEnd()).Returns("This is not a json string");

        var jsonDataStorage = new JsonDataStorage<List<string>>(_mockStreamIO.Object);

        var data = jsonDataStorage.ReadData();
        Assert.Null(data);
    }
    [Fact]
    public void Test_WriteData_WritesToStream_JsonList()
    {
        var testData = new List<string>() { "hello", "world" };
        var _streamWriterMock = new Mock<StreamWriter>("test.json");
        var _mockStreamIO = new Mock<IStreamIO>();
        _mockStreamIO.Setup(x => x.StreamWriter).Returns(_streamWriterMock.Object);
        var json = JsonSerializer.Serialize(testData);
        var jsonDataStorage = new JsonDataStorage<List<string>>(_mockStreamIO.Object);

        jsonDataStorage.WriteData(testData);

        _streamWriterMock.Verify(x => x.Write(json), Times.Once);
    }
    [Fact]
    public void Test_WriteData_WritesToStream_Null()
    {
        string? testData = null;
        var _streamWriterMock = new Mock<StreamWriter>("test.json");
        var _mockStreamIO = new Mock<IStreamIO>();
        _mockStreamIO.Setup(x => x.StreamWriter).Returns(_streamWriterMock.Object);
        var jsonDataStorage = new JsonDataStorage<string?>(_mockStreamIO.Object);

        jsonDataStorage.WriteData(testData);

        _streamWriterMock.Verify(x => x.Write("null"), Times.Once);
    }
}