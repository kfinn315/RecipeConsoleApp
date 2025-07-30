using Project.CLI.Interfaces;
using Spectre.Console;

namespace Project.CLI.Pages;

public class Page : IPage
{
    private readonly string title;
    private readonly Action action;

    public Page(string title, Action action)
    {
        this.title = title;
        this.action = action;
    }
    public void Display()
    {
        AnsiConsole.Clear();
        CLIUtilities.SectionTitle(this.title);
        AnsiConsole.WriteLine();
        this.action.Invoke();
    }
}
