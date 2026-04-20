using Microsoft.AspNetCore.Mvc;
using CineTec.Api.Services;
using CineTec.Api.Models;

namespace CineTec.Api.Controllers
{
    /// <summary>
    /// Exposes CRUD endpoints for movie projections.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class FunctionsController : ControllerBase
    {
        /// <summary>
        /// Creates a new projection.
        /// </summary>
        /// <param name="function">Projection payload received from the client.</param>
        /// <returns>The created projection response.</returns>
        [HttpPost]
        public ActionResult<Function> CreateFunction([FromBody] Function function)
        {
            if (string.IsNullOrWhiteSpace(function.Movie_id))
            {
                return BadRequest("Movie_id is required");
            }

            var createdFunction = FunctionService.CreateFunction(function);

            return CreatedAtAction(nameof(GetFunction),
                new
                {
                    movieId = function.Movie_id,
                    roomNumber = function.room_number,
                    datetime = function.datetime
                },
                createdFunction);
        }

        /// <summary>
        /// Gets one projection by its composite key.
        /// </summary>
        /// <param name="movieId">Movie identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <param name="datetime">Projection date and time.</param>
        /// <returns>The matching projection response.</returns>
        [HttpGet("{movieId}/{roomNumber}/{datetime}")]
        public ActionResult<Function> GetFunction(string movieId, int roomNumber, DateTime datetime)
        {
            var function = FunctionService.GetFunction(movieId, roomNumber, datetime);

            if (function == null)
            {
                return NotFound("Function not found");
            }

            return Ok(function);
        }

        /// <summary>
        /// Returns every projection.
        /// </summary>
        /// <returns>A collection of projections.</returns>
        [HttpGet]
        public ActionResult<List<Function>> GetAll()
        {
            return Ok(FunctionService.GetAllFunctions());
        }

        /// <summary>
        /// Returns projections for a given movie.
        /// </summary>
        /// <param name="movieId">Movie identifier.</param>
        /// <returns>A collection of projections.</returns>
        [HttpGet("movie/{movieId}")]
        public ActionResult<List<Function>> GetByMovie(string movieId)
        {
            return Ok(FunctionService.GetFunctionsByMovie(movieId));
        }

        /// <summary>
        /// Returns projections scheduled in a given room.
        /// </summary>
        /// <param name="roomNumber">Room number.</param>
        /// <returns>A collection of projections.</returns>
        [HttpGet("room/{roomNumber}")]
        public ActionResult<List<Function>> GetByRoom(int roomNumber)
        {
            return Ok(FunctionService.GetFunctionsByRoom(roomNumber));
        }

        /// <summary>
        /// Updates an existing projection.
        /// </summary>
        /// <param name="movieId">Movie identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <param name="datetime">Projection date and time.</param>
        /// <param name="function">Updated projection payload.</param>
        /// <returns>The updated projection response.</returns>
        [HttpPut("{movieId}/{roomNumber}/{datetime}")]
        public ActionResult<Function> UpdateFunction(
            string movieId,
            int roomNumber,
            DateTime datetime,
            [FromBody] Function function)
        {
            var updatedFunction = FunctionService.UpdateFunction(movieId, roomNumber, datetime, function);

            if (updatedFunction == null)
            {
                return NotFound("Function not found");
            }

            return Ok(updatedFunction);
        }

        /// <summary>
        /// Deletes a projection by its composite key.
        /// </summary>
        /// <param name="movieId">Movie identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <param name="datetime">Projection date and time.</param>
        /// <returns>No content when the projection is removed.</returns>
        [HttpDelete("{movieId}/{roomNumber}/{datetime}")]
        public IActionResult DeleteFunction(string movieId, int roomNumber, DateTime datetime)
        {
            var deleted = FunctionService.DeleteFunction(movieId, roomNumber, datetime);

            if (!deleted)
            {
                return NotFound("Function not found");
            }

            return NoContent();
        }
    }
}
