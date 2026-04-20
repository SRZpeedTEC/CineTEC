namespace CineTec.Api.Models;

/// <summary>
/// Represents a ticket purchase or billing record.
/// </summary>
public class Bill {
  
    /// <summary>
    /// Gets or sets the unique bill identifier.
    /// </summary>
    public int bill_id { get; set; }

    /// <summary>
    /// Gets or sets the identifier of the client who owns the bill.
    /// </summary>
    public int client_id { get; set; } = 0;

    /// <summary>
    /// Gets or sets the date and time of the purchased function.
    /// </summary>
    public DateTime datetime_function { get; set; } = DateTime.MinValue;

    /// <summary>
    /// Gets or sets the purchased seat name.
    /// </summary>
    public string seat_name { get; set; } = string.Empty;

 
}
