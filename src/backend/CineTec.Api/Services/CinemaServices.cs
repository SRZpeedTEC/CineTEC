using CineTec.Api.Models;
using CineTec.Api.Repositories;

namespace CineTec.Api.Services
{
    public static class CinemaServices
    {
        public static Cinema CreateCinema(Cinema cinema)
        {
            return CinemaRepository.AddCinema(cinema);
        }

        public static Cinema? GetCinema(string name)
        {
            return CinemaRepository.GetByName(name);
        }

        public static List<Cinema> GetAllCinemas()
        {
            return CinemaRepository.GetAll();
        }

        public static Cinema? UpdateCinema(string name, Cinema cinema)
        {
            return CinemaRepository.UpdateCinema(name, cinema);
        }

        public static bool DeleteCinema(string name)
        {
            return CinemaRepository.DeleteCinema(name);
        }
    }
}