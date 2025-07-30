using Project.Core.Entities;
using Spectre.Console;

namespace Project.CLI.Categories;
/*
* CLI Display or Input of a Recipe
*/
public class CategoryCLI
{
    public static Category Create(int id)
    {
        var name = AnsiConsole.Prompt<string>(new TextPrompt<string>("Enter name"));

        return new Category { Id = id, Name = name };
    }

    public static void PrintDetails(Category category)
    {
        AnsiConsole.WriteLine("Category: " + category.Id + "," + category.Name);
    }

    public static Category Edit(Category category)
    {
        var name = AnsiConsole.Prompt<string>(new TextPrompt<string>("Enter name"));
        return new Category() { Id = category.Id, Name = name };
    }

    public static void Print(Category item)
    {
        AnsiConsole.WriteLine(item.Name);
    }
}
