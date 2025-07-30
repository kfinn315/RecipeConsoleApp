using Project.CLI.Interfaces;
using Project.CLI.Pages;
using Project.Core.Entities;
using Project.Core.Interfaces;

namespace Project.CLI.Recipes;

/*
* CLI Display or Input for a list of Recipes
*/
public class RecipesMenu
{
    private readonly IRepository<Recipe> recipeRepository;
    private readonly IRepository<Category> categoryRepository;

    public RecipesMenu(IRepository<Recipe> repository, IRepository<Category> categories, IRecipesCLI recipesCLI)
    {
        recipeRepository = repository;
        categoryRepository = categories;
        this.ListPage = new Page("List Recipes", () =>
        {
            recipesCLI.List(recipeRepository.List());
        });
        this.AddPage = new Page("Add Recipe", () =>
        {
            var recipe = recipesCLI.Add(categoryRepository.List());
            if (recipe != null)
            {
                recipeRepository.Add(recipe);
            }
        });
        this.EditPage = new Page("Edit Recipe", () =>
        {
            var recipes = recipeRepository.List();
            var categoryOptions = categoryRepository.List();

            var editRecip = recipesCLI.Edit(categoryOptions, recipes);

            if (editRecip != null)
            {
                recipeRepository.Edit(editRecip);
            }
        });
    }

    public IPage ListPage { get; }
    public IPage AddPage { get; }
    public IPage EditPage { get; }


}
