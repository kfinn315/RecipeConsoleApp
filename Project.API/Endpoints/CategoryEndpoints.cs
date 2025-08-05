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

        // app.MapGet("/{id}", async context =>
        // {
        //     await context.Response.WriteAsJsonAsync(new { Message = "One todo item" });
        // });
        app.MapPost("categories/", (Category category, IRepository<Category> repository) =>
        {

            // await context.Response.WriteAsJsonAsync(new Response<object> { Success = true });
            repository.Add(category);
            return Results.Ok();
        });
        app.MapPut("categories/", (Category category) => //edit
        {

            // await context.Response.WriteAsJsonAsync(new Response<object> { Success = true });
            return Results.Ok();
        });
    }
}
