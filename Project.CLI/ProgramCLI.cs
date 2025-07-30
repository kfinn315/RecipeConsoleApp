using Project.CLI.Categories;
using Project.CLI.Interfaces;
using Project.CLI.Recipes;
using Project.Core.Entities;
using Project.Core.Interfaces;
using Spectre.Console;

namespace Project.CLI;

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
