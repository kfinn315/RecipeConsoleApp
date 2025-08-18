namespace Project.Core.Interfaces;

public interface IRepository<T>
{
    IEnumerable<T> List();
    T Add(T item);
    void Update(T item);
}