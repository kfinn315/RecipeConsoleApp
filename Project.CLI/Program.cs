using Project.CLI;
using Project.CLI.Categories;
using Project.CLI.Client;
using Project.CLI.Interfaces;
using Project.CLI.Recipes;
using Spectre.Console;

static async Task Run(IRecipeClient recipeClient)
{
    var recipes = new RecipesMenu(recipeClient, new RecipesCLI());
    var categories = new CategoriesMenu(recipeClient, new CategoriesCLI());

    var menuOptions = new Dictionary<string, IAsyncPage> {
            { "List Category", categories.ListPage },
            { "Add Category", categories.AddPage},
            { "Edit Category", categories.EditPage },
            { "List Recipes", recipes.ListPage},
            { "Add Recipe", recipes.AddPage },
            { "Edit Recipe", recipes.EditPage }};

    AnsiConsole.MarkupLine("[underline red]Welcome[/] to the Recipe Console App!");

    await CLIUtilities.MenuLoopAsync(menuOptions);

    AnsiConsole.Clear();
    AnsiConsole.WriteLine("Goodbye!");
}

var baseUrl = "http://localhost:5101";
var httpClient = new HttpClient();
var recipeClient = new RecipeClient(baseUrl, httpClient);

await Run(recipeClient);
