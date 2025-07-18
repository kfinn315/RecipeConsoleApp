using RecipeConsoleApp.CLI.Exceptions;
using RecipeConsoleApp.Core.Entities;
using Spectre.Console;

namespace RecipeConsoleApp.CLI.Recipes;
/*
* CLI Display or Input for a Recipe
*/
public class RecipeCLI
{
    public static Recipe Create(IEnumerable<Category> categoryOptions)
    {
        string title = EnterTitle();
        List<string> ingredients = EnterIngredients();
        List<string>? categories = SelectCategories(categoryOptions);
        string instructions = EnterInstructions();

        return new Recipe { Categories = categories, Ingredients = ingredients, Title = title, Instructions = instructions };
    }

    public static string EnterInstructions()
    {
        return AnsiConsole.Prompt(new TextPrompt<string>("Instructions"));
    }

    public static List<string>? SelectCategories(IEnumerable<Category> categoryOptions)
    {
        if (!categoryOptions.Any())
        {
            throw new NoCategoriesException();
        }
        else
        {
            AnsiConsole.WriteLine("Categories");
            return CLIUtilities.MultipleChoicePrompt(categoryOptions.Select(x => x.Name));
        }
    }

    public static List<string> EnterIngredients()
    {
        AnsiConsole.WriteLine("Add ingredients");
        return CLIUtilities.StringListPrompt();
    }

    public static string EnterTitle()
    {
        return AnsiConsole.Prompt(new TextPrompt<string>("Title"));
    }

    public static void PrintDetails(Recipe recipe)
    {
        AnsiConsole.WriteLine("Recipe: " + recipe.Title + ":");
        CLIUtilities.PrintList("Categories", recipe.Categories);
        CLIUtilities.PrintList("Ingredients", recipe.Ingredients);
        AnsiConsole.WriteLine("Instructions");
        AnsiConsole.WriteLine(recipe.Instructions ?? "No instructions");
    }

    public static Recipe Edit(Recipe editRecipe, IEnumerable<Category> categoryOptions)
    {
        if (!categoryOptions.Any())
        {
            throw new NoCategoriesException();
        }

        PrintDetails(editRecipe);

        string[] options = ["Title", "Categories", "Ingredients", "Instructions"];
        var prompt = new SelectionPrompt<string>().Title("What would you like to edit?").AddChoices(options).AddChoices(["Exit"]);
        var exit = false;

        do
        {
            var selection = AnsiConsole.Prompt(prompt);

            switch (selection)
            {
                case "Title":
                    editRecipe.Title = EnterTitle();
                    break;
                case "Categories":
                    editRecipe.Categories = SelectCategories([.. categoryOptions]);
                    break;
                case "Ingredients":
                    editRecipe.Ingredients = EnterIngredients();
                    break;
                case "Instructions":
                    editRecipe.Instructions = EnterInstructions();
                    break;
                case "Exit":
                    exit = true;
                    break;
            }
        } while (!exit);

        PrintDetails(editRecipe);

        return editRecipe;
    }

    public static void Print(Recipe? item)
    {
        AnsiConsole.WriteLine(item?.Title ?? "-");
    }
}
