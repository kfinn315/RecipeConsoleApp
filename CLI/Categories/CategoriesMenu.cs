using RecipeConsoleApp.Core.Entities;
using RecipeConsoleApp.Core.Interfaces;

namespace RecipeConsoleApp.CLI.Categories;
/*
* CLI Display or Input for a list of Categories
*/
public class CategoriesMenu
{
    private readonly IRepository<Category> repository;

    public CategoriesMenu(IRepository<Category> repository)
    {
        this.repository = repository;
    }
    public void List()
    {
        CategoriesCLI.List(repository.List());
    }
    public void Add()
    {
        var category = CategoriesCLI.Add(repository.List());
        repository.Add(category);
    }
    public void Edit()
    {
        var edit = CategoriesCLI.Edit(repository.List());
        if (edit != null)
        {
            repository.Edit(edit);
        }
    }
}