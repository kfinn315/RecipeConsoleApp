using RecipeConsoleApp.Core.Entities;
using RecipeConsoleApp.Core.Interfaces;

namespace RecipeConsoleApp.CLI.Recipes;

/*
* CLI Display or Input for a list of Recipes
*/
public class RecipesMenu
{
    private readonly IRepository<Recipe> recipeRepository;
    private readonly IRepository<Category> categoryRepository;

    public RecipesMenu(IRepository<Recipe> repository, IRepository<Category> categories)
    {
        recipeRepository = repository;
        categoryRepository = categories;
    }

    public void List()
    {
        RecipesCLI.List(recipeRepository.List());
    }

    public void Add()
    {
        var recipe = RecipesCLI.Add(categoryRepository.List());
        if (recipe != null)
        {
            recipeRepository.Add(recipe);
        }
    }

    public void Edit()
    {
        var recipes = recipeRepository.List();
        var categoryOptions = categoryRepository.List();

        var editRecip = RecipesCLI.Edit(categoryOptions, recipes);

        if (editRecip != null)
        {
            recipeRepository.Edit(editRecip);
        }
    }

}
