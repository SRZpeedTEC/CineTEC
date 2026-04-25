namespace CineTec.Api.Models;

/// <summary>
/// Represents a scheduled movie showing.
/// </summary>
public class Function {
    /// <summary>
    /// Gets or sets the identifier of the movie being projected.
    /// </summary>
    public string Movie_id { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the room number where the projection takes place.
    /// </summary>
    public int room_number { get; set; }

    /// <summary>
    /// Gets or sets the date and time for the projection.
    /// </summary>
    public DateTime datetime { get; set; }

}
