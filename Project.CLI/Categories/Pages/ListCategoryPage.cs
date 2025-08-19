using Project.CLI.Interfaces;
using Project.CLI.Client;
using Spectre.Console;

namespace Project.CLI.Categories.Pages;

class ListCategoryPage : IAsyncPage
{
    private readonly IRecipeClient recipeClient;
    private readonly ICategoriesCLI cli;
    private readonly string title = "List Categories";

    public ListCategoryPage(IRecipeClient recipeClient, ICategoriesCLI cli)
    {
        this.recipeClient = recipeClient;
        this.cli = cli;
    }
    public async Task DisplayAsync()
    {
        AnsiConsole.Clear();
        CLIUtilities.SectionTitle(title);
        AnsiConsole.WriteLine();
        var categories = await this.recipeClient.ListCategoriesAsync();
        if (categories != null)
        {
            cli.DisplayList(categories);
        }
        else
        {
            //show error
        }
    }
}
