using System.Text.Json;
using CineTec.Api.Models;

namespace CineTec.Api.Repositories;

public static class MovieRepository
{
    private static readonly string filePath =
        Path.Combine(Directory.GetCurrentDirectory(), "dataBase", "movies.json");

    public static List<Movie> GetAll()
    {
        EnsureStorage();

        var jsonData = File.ReadAllText(filePath);
        var movies = JsonSerializer.Deserialize<List<Movie>>(jsonData, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        return movies ?? new List<Movie>();
    }

    public static Movie AddMovie(Movie movie)
    {
        var movies = GetAll();

        movie.movieID = movie.movieID > 0
            ? movie.movieID
            : movies.Count == 0
                ? 1
                : movies.Max(existingMovie => existingMovie.movieID) + 1;

        movies.RemoveAll(existingMovie => existingMovie.movieID == movie.movieID);
        movies.Add(movie);
        SaveAll(movies);

        return movie;
    }

    public static Movie? GetById(int movieID)
    {
        return GetAll().FirstOrDefault(movie => movie.movieID == movieID);
    }

    public static Movie? UpdateMovie(int movieID, Movie updatedMovie)
    {
        var movies = GetAll();
        var index = movies.FindIndex(movie => movie.movieID == movieID);

        if (index == -1)
        {
            return null;
        }

        updatedMovie.movieID = movieID;
        movies[index] = updatedMovie;
        SaveAll(movies);

        return updatedMovie;
    }

    public static bool DeleteMovie(int movieID)
    {
        var movies = GetAll();
        var movie = movies.FirstOrDefault(existingMovie => existingMovie.movieID == movieID);

        if (movie is null)
        {
            return false;
        }

        movies.Remove(movie);
        SaveAll(movies);

        return true;
    }

    private static void EnsureStorage()
    {
        var directory = Path.GetDirectoryName(filePath);

        if (!string.IsNullOrWhiteSpace(directory) && !Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        if (!File.Exists(filePath))
        {
            File.WriteAllText(filePath, "[]");
        }
    }

    private static void SaveAll(List<Movie> movies)
    {
        var jsonData = JsonSerializer.Serialize(movies.OrderBy(movie => movie.movieID), new JsonSerializerOptions
        {
            WriteIndented = true
        });

        File.WriteAllText(filePath, jsonData);
    }
}
