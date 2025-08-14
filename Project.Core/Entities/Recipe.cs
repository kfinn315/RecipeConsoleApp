
namespace Project.Core.Entities;

public record Recipe()
{
    public int? Id { get; set; }
    public required string Title { get; set; }
    public List<string>? Ingredients { get; set; }
    public string? Instructions { get; set; }
    public List<int>? Categories { get; set; }
}