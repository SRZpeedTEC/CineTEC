namespace CineTec.Api.Models;

public class Client {
    public int ID { get; set; }
    public string email { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;

    public DateOnly birthdate { get; set; }

    public int age
    {
        get
        {
            DateOnly today = DateOnly.FromDateTime(DateTime.Today);
            int age = today.Year - birthdate.Year;
            if (birthdate > today.AddYears(-age)) age--; 
            return age;
        }
    }

    public string Fname { get; set;} = string.Empty;

    public string Minit { get; set;} = string.Empty;
    

}