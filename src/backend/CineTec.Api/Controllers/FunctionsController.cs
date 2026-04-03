using Microsoft.AspNetCore.Mvc;
using CineTec.Api.Services;
using CineTec.Api.Models;

namespace CineTec.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FunctionsController : ControllerBase
    {
        // POST: api/functions
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

        // GET: api/functions/{movieId}/{roomNumber}/{datetime}
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

        // GET: api/functions
        [HttpGet]
        public ActionResult<List<Function>> GetAll()
        {
            return Ok(FunctionService.GetAllFunctions());
        }

        // GET: api/functions/movie/{movieId}
        [HttpGet("movie/{movieId}")]
        public ActionResult<List<Function>> GetByMovie(string movieId)
        {
            return Ok(FunctionService.GetFunctionsByMovie(movieId));
        }

        // GET: api/functions/room/{roomNumber}
        [HttpGet("room/{roomNumber}")]
        public ActionResult<List<Function>> GetByRoom(int roomNumber)
        {
            return Ok(FunctionService.GetFunctionsByRoom(roomNumber));
        }

        // PUT: api/functions/{movieId}/{roomNumber}/{datetime}
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

        // DELETE: api/functions/{movieId}/{roomNumber}/{datetime}
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