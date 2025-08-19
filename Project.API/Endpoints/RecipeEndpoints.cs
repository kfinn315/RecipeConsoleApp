using Project.Core.Entities;
using Project.Core.Interfaces;

namespace Project.API.Endpoints;

public static class RecipeEndpoints
{
    public static void Map(WebApplication app)
    {
        app.MapGet("/recipes", async (IRepository<Recipe> repository) =>
        {
            return Results.Ok(await repository.GetListAsync());
        }).WithOpenApi();

        // Get a specific recipe by ID
        app.MapGet("/recipes/{id}", async (int id, IRepository<Recipe> repository) =>
        {
            var recipe = await repository.GetByIdAsync(id);
            return recipe is not null ? Results.Ok(recipe) : Results.NotFound();
        }).WithOpenApi();

        app.MapPost("/recipes", async (Recipe recipe, IRepository<Recipe> repository) =>
        {
            await repository.AddAsync(recipe);
            // return Results.Ok(recipe);
            return Results.Created($"/recipes/{recipe.Id}", recipe);
        }).WithOpenApi();

        app.MapPut("/recipes/{id}", async (int id, Recipe recipe, IRepository<Recipe> repository) => //edit
            {

                await repository.UpdateAsync(recipe);
                return Results.Ok(recipe);
            }).WithOpenApi();

        // Delete a recipe
        app.MapDelete("/recipes/{id}", async (int id, IRepository<Recipe> repository) =>
        {
            var existingRecipe = await repository.GetByIdAsync(id);
            if (existingRecipe is null) return Results.NotFound();

            await repository.DeleteAsync(existingRecipe);
            return Results.NoContent();
        }).WithOpenApi();
    }
}