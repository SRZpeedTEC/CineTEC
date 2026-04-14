using CineTec.Api.Models;
using CineTec.Api.Repositories;

namespace CineTec.Api.Services
{
    public static class RoomService
    {
        public static Room CreateRoom(Room room)
        {
            return RoomRepository.AddRoom(room);
        }

        public static Room? GetRoom(string cinemaId, int roomNumber)
        {
            return RoomRepository.GetRoom(cinemaId, roomNumber);
        }

        public static List<Room> GetAllRooms()
        {
            return RoomRepository.GetAll();
        }

        public static List<Room> GetRoomsByCinema(string cinemaId)
        {
            return RoomRepository.GetByCinema(cinemaId);
        }

        public static Room? UpdateRoom(string cinemaId, int roomNumber, Room room)
        {
            return RoomRepository.UpdateRoom(cinemaId, roomNumber, room);
        }

        public static bool DeleteRoom(string cinemaId, int roomNumber)
        {
            return RoomRepository.DeleteRoom(cinemaId, roomNumber);
        }
    }
}