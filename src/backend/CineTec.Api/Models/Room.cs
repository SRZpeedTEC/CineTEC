namespace CineTec.Api.Models;

public class Room {
    public string Cinema_id { get; set; } = string.Empty;
    public int room_number { get; set; }
    public int number_of_columns { get; set; }
    public int number_of_rows { get; set; }
    public int total_capacity { get; set; }
    public int capacity_factor { get; set; }
    public int max_capacity { get; set; } // pending to know the formula....

}