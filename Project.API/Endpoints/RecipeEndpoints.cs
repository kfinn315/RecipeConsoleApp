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

        // app.MapGet("/{id}", (IRepository<Recipe> repository) =>
        // {
        //     return Results.Ok(repository.List());
        // });
        app.MapPost("recipes/", (Recipe recipe, IRepository<Recipe> repository) =>
       {

           // await context.Response.WriteAsJsonAsync(new Response<object> { Success = true });
           repository.Add(recipe);
           return Results.Ok();
       });
        app.MapPut("recipes/", (Recipe recipe) => //edit
        {

            // await context.Response.WriteAsJsonAsync(new Response<object> { Success = true });
            return Results.Ok();
        });
    }
}
