namespace CineTec.Api.Models;

/// <summary>
/// Represents a cinema room within a branch.
/// </summary>
public class Room {
    /// <summary>
    /// Gets or sets the branch identifier that owns the room.
    /// </summary>
    public string Cinema_id { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the room number.
    /// </summary>
    public int room_number { get; set; }

    /// <summary>
    /// Gets or sets the number of seat columns in the room.
    /// </summary>
    public int number_of_columns { get; set; }

    /// <summary>
    /// Gets or sets the number of seat rows in the room.
    /// </summary>
    public int number_of_rows { get; set; }

    /// <summary>
    /// Gets or sets the theoretical total capacity of the room.
    /// </summary>
    public int total_capacity { get; set; }

    /// <summary>
    /// Gets or sets the occupancy percentage used for operational limits.
    /// </summary>
    public int capacity_factor { get; set; }

    /// <summary>
    /// Gets or sets the maximum operating capacity after business rules are applied.
    /// </summary>
    // This stays persisted because the frontend already computes and sends it as part of the room flow.
    public int max_capacity { get; set; } // pending to know the formula....

}
