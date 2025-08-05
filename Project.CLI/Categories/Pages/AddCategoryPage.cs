using Project.CLI.Client;
using Project.CLI.Interfaces;
using Spectre.Console;

namespace Project.CLI.Categories.Pages;

class AddCategoryPage : IAsyncPage
{
    private readonly IRecipeClient recipeClient;
    private readonly ICategoriesCLI cli;
    private readonly string title = "Add Category";

    public AddCategoryPage(IRecipeClient recipeClient, ICategoriesCLI cli)
    {
        this.recipeClient = recipeClient;
        this.cli = cli;
    }
    public async Task DisplayAsync()
    {
        AnsiConsole.Clear();
        CLIUtilities.SectionTitle(title);
        AnsiConsole.WriteLine();
        var category = cli.DisplayCreate();
        await recipeClient.AddCategoryAsync(category);
    }
}
