namespace RecipeConsoleApp.Core.Interfaces;

public interface IRepository<T>: IDisposable
{
    IEnumerable<T> List();
    void Add(T item);
    void Edit(T item);
}