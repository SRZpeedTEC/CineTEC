using Microsoft.AspNetCore.Mvc;
using CineTec.Api.Services;
using CineTec.Api.Models;

namespace CineTec.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        // POST: api/rooms
        [HttpPost]
        public ActionResult<Room> CreateRoom([FromBody] Room room)
        {
            if (string.IsNullOrWhiteSpace(room.Cinema_id))
            {
                return BadRequest("Cinema_id is required");
            }

            var createdRoom = RoomService.CreateRoom(room);

            return CreatedAtAction(nameof(GetRoom),
                new { cinemaId = room.Cinema_id, roomNumber = room.room_number },
                createdRoom);
        }

        // GET: api/rooms/{cinemaId}/{roomNumber}
        [HttpGet("{cinemaId}/{roomNumber}")]
        public ActionResult<Room> GetRoom(string cinemaId, int roomNumber)
        {
            var room = RoomService.GetRoom(cinemaId, roomNumber);

            if (room == null)
            {
                return NotFound("Room not found");
            }

            return Ok(room);
        }

        // GET: api/rooms
        [HttpGet]
        public ActionResult<List<Room>> GetAll()
        {
            return Ok(RoomService.GetAllRooms());
        }

        // GET: api/rooms/cinema/{cinemaId}
        [HttpGet("cinema/{cinemaId}")]
        public ActionResult<List<Room>> GetByCinema(string cinemaId)
        {
            return Ok(RoomService.GetRoomsByCinema(cinemaId));
        }

        // PUT: api/rooms/{cinemaId}/{roomNumber}
        [HttpPut("{cinemaId}/{roomNumber}")]
        public ActionResult<Room> UpdateRoom(string cinemaId, int roomNumber, [FromBody] Room room)
        {
            var updatedRoom = RoomService.UpdateRoom(cinemaId, roomNumber, room);

            if (updatedRoom == null)
            {
                return NotFound("Room not found");
            }

            return Ok(updatedRoom);
        }

        // DELETE: api/rooms/{cinemaId}/{roomNumber}
        [HttpDelete("{cinemaId}/{roomNumber}")]
        public IActionResult DeleteRoom(string cinemaId, int roomNumber)
        {
            var deleted = RoomService.DeleteRoom(cinemaId, roomNumber);

            if (!deleted)
            {
                return NotFound("Room not found");
            }

            return NoContent();
        }
    }
}