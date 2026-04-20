namespace CineTec.Api.Models;

/// <summary>
/// Represents one movie record managed by CineTEC.
/// </summary>
public class Movie
{
    /// <summary>
    /// Gets or sets the primary identifier for the movie.
    /// </summary>
    public int movieID { get; set; }

    /// <summary>
    /// Gets or sets the original movie title.
    /// </summary>
    public required string originalName { get; set; }

    /// <summary>
    /// Gets or sets the commercial title shown to users.
    /// </summary>
    public string commercialName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the poster image URL or Data URL.
    /// </summary>
    public string imageURL { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the runtime label.
    /// </summary>
    public string duration { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the movie rating.
    /// </summary>
    public string rating { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the director name.
    /// </summary>
    public string director { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the principal cast.
    /// </summary>
    public List<string> protagonists { get; set; } = new();
}
