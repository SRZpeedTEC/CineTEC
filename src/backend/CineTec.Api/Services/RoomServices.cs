using CineTec.Api.Models;
using CineTec.Api.Repositories;

namespace CineTec.Api.Services
{
    /// <summary>
    /// Encapsulates room operations for the API layer.
    /// </summary>
    public static class RoomService
    {
        /// <summary>
        /// Creates a new room.
        /// </summary>
        /// <param name="room">Room data to persist.</param>
        /// <returns>The created room.</returns>
        public static Room CreateRoom(Room room)
        {
            return RoomRepository.AddRoom(room);
        }

        /// <summary>
        /// Gets a room by its composite key.
        /// </summary>
        /// <param name="cinemaId">Branch identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <returns>The matching room, or <see langword="null"/> when it does not exist.</returns>
        public static Room? GetRoom(string cinemaId, int roomNumber)
        {
            return RoomRepository.GetRoom(cinemaId, roomNumber);
        }

        /// <summary>
        /// Returns all rooms.
        /// </summary>
        /// <returns>A list of rooms.</returns>
        public static List<Room> GetAllRooms()
        {
            return RoomRepository.GetAll();
        }

        /// <summary>
        /// Returns every room for a branch.
        /// </summary>
        /// <param name="cinemaId">Branch identifier.</param>
        /// <returns>A list of rooms.</returns>
        public static List<Room> GetRoomsByCinema(string cinemaId)
        {
            return RoomRepository.GetByCinema(cinemaId);
        }

        /// <summary>
        /// Updates an existing room.
        /// </summary>
        /// <param name="cinemaId">Branch identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <param name="room">Updated room payload.</param>
        /// <returns>The updated room, or <see langword="null"/> when it does not exist.</returns>
        public static Room? UpdateRoom(string cinemaId, int roomNumber, Room room)
        {
            return RoomRepository.UpdateRoom(cinemaId, roomNumber, room);
        }

        /// <summary>
        /// Deletes an existing room.
        /// </summary>
        /// <param name="cinemaId">Branch identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <returns><see langword="true"/> when the room was removed; otherwise, <see langword="false"/>.</returns>
        public static bool DeleteRoom(string cinemaId, int roomNumber)
        {
            return RoomRepository.DeleteRoom(cinemaId, roomNumber);
        }
    }
}
