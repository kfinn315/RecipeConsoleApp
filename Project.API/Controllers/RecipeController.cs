
using Project.Core.Entities;
using Project.Core.Interfaces;

namespace Project.API;

public class RecipeController
{
    private readonly IRepository<Recipe> recipeRepository;
    private readonly IRepository<Category> categoryRepository;

    public RecipeController(IRepository<Recipe> repository, IRepository<Category> categories)
    {
        recipeRepository = repository;
        categoryRepository = categories;
    }


    public IEnumerable<Recipe> GetAll()
    {
        return recipeRepository.List();
    }

    public void Add(Recipe recipe)
    {
        if (recipe != null)
        {
            recipeRepository.Add(recipe);
        }
    }

    public void Edit(Recipe recipe)
    {
        if (recipe != null)
        {
            recipeRepository.Edit(recipe);
        }
    }

}