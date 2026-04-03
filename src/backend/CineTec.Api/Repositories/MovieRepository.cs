using System.Text.Json;
using CineTec.Api.Models;

namespace CineTec.Api.Repositories
{
    public static class MovieRepository
    {
        private static readonly string filePath =
            Path.Combine(Directory.GetCurrentDirectory(), "dataBase", "movies.json");

        public static List<Movie> GetAll()
        {
            if (!File.Exists(filePath))
            {
                File.WriteAllText(filePath, "[]");
            }

            var jsonData = File.ReadAllText(filePath);
            var movies = JsonSerializer.Deserialize<List<Movie>>(jsonData);

            return movies ?? new List<Movie>();
        }

        public static Movie AddMovie(Movie movie)
        {
            var movies = GetAll();
            movies.Add(movie);
            SaveAll(movies);
            return movie;
        }

        public static Movie? GetById(string originalName)
        {
            return GetAll().FirstOrDefault(m => m.originalName == originalName);
        }

        public static Movie? UpdateMovie(string originalName, Movie updatedMovie)
        {
            var movies = GetAll();

            var index = movies.FindIndex(m => m.originalName == originalName);

            if (index == -1)
                return null;

            movies[index] = updatedMovie;

            SaveAll(movies);

            return updatedMovie;
        }

        public static bool DeleteMovie(string originalName)
        {
            var movies = GetAll();

            var movie = movies.FirstOrDefault(m => m.originalName == originalName);

            if (movie == null)
                return false;

            movies.Remove(movie);

            SaveAll(movies);

            return true;
        }

        private static void SaveAll(List<Movie> movies)
        {
            var jsonData = JsonSerializer.Serialize(movies, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            File.WriteAllText(filePath, jsonData);
        }
    }
}