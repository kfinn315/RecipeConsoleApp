using Project.CLI.Interfaces;
using Project.CLI.Client;
using Spectre.Console;

namespace Project.CLI.Recipes.Pages;

class AddRecipePage : IAsyncPage
{

    private readonly IRecipeClient recipeClient;
    private readonly IRecipesCLI recipesCLI;
    private readonly string title = "Add Recipe";

    public AddRecipePage(IRecipeClient recipeClient, IRecipesCLI recipesCLI)
    {
        this.recipeClient = recipeClient;
        this.recipesCLI = recipesCLI;
    }
    public async Task DisplayAsync()
    {
        AnsiConsole.Clear();
        CLIUtilities.SectionTitle(this.title);
        AnsiConsole.WriteLine();
        var categories = await recipeClient.ListCategoriesAsync();
        if (categories != null)
        {
            var recipe = recipesCLI.Add(categories);
            if (recipe != null)
            {
                await recipeClient.AddRecipeAsync(recipe);
            }
        }
    }
}
