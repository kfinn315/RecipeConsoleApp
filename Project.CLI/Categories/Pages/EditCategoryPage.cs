using Project.CLI.Interfaces;
using Project.CLI.Client;
using Spectre.Console;

namespace Project.CLI.Categories.Pages;

class EditCategoryPage : IAsyncPage
{
    private readonly IRecipeClient recipeClient;
    private readonly ICategoriesCLI cli;
    private readonly string title = "Edit Category";

    public EditCategoryPage(IRecipeClient recipeClient, ICategoriesCLI cli)
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
        if (categories == null)
        {
            //show error
        }
        else
        {

            var edit = cli.DisplayEdit(categories);
            if (edit != null)
            {
                await recipeClient.EditCategoryAsync(edit);
            }
            else
            {

            }
        }
    }
}
