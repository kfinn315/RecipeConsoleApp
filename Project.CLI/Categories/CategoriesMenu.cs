using RecipeConsoleApp.CLI.Interfaces;
using RecipeConsoleApp.CLI.Pages;
using RecipeConsoleApp.Core.Entities;
using RecipeConsoleApp.Core.Interfaces;

namespace RecipeConsoleApp.CLI.Categories;

public class CategoriesMenu
{
    private readonly IRepository<Category> repository;

    public IPage ListPage { get; }
    public IPage AddPage { get; }
    public IPage EditPage { get; }

    public CategoriesMenu(IRepository<Category> repository, ICategoriesCLI categoriesCLI)
    {
        this.repository = repository;
        this.ListPage = new Page("List Categories", () =>
        {
            categoriesCLI.DisplayList(this.repository.List());
        });
        this.AddPage = new Page("Add Category", () =>
        {
            var category = categoriesCLI.DisplayCreate();
            repository.Add(category);
        });
        this.EditPage = new Page("Edit Category", () =>
        {
            var edit = categoriesCLI.DisplayEdit(repository.List());
            if (edit != null)
            {
                repository.Edit(edit);
            }
        });
    }
}
