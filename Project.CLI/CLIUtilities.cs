using RecipeConsoleApp.CLI.Interfaces;
using Spectre.Console;

namespace RecipeConsoleApp.CLI;

public class CLIUtilities
{
    /**
    * Display a menu to the console with the choices and actions, appending 'Exit' to the choices for exiting the menu loop
    */
    public static void MenuLoop(Dictionary<string, IPage> choiceMap)
    {
        var exit = false;
        do
        {
            var selection = AnsiConsole.Prompt(new SelectionPrompt<string>()
                .Title("What would you like to do?")
                .AddChoices(choiceMap.Keys)
                .AddChoices(["Exit"]));

            if (selection == "Exit")
            {
                exit = true;
            }
            else
            {
                choiceMap[selection].Display();
                AnsiConsole.WriteLine();
                AnsiConsole.Prompt(new TextPrompt<string>("Enter to return to menu").AllowEmpty());
                AnsiConsole.Clear();
            }
        } while (exit != true);
    }

    /**
    * Display a prompt to enter a list of strings
    **/
    public static List<string> StringListPrompt()
    {
        var list = new List<string>();
        string? input = null;
        do
        {
            input = AnsiConsole.Prompt(new TextPrompt<string>("Add a new item. Empty string to finish.").AllowEmpty());
            AnsiConsole.Clear();
            if (!string.IsNullOrEmpty(input))
            {
                list.Add(input);
            }
            AnsiConsole.WriteLine("List is now:");
            PrintList(list);
        } while (!string.IsNullOrEmpty(input));
        AnsiConsole.WriteLine("List complete");
        return list;
    }

    /**
    * Display prompt asking user to select multiple entries from a list of options
    **/
    public static List<string>? MultipleChoicePrompt(IEnumerable<string> options, bool required = false)
    {
        var prompt = new MultiSelectionPrompt<string>().AddChoices(options);
        if (!required)
        {
            prompt = prompt.NotRequired();
        }
        else
        {
            prompt = prompt.Required();
        }
        return AnsiConsole.Prompt(prompt);
    }

    /**
    * Print a list of items or "(None)" if list is null or empty
    **/
    public static void PrintList(IEnumerable<string>? items)
    {
        if (items != null && items.Any())
        {
            foreach (var item in items)
            {
                AnsiConsole.WriteLine(item);
            }
        }
        else
        {
            AnsiConsole.WriteLine("(None)");
        }
    }

    /**
    * Display prompt asking user to select and entry from a list of options
    **/
    public static string SingleChoicePrompt(IEnumerable<string> options)
    {
        return AnsiConsole.Prompt(new SelectionPrompt<string>().AddChoices(options));
    }

    public static void SectionTitle(string v)
    {
        AnsiConsole.WriteLine(v);
    }
}