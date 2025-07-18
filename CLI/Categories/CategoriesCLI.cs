using RecipeConsoleApp.Core.Entities;
using Spectre.Console;

namespace RecipeConsoleApp.CLI.Categories;
/*
* CLI Display or Input for a list of Categories
*/
public class CategoriesCLI
{
    public static void List(IEnumerable<Category> categories)
    {
        CLIUtilities.PrintList("Categories", categories.Select(x => x.Name));
    }

    public static Category Add(IEnumerable<Category> categories)
    {
        AnsiConsole.WriteLine("Add Category");
        return CategoryCLI.Create(categories.Count());
    }

    public static Category? Edit(IEnumerable<Category> categories)
    {
        AnsiConsole.WriteLine("Edit Category");
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