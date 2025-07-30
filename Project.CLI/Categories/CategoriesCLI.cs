using RecipeConsoleApp.CLI.Interfaces;
using RecipeConsoleApp.Core.Entities;
using Spectre.Console;

namespace RecipeConsoleApp.CLI.Categories;
/*
* CLI Display or Input for a list of Categories
*/
public class CategoriesCLI : ICategoriesCLI
{
    public void DisplayList(IEnumerable<Category> categories)
    {
        AnsiConsole.WriteLine("Current Categories:");
        CLIUtilities.PrintList(categories.Select(x => x.Name));
    }

    public Category DisplayCreate()
    {
        var name = AnsiConsole.Prompt<string>(new TextPrompt<string>("Enter name"));
        return new Category { Name = name };
    }

    public Category? DisplayEdit(IEnumerable<Category> categories)
    {
        if (!categories.Any())
        {
            AnsiConsole.WriteLine("No categories to edit. Add a category first.");
            return null;
        }
        else
        {
            var selection = CLIUtilities.SingleChoicePrompt(categories.Select(x => x.Name));
            var selected = categories.First(x => x.Name == selection);
            var newName = AnsiConsole.Prompt(new TextPrompt<string>("Enter a new category name"));

            return new Category() { Id = selected.Id, Name = newName };
        }
    }
}