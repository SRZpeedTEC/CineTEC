using System.Text.Json;
using CineTec.Api.Models;

namespace CineTec.Api.Repositories
{
    public static class CinemaRepository
    {
        private static readonly string filePath =
            Path.Combine(Directory.GetCurrentDirectory(), "dataBase", "cinemas.json");

        public static List<Cinema> GetAll()
        {
            if (!File.Exists(filePath))
            {
                File.WriteAllText(filePath, "[]");
            }

            var jsonData = File.ReadAllText(filePath);
            var cinemas = JsonSerializer.Deserialize<List<Cinema>>(jsonData);

            return cinemas ?? new List<Cinema>();
        }

        public static Cinema AddCinema(Cinema cinema)
        {
            var cinemas = GetAll();
            cinemas.Add(cinema);
            SaveAll(cinemas);
            return cinema;
        }

        public static Cinema? GetByName(string name)
        {
            return GetAll().FirstOrDefault(c => c.name == name);
        }

        public static Cinema? UpdateCinema(string name, Cinema updatedCinema)
        {
            var cinemas = GetAll();

            var index = cinemas.FindIndex(c => c.name == name);

            if (index == -1)
                return null;

            cinemas[index] = updatedCinema;

            SaveAll(cinemas);

            return updatedCinema;
        }

        public static bool DeleteCinema(string name)
        {
            var cinemas = GetAll();

            var cinema = cinemas.FirstOrDefault(c => c.name == name);

            if (cinema == null)
                return false;

            cinemas.Remove(cinema);

            SaveAll(cinemas);

            return true;
        }

        private static void SaveAll(List<Cinema> cinemas)
        {
            var jsonData = JsonSerializer.Serialize(cinemas, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            File.WriteAllText(filePath, jsonData);
        }
    }
}