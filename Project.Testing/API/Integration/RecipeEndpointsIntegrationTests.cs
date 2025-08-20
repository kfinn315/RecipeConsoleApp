using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Project.Core.Entities;
using Project.Core.Interfaces;
using Xunit;

namespace Project.Testing.API.Integration;

public class RecipeEndpointsTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public RecipeEndpointsTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task GetRecipes_ReturnsOkWithRecipes()
    {
        // Arrange
        var mockRepository = new Mock<IRepository<Recipe>>();
        var recipes = new List<Recipe>
        {
            new Recipe { Id = 1, Title = "Recipe1" },
            new Recipe { Id = 2, Title = "Recipe2" }
        };
        mockRepository.Setup(repo => repo.GetListAsync()).ReturnsAsync(recipes);

        var client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton(mockRepository.Object);
            });
        }).CreateClient();

        // Act
        var response = await client.GetAsync("/recipes");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<List<Recipe>>();
        Assert.NotNull(result);
        Assert.Equal(2, result.Count);
    }

    [Fact]
    public async Task GetRecipeById_ReturnsOkWithRecipe_WhenRecipeExists()
    {
        // Arrange
        var mockRepository = new Mock<IRepository<Recipe>>();
        var recipe = new Recipe { Id = 1, Title = "Recipe1" };
        mockRepository.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(recipe);

        var client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton(mockRepository.Object);
            });
        }).CreateClient();

        // Act
        var response = await client.GetAsync("/recipes/1");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<Recipe>();
        Assert.NotNull(result);
        Assert.Equal(recipe.Id, result.Id);
        Assert.Equal(recipe.Title, result.Title);
    }

    [Fact]
    public async Task GetRecipeById_ReturnsNotFound_WhenRecipeDoesNotExist()
    {
        // Arrange
        var mockRepository = new Mock<IRepository<Recipe>>();
        mockRepository.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((Recipe)null);

        var client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton(mockRepository.Object);
            });
        }).CreateClient();

        // Act
        var response = await client.GetAsync("/recipes/1");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task AddRecipe_ReturnsCreatedWithNewRecipe()
    {
        // Arrange
        var mockRepository = new Mock<IRepository<Recipe>>();
        var newRecipe = new Recipe { Id = 1, Title = "New Recipe" };
        mockRepository.Setup(repo => repo.AddAsync(It.IsAny<Recipe>())).ReturnsAsync(newRecipe);

        var client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton(mockRepository.Object);
            });
        }).CreateClient();

        // Act
        var response = await client.PostAsJsonAsync("/recipes", newRecipe);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<Recipe>();
        Assert.NotNull(result);
        Assert.Equal(newRecipe.Id, result.Id);
        Assert.Equal(newRecipe.Title, result.Title);
    }

    [Fact]
    public async Task UpdateRecipe_ReturnsOkWithUpdatedRecipe()
    {
        // Arrange
        var mockRepository = new Mock<IRepository<Recipe>>();
        var updatedRecipe = new Recipe { Id = 1, Title = "Updated Recipe" };
        mockRepository.Setup(repo => repo.UpdateAsync(It.IsAny<Recipe>())).Returns(Task.CompletedTask);

        var client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton(mockRepository.Object);
            });
        }).CreateClient();

        // Act
        var response = await client.PutAsJsonAsync("/recipes/1", updatedRecipe);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<Recipe>();
        Assert.NotNull(result);
        Assert.Equal(updatedRecipe.Id, result.Id);
        Assert.Equal(updatedRecipe.Title, result.Title);
    }

    [Fact]
    public async Task DeleteRecipe_ReturnsNoContent_WhenRecipeExists()
    {
        // Arrange
        var mockRepository = new Mock<IRepository<Recipe>>();
        var existingRecipe = new Recipe { Id = 1, Title = "Recipe1" };
        mockRepository.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(existingRecipe);
        mockRepository.Setup(repo => repo.DeleteAsync(existingRecipe)).Returns(Task.CompletedTask);

        var client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton(mockRepository.Object);
            });
        }).CreateClient();

        // Act
        var response = await client.DeleteAsync("/recipes/1");

        // Assert
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }
}