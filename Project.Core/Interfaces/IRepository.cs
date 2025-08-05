namespace Project.Core.Interfaces;

public interface IRepository<T>
{
    IEnumerable<T> List();
    void Add(T item);
    void Edit(T item);
}