using Project.Core.Entities;
using Project.Core.Interfaces;

namespace Project.API.Endpoints;

public static class CategoryEndpoints
{
    public static void Map(WebApplication app)
    {
        app.MapGet("categories/", (IRepository<Category> repository) =>
        {
            return Results.Ok(repository.List());
        }).WithOpenApi();

        app.MapPost("categories/", (Category category, IRepository<Category> repository) =>
        {

            var newCategory = repository.Add(category);
            return Results.Ok(newCategory);
        });
        app.MapPut("categories/", (Category category, IRepository<Category> repository) => //edit
            {
                repository.Update(category);
                return Results.Ok(category);
            });
    }
}