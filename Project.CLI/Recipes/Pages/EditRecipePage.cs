using Project.CLI.Interfaces;
using Project.CLI.Client;
using Spectre.Console;

namespace Project.CLI.Recipes.Pages;

class EditRecipePage : IAsyncPage
{
    private readonly IRecipeClient recipeClient;
    private readonly IRecipesCLI recipesCLI;
    private readonly string title = "Edit Recipe";

    public EditRecipePage(IRecipeClient recipeClient, IRecipesCLI recipesCLI)
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
        var categories = await recipeClient.ListCategoriesAsync();

        if (recipes != null && categories != null)
        {
            var editRecip = recipesCLI.Edit(categories, recipes);

            if (editRecip != null)
            {
                await recipeClient.EditRecipeAsync(editRecip);
            }
        }
    }
}

