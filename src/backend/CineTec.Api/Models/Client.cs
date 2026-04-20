namespace CineTec.Api.Models;

/// <summary>
/// Represents a CineTEC customer account.
/// </summary>
public class Client {
    /// <summary>
    /// Gets or sets the unique identifier for the client.
    /// </summary>
    public int ID { get; set; }

    /// <summary>
    /// Gets or sets the email address used to identify the client.
    /// </summary>
    public string email { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the current password stored for the client.
    /// </summary>
    public string password { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the client's birthdate.
    /// </summary>
    public DateOnly birthdate { get; set; }

    /// <summary>
    /// Gets the current age calculated from the birthdate.
    /// </summary>
    public int age
    {
        get
        {
            // We calculate age on demand so the value stays correct as time passes.
            DateOnly today = DateOnly.FromDateTime(DateTime.Today);
            int age = today.Year - birthdate.Year;
            if (birthdate > today.AddYears(-age)) age--; 
            return age;
        }
    }

    /// <summary>
    /// Gets or sets the client's first name.
    /// </summary>
    public string Fname { get; set;} = string.Empty;

    /// <summary>
    /// Gets or sets the client's middle initial.
    /// </summary>
    public string Minit { get; set;} = string.Empty;
    

}
