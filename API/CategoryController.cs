
using RecipeConsoleApp.Core.Entities;
using RecipeConsoleApp.Core.Interfaces;

namespace RecipeConsoleApp.API;

public class CategoryController
{
    private readonly IRepository<Category> categoryRepository;

    public CategoryController(IRepository<Category> categories)
    {
        categoryRepository = categories;
    }

    public IEnumerable<Category> GetAll()
    {
        return categoryRepository.List();
    }

    public void Add(Category category)
    {
        if (category != null)
        {
            categoryRepository.Add(category);
        }
    }

    public void Edit(Category category)
    {
        if (category != null)
        {
            categoryRepository.Edit(category);
        }
    }
}