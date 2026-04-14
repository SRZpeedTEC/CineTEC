using Microsoft.AspNetCore.Mvc;
using CineTec.Api.Services;
using CineTec.Api.Models;

namespace CineTec.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        // POST: api/movies
        [HttpPost]
        public ActionResult<Movie> CreateMovie([FromBody] Movie movie)
        {
            if (string.IsNullOrWhiteSpace(movie.originalName))
            {
                return BadRequest("Original name is required");
            }

            var createdMovie = MovieServices.CreateMovie(movie);

            return CreatedAtAction(nameof(CreateMovie),
                new { id = createdMovie.originalName },
                createdMovie);
        }

        // GET: api/movies/{id}
        [HttpGet("{id}")]
        public ActionResult<Movie> GetMovie(string id)
        {
            var movie = MovieServices.GetMovie(id);

            if (movie == null)
            {
                return NotFound("Movie not found");
            }

            return Ok(movie);
        }

        // GET: api/movies
        [HttpGet]
        public ActionResult<List<Movie>> GetAll()
        {
            return Ok(MovieServices.GetAllMovies());
        }

        // PUT: api/movies/{id}
        [HttpPut("{id}")]
        public ActionResult<Movie> UpdateMovie(string id, [FromBody] Movie movie)
        {
            var updatedMovie = MovieServices.UpdateMovie(id, movie);

            if (updatedMovie == null)
            {
                return NotFound("Movie not found");
            }

            return Ok(updatedMovie);
        }

        // DELETE: api/movies/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteMovie(string id)
        {
            var deleted = MovieServices.DeleteMovie(id);

            if (!deleted)
            {
                return NotFound("Movie not found");
            }

            return NoContent(); // 204
        }
    }
}