using Microsoft.AspNetCore.Mvc;
using CineTec.Api.Services;
using CineTec.Api.Models;

namespace CineTec.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CinemasController : ControllerBase
    {
        // POST: api/cinemas
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

        // GET: api/cinemas/{name}
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

        // GET: api/cinemas
        [HttpGet]
        public ActionResult<List<Cinema>> GetAll()
        {
            return Ok(CinemaServices.GetAllCinemas());
        }

        // PUT: api/cinemas/{name}
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

        // DELETE: api/cinemas/{name}
        [HttpDelete("{name}")]
        public IActionResult DeleteCinema(string name)
        {
            var deleted = CinemaServices.DeleteCinema(name);

            if (!deleted)
            {
                return NotFound("Cinema not found");
            }

            return NoContent(); // 204
        }
    }
}