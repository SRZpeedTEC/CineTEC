using CineTec.Api.Models;
using CineTec.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CineTec.Api.Controllers;

/// <summary>
/// Exposes CRUD endpoints for movie management.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    /// <summary>
    /// Creates a new movie.
    /// </summary>
    /// <param name="movie">Movie payload received from the client.</param>
    /// <returns>The created movie response.</returns>
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

    /// <summary>
    /// Gets a movie by identifier.
    /// </summary>
    /// <param name="id">Movie identifier.</param>
    /// <returns>The matching movie response.</returns>
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

    /// <summary>
    /// Returns every movie registered in the system.
    /// </summary>
    /// <returns>A collection of movies.</returns>
    [HttpGet]
    public ActionResult<List<Movie>> GetAll()
    {
        return Ok(MovieServices.GetAllMovies());
    }

    /// <summary>
    /// Updates an existing movie.
    /// </summary>
    /// <param name="id">Movie identifier.</param>
    /// <param name="movie">Updated movie payload.</param>
    /// <returns>The updated movie response.</returns>
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

    /// <summary>
    /// Deletes a movie by identifier.
    /// </summary>
    /// <param name="id">Movie identifier.</param>
    /// <returns>No content when the movie is removed.</returns>
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
