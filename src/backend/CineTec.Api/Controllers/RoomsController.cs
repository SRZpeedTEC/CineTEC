using Microsoft.AspNetCore.Mvc;
using CineTec.Api.Services;
using CineTec.Api.Models;

namespace CineTec.Api.Controllers
{
    /// <summary>
    /// Exposes CRUD endpoints for room management.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        /// <summary>
        /// Creates a new room.
        /// </summary>
        /// <param name="room">Room payload received from the client.</param>
        /// <returns>The created room response.</returns>
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

        /// <summary>
        /// Gets one room by its composite key.
        /// </summary>
        /// <param name="cinemaId">Branch identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <returns>The matching room response.</returns>
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

        /// <summary>
        /// Returns every room.
        /// </summary>
        /// <returns>A collection of rooms.</returns>
        [HttpGet]
        public ActionResult<List<Room>> GetAll()
        {
            return Ok(RoomService.GetAllRooms());
        }

        /// <summary>
        /// Returns rooms for a given cinema branch.
        /// </summary>
        /// <param name="cinemaId">Branch identifier.</param>
        /// <returns>A collection of rooms.</returns>
        [HttpGet("cinema/{cinemaId}")]
        public ActionResult<List<Room>> GetByCinema(string cinemaId)
        {
            return Ok(RoomService.GetRoomsByCinema(cinemaId));
        }

        /// <summary>
        /// Updates an existing room.
        /// </summary>
        /// <param name="cinemaId">Branch identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <param name="room">Updated room payload.</param>
        /// <returns>The updated room response.</returns>
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

        /// <summary>
        /// Deletes a room by its composite key.
        /// </summary>
        /// <param name="cinemaId">Branch identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <returns>No content when the room is removed.</returns>
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
