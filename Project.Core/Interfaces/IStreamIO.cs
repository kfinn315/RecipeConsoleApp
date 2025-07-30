namespace Project.Core.Interfaces;

public interface IStreamIO
{
    StreamReader StreamReader { get; }
    StreamWriter StreamWriter { get; }
}
