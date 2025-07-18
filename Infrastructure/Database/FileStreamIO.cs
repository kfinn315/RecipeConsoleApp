using RecipeConsoleApp.Core.Interfaces;

namespace RecipeConsoleApp.Infrastructure.Database;

public class FileStreamIO : IStreamIO
{
    private StreamReader _streamReader;
    private StreamWriter _streamWriter;

    public FileStreamIO(string path)
    {
        _streamReader = new StreamReader(path, new FileStreamOptions() { Access = FileAccess.Read, Mode = FileMode.OpenOrCreate });
        _streamWriter = new StreamWriter(path, new FileStreamOptions() { Access = FileAccess.Write, Mode = FileMode.Truncate });
    }
    public StreamReader StreamReader { get => _streamReader; }
    public StreamWriter StreamWriter { get => _streamWriter; }
}
