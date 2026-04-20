using CineTec.Api.Models;
using CineTec.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CineTec.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    [HttpPost]
    public ActionResult<Movie> CreateMovie([FromBody] Movie movie)
    {
        if (string.IsNullOrWhiteSpace(movie.originalName))
        {
            return BadRequest("Original name is required.");
        }

        var createdMovie = MovieServices.CreateMovie(movie);

        return CreatedAtAction(nameof(GetMovie), new { id = createdMovie.movieID }, createdMovie);
    }

    [HttpGet("{id:int}")]
    public ActionResult<Movie> GetMovie(int id)
    {
        var movie = MovieServices.GetMovie(id);

        if (movie is null)
        {
            return NotFound("Movie not found.");
        }

        return Ok(movie);
    }

    [HttpGet]
    public ActionResult<List<Movie>> GetAll()
    {
        return Ok(MovieServices.GetAllMovies());
    }

    [HttpPut("{id:int}")]
    public ActionResult<Movie> UpdateMovie(int id, [FromBody] Movie movie)
    {
        if (string.IsNullOrWhiteSpace(movie.originalName))
        {
            return BadRequest("Original name is required.");
        }

        var updatedMovie = MovieServices.UpdateMovie(id, movie);

        if (updatedMovie is null)
        {
            return NotFound("Movie not found.");
        }

        return Ok(updatedMovie);
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeleteMovie(int id)
    {
        var deleted = MovieServices.DeleteMovie(id);

        if (!deleted)
        {
            return NotFound("Movie not found.");
        }

        return NoContent();
    }
}
