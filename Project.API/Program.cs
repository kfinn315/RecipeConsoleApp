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
    return new CategoryListRepository(new JsonDataStorage<List<Category>>(new FileStreamIO("./category.json")));
});

builder.Services.AddSingleton<IRepository<Recipe>>(serviceProvider =>
{
    return new RecipeListRepository(new JsonDataStorage<List<Recipe>>(new FileStreamIO("./recipe.json")));
});

var app = builder.Build();

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
