using Project.CLI.Interfaces;
using Project.CLI.Client;
using Spectre.Console;

namespace Project.CLI.Recipes.Pages;

class ListRecipePage : IAsyncPage
{
    private readonly IRecipeClient recipeClient;
    private readonly IRecipesCLI recipesCLI;
    private readonly string title = "List Recipes";

    public ListRecipePage(IRecipeClient recipeClient, IRecipesCLI recipesCLI)
    {
        this.recipeClient = recipeClient;
        this.recipesCLI = recipesCLI;
    }
    public async Task DisplayAsync()
    {
        AnsiConsole.Clear();
        CLIUtilities.SectionTitle(this.title);
        AnsiConsole.WriteLine();
        var recipes = await recipeClient.ListRecipesAsync();
        if (recipes != null)
        {
            recipesCLI.List(recipes);
        }
        else
        {
            //error
        }
    }
}

