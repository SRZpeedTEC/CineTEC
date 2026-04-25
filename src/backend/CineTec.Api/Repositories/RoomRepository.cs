using System.Text.Json;
using CineTec.Api.Models;

namespace CineTec.Api.Repositories
{
    /// <summary>
    /// Persists room records in JSON storage.
    /// </summary>
    public static class RoomRepository
    {
        private static readonly string filePath =
            Path.Combine(Directory.GetCurrentDirectory(), "dataBase", "rooms.json");

        /// <summary>
        /// Gets every stored room.
        /// </summary>
        /// <returns>A list of rooms.</returns>
        public static List<Room> GetAll()
        {
            if (!File.Exists(filePath))
            {
                File.WriteAllText(filePath, "[]");
            }

            var jsonData = File.ReadAllText(filePath);
            var rooms = JsonSerializer.Deserialize<List<Room>>(jsonData);

            return rooms ?? new List<Room>();
        }

        /// <summary>
        /// Adds a room to storage.
        /// </summary>
        /// <param name="room">Room data to save.</param>
        /// <returns>The stored room.</returns>
        public static Room AddRoom(Room room)
        {
            var rooms = GetAll();
            rooms.Add(room);
            SaveAll(rooms);
            return room;
        }

        /// <summary>
        /// Gets one room by its composite key.
        /// </summary>
        /// <param name="cinemaId">Branch identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <returns>The matching room, or <see langword="null"/> when it does not exist.</returns>
        public static Room? GetRoom(string cinemaId, int roomNumber)
        {
            return GetAll()
                .FirstOrDefault(r => r.Cinema_id == cinemaId && r.room_number == roomNumber);
        }

        /// <summary>
        /// Gets every room for a branch.
        /// </summary>
        /// <param name="cinemaId">Branch identifier.</param>
        /// <returns>A list of rooms.</returns>
        public static List<Room> GetByCinema(string cinemaId)
        {
            return GetAll()
                .Where(r => r.Cinema_id == cinemaId)
                .ToList();
        }

        /// <summary>
        /// Updates an existing room.
        /// </summary>
        /// <param name="cinemaId">Branch identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <param name="updatedRoom">Updated room payload.</param>
        /// <returns>The updated room, or <see langword="null"/> when it does not exist.</returns>
        public static Room? UpdateRoom(string cinemaId, int roomNumber, Room updatedRoom)
        {
            var rooms = GetAll();

            var index = rooms.FindIndex(r =>
                r.Cinema_id == cinemaId && r.room_number == roomNumber);

            if (index == -1)
                return null;

            rooms[index] = updatedRoom;

            SaveAll(rooms);

            return updatedRoom;
        }

        /// <summary>
        /// Deletes a room by its composite key.
        /// </summary>
        /// <param name="cinemaId">Branch identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <returns><see langword="true"/> when the room was removed; otherwise, <see langword="false"/>.</returns>
        public static bool DeleteRoom(string cinemaId, int roomNumber)
        {
            var rooms = GetAll();

            var room = rooms.FirstOrDefault(r =>
                r.Cinema_id == cinemaId && r.room_number == roomNumber);

            if (room == null)
                return false;

            rooms.Remove(room);

            SaveAll(rooms);

            return true;
        }

        private static void SaveAll(List<Room> rooms)
        {
            // Indented output makes it much easier to verify room layouts during manual QA.
            var jsonData = JsonSerializer.Serialize(rooms, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            File.WriteAllText(filePath, jsonData);
        }
    }
}
