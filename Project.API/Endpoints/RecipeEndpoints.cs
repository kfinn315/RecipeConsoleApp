using Project.Core.Entities;
using Project.Core.Interfaces;

namespace Project.API.Endpoints;

public static class RecipeEndpoints
{
    public static void Map(WebApplication app)
    {
        app.MapGet("recipes/", async (IRepository<Recipe> repository) =>
        {
            return Results.Ok(await repository.GetListAsync());
        }).WithOpenApi();

        app.MapPost("recipes/", async (Recipe recipe, IRepository<Recipe> repository) =>
        {
            await repository.AddAsync(recipe);
            return Results.Ok(recipe);
        });
        app.MapPut("recipes/", async (Recipe recipe, IRepository<Recipe> repository) => //edit
            {
                await repository.UpdateAsync(recipe);
                return Results.Ok(recipe);
            });
    }
}