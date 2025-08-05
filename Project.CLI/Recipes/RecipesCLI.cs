using Project.CLI.Interfaces;
using Project.Core.Entities;
using Spectre.Console;

namespace Project.CLI.Recipes;

public class RecipesCLI : IRecipesCLI
{
    public void List(IEnumerable<Recipe> recipes)
    {
        AnsiConsole.WriteLine("Current Recipes:");

        if (!recipes.Any())
        {
            AnsiConsole.WriteLine("(None)");
        }
        else
        {
            var grid = new Grid();

            // Add columns 
            grid.AddColumn();
            grid.AddColumn();
            grid.AddColumn();
            grid.AddColumn();
            grid.AddColumn();

            // Add header row 
            grid.AddRow(new string[] { "Id", "Title", "Categories", "Ingredients", "Instructions" });

            foreach (var item in recipes.Select(x => new string[] { x.Id?.ToString() ?? "?", x.Title, string.Concat(x.Categories ?? []), string.Concat(x.Ingredients ?? []), x.Instructions }))
            {
                grid.AddRow(item);

            }
            AnsiConsole.Write(grid);
        }
    }

    public Recipe? Add(IEnumerable<Category> categoryOptions)
    {
        if (!categoryOptions.Any())
        {
            AnsiConsole.WriteLine("No categories. Add a category first.");
            return null;
        }
        string title = RecipeCLI.EnterTitle();
        List<string> ingredients = RecipeCLI.EnterIngredients();
        List<string>? categories = RecipeCLI.SelectCategories(categoryOptions);
        string instructions = RecipeCLI.EnterInstructions();

        return new Recipe { Categories = categories, Ingredients = ingredients, Title = title, Instructions = instructions };
    }
    public Recipe? Edit(IEnumerable<Category> categoryOptions, IEnumerable<Recipe> recipes)
    {
        AnsiConsole.WriteLine("Select a recipe to edit.");
        if (!recipes.Any())
        {
            AnsiConsole.WriteLine("No recipes. Add a recipe first.");
            return null;
        }
        if (!categoryOptions.Any())
        {
            AnsiConsole.WriteLine("No categories. Add a category first.");
            return null;
        }

        Recipe editRecipe = SelectRecipe(recipes);

        editRecipe = RecipeCLI.Edit(editRecipe, categoryOptions);
        // AnsiConsole.WriteLine("Edit Complete");
        return editRecipe;
    }

    private static Recipe SelectRecipe(IEnumerable<Recipe> recipes)
    {
        var recipeTitle = CLIUtilities.SingleChoicePrompt(recipes.Select(x => x.Title));
        var editRecipe = recipes.First(x => x.Title == recipeTitle);
        return editRecipe;
    }
}
