using RecipeConsoleApp.CLI.Categories;
using RecipeConsoleApp.CLI.Interfaces;
using RecipeConsoleApp.CLI.Recipes;
using RecipeConsoleApp.Core.Entities;
using RecipeConsoleApp.Core.Interfaces;
using Spectre.Console;

namespace RecipeConsoleApp.CLI;

public class ProgramCLI()
{
    public static void Run(IRepository<Category> categoryRepository, IRepository<Recipe> recipeRepository)
    {
        using var _categoryRepo = categoryRepository;
        using var _recipeRepo = recipeRepository;

        var recipes = new RecipesMenu(_recipeRepo, _categoryRepo, new RecipesCLI());
        var categories = new CategoriesMenu(_categoryRepo, new CategoriesCLI());

        var menuOptions = new Dictionary<string, IPage> {
            { "List Category", categories.ListPage },
            { "Add Category", categories.AddPage},
            { "Edit Category", categories.EditPage },
            { "List Recipes", recipes.ListPage},
            { "Add Recipe", recipes.AddPage },
            { "Edit Recipe", recipes.EditPage }};

        AnsiConsole.MarkupLine("[underline red]Welcome[/] to the Recipe Console App!");

        CLIUtilities.MenuLoop(menuOptions);

        AnsiConsole.Clear();
        AnsiConsole.WriteLine("Goodbye!");
    }
}
