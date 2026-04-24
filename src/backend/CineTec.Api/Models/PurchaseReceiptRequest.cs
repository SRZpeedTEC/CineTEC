namespace CineTec.Api.Models;

/// <summary>
/// Represents the purchase payload used to generate a ticket PDF.
/// </summary>
public class PurchaseReceiptRequest
{
    /// <summary>
    /// Gets or sets the selected cinema label.
    /// </summary>
    public string cinema { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the movie title shown in the receipt.
    /// </summary>
    public string movieTitle { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the movie identifier.
    /// </summary>
    public int movieId { get; set; }

    /// <summary>
    /// Gets or sets the movie rating.
    /// </summary>
    public string rating { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the movie duration label.
    /// </summary>
    public string duration { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the selected showtime label.
    /// </summary>
    public string session { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the purchased seats.
    /// </summary>
    public List<string> seats { get; set; } = new();

    /// <summary>
    /// Gets or sets the ticket subtotal amount.
    /// </summary>
    public decimal ticketSubtotal { get; set; }

    /// <summary>
    /// Gets or sets the service fee.
    /// </summary>
    public decimal serviceFee { get; set; }

    /// <summary>
    /// Gets or sets the tax amount.
    /// </summary>
    public decimal tax { get; set; }

    /// <summary>
    /// Gets or sets the total amount.
    /// </summary>
    public decimal total { get; set; }

    /// <summary>
    /// Gets or sets the purchase code shown in the receipt.
    /// </summary>
    public string purchaseCode { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the purchase date and time.
    /// </summary>
    public DateTime purchaseDate { get; set; }
}
