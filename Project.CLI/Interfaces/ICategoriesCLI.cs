using Project.Core.Entities;

namespace Project.CLI.Interfaces;

/*
* CLI Display or Input for a list of Categories
*/
public interface ICategoriesCLI
{
    void DisplayList(IEnumerable<Category> categories);
    Category DisplayCreate();
    Category? DisplayEdit(IEnumerable<Category> categories);
}
