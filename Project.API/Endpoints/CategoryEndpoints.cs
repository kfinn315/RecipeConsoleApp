using Project.Core.Entities;
using Project.Core.Interfaces;

namespace Project.API.Endpoints;

public static class CategoryEndpoints
{
    public static void Map(WebApplication app)
    {
        app.MapGet("/categories", async (IRepository<Category> repository) =>
        {
            return Results.Ok(await repository.GetListAsync());
        }).WithOpenApi();

        // Get a specific recipe by ID
        app.MapGet("/categories/{id}", async (int id, IRepository<Category> repository) =>
        {
            var category = await repository.GetByIdAsync(id);
            return category is not null ? Results.Ok(category) : Results.NotFound();
        }).WithOpenApi();

        app.MapPost("/categories", async (Category category, IRepository<Category> repository) =>
        {

            var newCategory = await repository.AddAsync(category);
            return Results.Ok(newCategory);
        }).WithOpenApi();

        app.MapPut("/categories/{id}", async (int id, Category category, IRepository<Category> repository) => //edit
            {
                await repository.UpdateAsync(category);
                return Results.Ok(category);
            }).WithOpenApi();

        // Delete a recipe
        app.MapDelete("/categories/{id}", async (int id, IRepository<Category> repository) =>
        {
            var existingCategory = await repository.GetByIdAsync(id);
            if (existingCategory is null) return Results.NotFound();

            await repository.DeleteAsync(existingCategory);
            return Results.NoContent();
        }).WithOpenApi();
    }
}
