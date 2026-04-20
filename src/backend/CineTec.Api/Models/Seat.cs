namespace CineTec.Api.Models;

/// <summary>
/// Represents one seat inside a cinema room.
/// </summary>
public class Seat {
    /// <summary>
    /// Gets or sets the branch identifier where the seat exists.
    /// </summary>
    public string Cinema_id { get ; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the room number where the seat exists.
    /// </summary>
    public int room_number { get; set; }

    /// <summary>
    /// Gets or sets the public seat label shown to users.
    /// </summary>
    public string seat_name { get; set;} = string.Empty;


}
