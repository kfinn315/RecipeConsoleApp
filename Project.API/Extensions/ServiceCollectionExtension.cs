using Project.Core.Entities;
using Project.Core.Interfaces;
using Project.Infrastructure.Database;
using Project.Infrastructure.Repositories;

namespace Project.API.Extensions;

public static class ServiceCollectionExtension
{
    public static IServiceCollection RegisterJsonFileRepositories(this IServiceCollection services, string path)
    {
        services.AddTransient<IRepository<Category>>(serviceProvider => new CategoryListRepository(new JsonFileDataStorage<List<Category>>(path + "/category.json")));
        services.AddTransient<IRepository<Recipe>>(serviceProvider => new RecipeListRepository(new JsonFileDataStorage<List<Recipe>>(path + "/recipe.json")));

        return services;
    }
}
