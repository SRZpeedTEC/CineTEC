using System.ComponentModel.DataAnnotations;

namespace CineTec.Api.Models;

public class Movie {
    public required string originalName { get; set; } 
    
    public string commercialName { get; set; } = string.Empty;
    public string imageURL { get; set; } = string.Empty;
    public string duration { get; set; } = string.Empty;
    public string rating { get; set; } = string.Empty;
    public string director { get; set; } = string.Empty;

    public List<string> protagonists { get; set; } = new();

  
}