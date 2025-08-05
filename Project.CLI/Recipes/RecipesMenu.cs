using Project.CLI.Interfaces;
using Project.CLI.Recipes.Pages;
using Project.CLI.Client;

namespace Project.CLI.Recipes;

/*
* CLI Display or Input for a list of Recipes
*/
public class RecipesMenu
{
    public IAsyncPage ListPage { get; }
    public IAsyncPage AddPage { get; }
    public IAsyncPage EditPage { get; }


    public RecipesMenu(IRecipeClient recipeClient, IRecipesCLI recipesCLI)
    {
        this.ListPage = new ListRecipePage(recipeClient, recipesCLI);
        this.AddPage = new AddRecipePage(recipeClient, recipesCLI);
        this.EditPage = new EditRecipePage(recipeClient, recipesCLI);
    }
}
