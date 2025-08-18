namespace Project.Core.Interfaces;

public interface IDataStorage<T>
{
    Task<T?> ReadDataAsync();
    Task WriteDataAsync(T data);
}
