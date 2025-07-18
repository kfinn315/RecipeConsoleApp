
namespace RecipeConsoleApp.Core.Entities;

public record Recipe()
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required List<string> Ingredients { get; set; }
    public required string Instructions { get; set; }
    public List<string>? Categories { get; set; }
}