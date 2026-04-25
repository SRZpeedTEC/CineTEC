using Microsoft.AspNetCore.Mvc;
using CineTec.Api.Services;
using CineTec.Api.Models;

namespace CineTec.Api.Controllers
{
    /// <summary>
    /// Exposes CRUD endpoints for cinema branch management.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class CinemasController : ControllerBase
    {
        /// <summary>
        /// Creates a new cinema branch.
        /// </summary>
        /// <param name="cinema">Cinema payload received from the client.</param>
        /// <returns>The created cinema response.</returns>
        [HttpPost]
        public ActionResult<Cinema> CreateCinema([FromBody] Cinema cinema)
        {
            if (string.IsNullOrWhiteSpace(cinema.name))
            {
                return BadRequest("Cinema name is required");
            }

            var createdCinema = CinemaServices.CreateCinema(cinema);

            return CreatedAtAction(nameof(createdCinema),
                                   new { name = createdCinema.name },
                                   createdCinema);
        }

        /// <summary>
        /// Gets a cinema by name.
        /// </summary>
        /// <param name="name">Branch name.</param>
        /// <returns>The matching cinema response.</returns>
        [HttpGet("{name}")]
        public ActionResult<Cinema> GetCinema(string name)
        {
            var cinema = CinemaServices.GetCinema(name);

            if (cinema == null)
            {
                return NotFound("Cinema not found");
            }

            return Ok(cinema);
        }

        /// <summary>
        /// Returns every cinema branch.
        /// </summary>
        /// <returns>A collection of cinemas.</returns>
        [HttpGet]
        public ActionResult<List<Cinema>> GetAll()
        {
            return Ok(CinemaServices.GetAllCinemas());
        }

        /// <summary>
        /// Updates an existing cinema branch.
        /// </summary>
        /// <param name="name">Current branch name.</param>
        /// <param name="cinema">Updated cinema payload.</param>
        /// <returns>The updated cinema response.</returns>
        [HttpPut("{name}")]
        public ActionResult<Cinema> UpdateCinema(string name, [FromBody] Cinema cinema)
        {
            var updatedCinema = CinemaServices.UpdateCinema(name, cinema);

            if (updatedCinema == null)
            {
                return NotFound("Cinema not found");
            }

            return Ok(updatedCinema);
        }

        /// <summary>
        /// Deletes a cinema branch.
        /// </summary>
        /// <param name="name">Branch name.</param>
        /// <returns>No content when the cinema is removed.</returns>
        [HttpDelete("{name}")]
        public IActionResult DeleteCinema(string name)
        {
            var deleted = CinemaServices.DeleteCinema(name);

            if (!deleted)
            {
                return NotFound("Cinema not found");
            }

            return NoContent();
        }
    }
}
