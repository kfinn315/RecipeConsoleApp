using Project.Core.Entities;

namespace Project.CLI.Interfaces;

public interface IRecipesCLI
{
    void List(IEnumerable<Recipe> recipes);
    Recipe? Add(IEnumerable<Category> categoryOptions);
    Recipe? Edit(IEnumerable<Category> categoryOptions, IEnumerable<Recipe> recipes);
}