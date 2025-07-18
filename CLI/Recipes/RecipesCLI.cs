using RecipeConsoleApp.Core.Entities;
using Spectre.Console;

namespace RecipeConsoleApp.CLI.Recipes;
public class RecipesCLI
{
    public static void List(IEnumerable<Recipe> recipes)
    {
        CLIUtilities.SectionTitle("Recipes");

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

            foreach (var item in recipes.Select(x => new string[] { x.Id.ToString(), x.Title, string.Concat(x.Categories ?? []), string.Concat(x.Ingredients ?? []), x.Instructions }))
            {
                grid.AddRow(item);

            }
            AnsiConsole.Write(grid);
        }
    }

    public static Recipe? Add(IEnumerable<Category> categoryOptions)
    {
        CLIUtilities.SectionTitle("Add Recipe");
        if (!categoryOptions.Any())
        {
            AnsiConsole.WriteLine("No categories. Add a category first.");
            return null;
        }
        return RecipeCLI.Create(categoryOptions);
    }
    public static Recipe? Edit(IEnumerable<Category> categoryOptions, IEnumerable<Recipe> recipes)
    {
        CLIUtilities.SectionTitle("Edit Recipe");
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