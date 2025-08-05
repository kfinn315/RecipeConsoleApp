using System.Text.Json;
using Project.Core.Interfaces;

namespace Project.Infrastructure.Database;

/**
* Read and write an object to a stream in JSON format
**/
public class JsonFileDataStorage<T> : IDataStorage<T>
{
    private readonly string path;

    public JsonFileDataStorage(string path)
    {
        this.path = path;
    }

    public T? ReadData()
    {
        using var streamReader = new StreamReader(path, new FileStreamOptions() { Access = FileAccess.Read, Mode = FileMode.OpenOrCreate });

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
        using var streamWriter = new StreamWriter(path, new FileStreamOptions() { Access = FileAccess.Write, Mode = FileMode.Create });
        var json = JsonSerializer.Serialize<T>(data);
        streamWriter.Write(json);
    }
}
