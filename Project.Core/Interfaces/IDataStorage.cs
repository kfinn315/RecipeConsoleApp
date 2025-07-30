namespace Project.Core.Interfaces;

public interface IDataStorage<T>
{
    T? ReadData();
    void WriteData(T data);
}
