using System.Text.Json;
using CineTec.Api.Models;

namespace CineTec.Api.Repositories
{
    /// <summary>
    /// Persists cinema branch records in JSON storage.
    /// </summary>
    public static class CinemaRepository
    {
        private static readonly string filePath =
            Path.Combine(Directory.GetCurrentDirectory(), "dataBase", "cinemas.json");

        /// <summary>
        /// Gets every stored cinema branch.
        /// </summary>
        /// <returns>A list of cinemas.</returns>
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

        /// <summary>
        /// Adds a cinema branch to storage.
        /// </summary>
        /// <param name="cinema">Cinema data to save.</param>
        /// <returns>The stored cinema.</returns>
        public static Cinema AddCinema(Cinema cinema)
        {
            var cinemas = GetAll();
            cinemas.Add(cinema);
            SaveAll(cinemas);
            return cinema;
        }

        /// <summary>
        /// Gets one cinema by name.
        /// </summary>
        /// <param name="name">Branch name.</param>
        /// <returns>The matching cinema, or <see langword="null"/> when it does not exist.</returns>
        public static Cinema? GetByName(string name)
        {
            return GetAll().FirstOrDefault(c => c.name == name);
        }

        /// <summary>
        /// Updates an existing cinema.
        /// </summary>
        /// <param name="name">Current branch name.</param>
        /// <param name="updatedCinema">Updated cinema payload.</param>
        /// <returns>The updated cinema, or <see langword="null"/> when it does not exist.</returns>
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

        /// <summary>
        /// Deletes a cinema by name.
        /// </summary>
        /// <param name="name">Branch name.</param>
        /// <returns><see langword="true"/> when the cinema was removed; otherwise, <see langword="false"/>.</returns>
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
            // Keeping the JSON pretty-printed makes manual inspection far easier during development.
            var jsonData = JsonSerializer.Serialize(cinemas, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            File.WriteAllText(filePath, jsonData);
        }
    }
}
