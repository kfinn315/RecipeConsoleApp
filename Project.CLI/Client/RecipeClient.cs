using System.Net.Http.Json;
using Project.Core.Entities;

namespace Project.CLI.Client;

public interface IRecipeClient
{
    Task AddCategoryAsync(Category item);
    Task AddRecipeAsync(Recipe item);
    Task EditCategoryAsync(Category item);
    Task EditRecipeAsync(Recipe item);
    Task<IEnumerable<Category>?> ListCategoriesAsync();
    Task<IEnumerable<Recipe>?> ListRecipesAsync();
}

public class RecipeClient : IRecipeClient
{
    private readonly string baseUrl;
    private readonly string recipeEndpoint;
    private readonly string categoryEndpoint;
    private readonly HttpClient httpClient;

    public RecipeClient(string baseUrl, HttpClient httpClient)
    {
        this.baseUrl = baseUrl;
        this.recipeEndpoint = $"{baseUrl}/recipes";
        this.categoryEndpoint = $"{baseUrl}/categories";
        this.httpClient = httpClient;
    }
    public async Task AddRecipeAsync(Recipe item)
    {
        await httpClient.PostAsJsonAsync(recipeEndpoint, item);
    }

    public async Task EditRecipeAsync(Recipe item)
    {
        await httpClient.PostAsJsonAsync(recipeEndpoint, item);
    }

    public async Task<IEnumerable<Recipe>?> ListRecipesAsync()
    {
        return await httpClient.GetFromJsonAsync<IEnumerable<Recipe>>(recipeEndpoint);
    }

    public async Task AddCategoryAsync(Category item)
    {
        await httpClient.PostAsJsonAsync(categoryEndpoint, item);
    }

    public async Task EditCategoryAsync(Category item)
    {
        await httpClient.PostAsJsonAsync(categoryEndpoint, item);
    }

    public async Task<IEnumerable<Category>?> ListCategoriesAsync()
    {
        return await httpClient.GetFromJsonAsync<IEnumerable<Category>>(categoryEndpoint);
    }
}