using Project.Core.Entities;
using Project.Core.Interfaces;

namespace Project.API.Endpoints;

public static class RecipeEndpoints
{
    public static void Map(WebApplication app)
    {
        app.MapGet("recipes/", (IRepository<Recipe> repository) =>
        {
            return Results.Ok(repository.List());
        }).WithOpenApi();

        app.MapPost("recipes/", (Recipe recipe, IRepository<Recipe> repository) =>
        {

            repository.Add(recipe);
            return Results.Ok(recipe);
        });
        app.MapPut("recipes/", (Recipe recipe, IRepository<Recipe> repository) => //edit
            {
                repository.Update(recipe);
                return Results.Ok(recipe);
            });
    }
}