using RecipeConsoleApp.CLI.Categories;
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

        var recipes = new RecipesMenu(_recipeRepo, _categoryRepo);
        var categories = new CategoriesMenu(_categoryRepo);

        var choiceMapAction = new Dictionary<string, Action> {
            { "Add Category", ()=>categories.Add() },
            { "Edit Category", ()=>categories.Edit() },
            { "List Recipes", ()=>recipes.List() },
            { "Add Recipe", ()=>recipes.Add() },
            { "Edit Recipe", ()=>recipes.Edit() }};

        CLIUtilities.MainMenuCLI(choiceMapAction);

        AnsiConsole.Clear();
        AnsiConsole.WriteLine("Goodbye!");
    }
}