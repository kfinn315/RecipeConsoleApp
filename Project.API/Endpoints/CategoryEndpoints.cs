using Project.Core.Entities;
using Project.Core.Interfaces;

namespace Project.API.Endpoints;

public static class CategoryEndpoints
{
    public static void Map(WebApplication app)
    {
        app.MapGet("categories/", async (IRepository<Category> repository) =>
        {
            return Results.Ok(await repository.GetListAsync());
        }).WithOpenApi();

        app.MapPost("categories/", async (Category category, IRepository<Category> repository) =>
        {

            var newCategory = await repository.AddAsync(category);
            return Results.Ok(newCategory);
        });
        app.MapPut("categories/", async (Category category, IRepository<Category> repository) => //edit
            {
                await repository.UpdateAsync(category);
                return Results.Ok(category);
            });
    }
}