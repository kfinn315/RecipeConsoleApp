using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Project.Core.Entities;
using Project.Core.Interfaces;
using Xunit;

namespace Project.Testing.Integration;

public class CategoryEndpointsTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public CategoryEndpointsTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task GetCategories_ReturnsOkWithCategories()
    {
        // Arrange
        var mockRepository = new Mock<IRepository<Category>>();
        var categories = new List<Category> {
            new Category { Id = 1, Name = "Category1" },
            new Category { Id = 2, Name = "Category2" }
        };
        mockRepository.Setup(repo => repo.GetListAsync()).ReturnsAsync(categories);

        var client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton(mockRepository.Object);
            });
        }).CreateClient();

        // Act
        var response = await client.GetAsync("/categories");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<List<Category>>();
        Assert.NotNull(result);
        Assert.Equal(2, result.Count);
    }

    [Fact]
    public async Task GetCategoryById_ReturnsOkWithCategory_WhenCategoryExists()
    {
        // Arrange
        var mockRepository = new Mock<IRepository<Category>>();
        var category = new Category { Id = 1, Name = "Category1" };
        mockRepository.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(category);

        var client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton(mockRepository.Object);
            });
        }).CreateClient();

        // Act
        var response = await client.GetAsync("/categories/1");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<Category>();
        Assert.NotNull(result);
        Assert.Equal(category.Id, result.Id);
        Assert.Equal(category.Name, result.Name);
    }

    [Fact]
    public async Task GetCategoryById_ReturnsNotFound_WhenCategoryDoesNotExist()
    {
        // Arrange
        var mockRepository = new Mock<IRepository<Category>>();
        mockRepository.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((Category)null);

        var client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton(mockRepository.Object);
            });
        }).CreateClient();

        // Act
        var response = await client.GetAsync("/categories/1");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task AddCategory_ReturnsOkWithNewCategory()
    {
        // Arrange
        var mockRepository = new Mock<IRepository<Category>>();
        var newCategory = new Category { Id = 1, Name = "New Category" };
        mockRepository.Setup(repo => repo.AddAsync(It.IsAny<Category>())).ReturnsAsync(newCategory);

        var client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton(mockRepository.Object);
            });
        }).CreateClient();

        // Act
        var response = await client.PostAsJsonAsync("/categories", newCategory);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<Category>();
        Assert.NotNull(result);
        Assert.Equal(newCategory.Id, result.Id);
        Assert.Equal(newCategory.Name, result.Name);
    }

    [Fact]
    public async Task DeleteCategory_ReturnsNoContent_WhenCategoryExists()
    {
        // Arrange
        var mockRepository = new Mock<IRepository<Category>>();
        var existingCategory = new Category { Id = 1, Name = "Category1" };
        mockRepository.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(existingCategory);
        mockRepository.Setup(repo => repo.DeleteAsync(existingCategory)).Returns(Task.CompletedTask);

        var client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton(mockRepository.Object);
            });
        }).CreateClient();

        // Act
        var response = await client.DeleteAsync("/categories/1");

        // Assert
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }
}