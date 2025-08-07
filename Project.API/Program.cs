using Project.API.Endpoints;
using Project.Core.Entities;
using Project.Core.Interfaces;
using Project.Infrastructure.Database;
using Project.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IRepository<Category>>(serviceProvider =>
{
    return new CategoryListRepository(new JsonFileDataStorage<List<Category>>("./Data/category.json"));
});
builder.Services.AddSingleton((Func<IServiceProvider, IRepository<Recipe>>)(serviceProvider =>
{
    return new RecipeListRepository(new JsonFileDataStorage<List<Recipe>>("./Data/recipe.json"));
}));

builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowLocalhost",
                builder =>
                {
                    builder.WithOrigins("http://localhost:5173") // Replace with your actual localhost port(s)
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
        });
var app = builder.Build();
app.UseCors("AllowLocalhost");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

CategoryEndpoints.Map(app);
RecipeEndpoints.Map(app);

app.Run();
