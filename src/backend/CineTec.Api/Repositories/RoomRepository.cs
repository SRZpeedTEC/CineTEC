using System.Text.Json;
using CineTec.Api.Models;

namespace CineTec.Api.Repositories
{
    public static class RoomRepository
    {
        private static readonly string filePath =
            Path.Combine(Directory.GetCurrentDirectory(), "dataBase", "rooms.json");

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

        public static Room AddRoom(Room room)
        {
            var rooms = GetAll();
            rooms.Add(room);
            SaveAll(rooms);
            return room;
        }

        public static Room? GetRoom(string cinemaId, int roomNumber)
        {
            return GetAll()
                .FirstOrDefault(r => r.Cinema_id == cinemaId && r.room_number == roomNumber);
        }

        public static List<Room> GetByCinema(string cinemaId)
        {
            return GetAll()
                .Where(r => r.Cinema_id == cinemaId)
                .ToList();
        }

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
            var jsonData = JsonSerializer.Serialize(rooms, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            File.WriteAllText(filePath, jsonData);
        }
    }
}