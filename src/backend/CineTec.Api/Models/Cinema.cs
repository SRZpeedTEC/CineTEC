namespace CineTec.Api.Models;

/// <summary>
/// Represents a CineTEC cinema branch.
/// </summary>
public class Cinema {
    /// <summary>
    /// Gets or sets the public branch name shown across the platform.
    /// </summary>
    public string name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the number of rooms available at the branch.
    /// </summary>
    public int number_of_rooms { get; set; }

    /// <summary>
    /// Gets or sets the branch street address.
    /// </summary>
    public string address { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the Costa Rica province for the branch.
    /// </summary>
    public string province { get; set; } = string.Empty;

}
