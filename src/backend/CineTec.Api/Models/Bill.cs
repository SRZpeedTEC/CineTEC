namespace CineTec.Api.Models;

public class Bill {
  
    public int bill_id { get; set; }
    public int client_id { get; set; } = 0;
    public DateTime datetime_function { get; set; } = DateTime.MinValue;
    public string seat_name { get; set; } = string.Empty;

 
}