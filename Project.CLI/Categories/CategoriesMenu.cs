using Project.CLI.Categories.Pages;
using Project.CLI.Interfaces;
using Project.CLI.Client;

namespace Project.CLI.Categories;

public class CategoriesMenu
{
    public IAsyncPage ListPage { get; }
    public IAsyncPage AddPage { get; }
    public IAsyncPage EditPage { get; }

    public CategoriesMenu(IRecipeClient recipeClient, ICategoriesCLI categoriesCLI)
    {
        this.ListPage = new ListCategoryPage(recipeClient, categoriesCLI);
        this.AddPage = new AddCategoryPage(recipeClient, categoriesCLI);
        this.EditPage = new EditCategoryPage(recipeClient, categoriesCLI);
    }
}
