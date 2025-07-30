using System.Text.Json;
using Project.Core.Interfaces;

namespace Project.Infrastructure.Database;

/**
* Read and write an object to a stream in JSON format
**/
public class JsonDataStorage<T> : IDataStorage<T>
{
    private readonly IStreamIO streamIO;
    public JsonDataStorage(IStreamIO streamIO)
    {
        this.streamIO = streamIO;
    }

    public T? ReadData()
    {
        using var streamReader = streamIO.StreamReader;

        var json = streamReader.ReadToEnd();
        if (string.IsNullOrEmpty(json))
        {
            //empty
            return default;
        }
        try
        {
            return JsonSerializer.Deserialize<T>(json);
        }
        catch (JsonException ex)
        {
            Console.Error.WriteLine(ex.Message);
            return default;
        }
    }

    public void WriteData(T data)
    {
        using var streamWriter = streamIO.StreamWriter;
        var json = JsonSerializer.Serialize<T>(data);
        streamWriter.Write(json);
    }
}
