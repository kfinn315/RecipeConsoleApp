
namespace Project.Core.Entities;

public record Recipe()
{
    public int? Id { get; set; }
    public required string Title { get; set; }
    public IEnumerable<string>? Ingredients { get; set; }
    public string? Instructions { get; set; }
    public IEnumerable<int>? Categories { get; set; }
}