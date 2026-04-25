using System.Text.Json;
using CineTec.Api.Helpers;
using CineTec.Api.Models;

namespace CineTec.Api.Repositories;

/// <summary>
/// Persists movie records in the JSON-based storage used by the API.
/// </summary>
public static class MovieRepository
{
    private static readonly string filePath =
        Path.Combine(Directory.GetCurrentDirectory(), "dataBase", "movies.json");

    /// <summary>
    /// Gets every stored movie.
    /// </summary>
    /// <returns>A list of movies.</returns>
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

    /// <summary>
    /// Adds a movie to storage.
    /// </summary>
    /// <param name="movie">Movie data to save.</param>
    /// <returns>The stored movie.</returns>
    public static Movie AddMovie(Movie movie)
    {
        var movies = GetAll();

        // We assign the next available identifier here so controllers and services can stay thin.
        movie.movieID = movie.movieID > 0
            ? movie.movieID
            : movies.Count == 0
                ? 1
                : movies.Max(existingMovie => existingMovie.movieID) + 1;

        // Replacing by ID keeps manual edits and "upsert-like" saves from creating accidental duplicates.
        movies.RemoveAll(existingMovie => existingMovie.movieID == movie.movieID);
        movies.Add(movie);
        SaveAll(movies);

        return movie;
    }

    /// <summary>
    /// Gets one movie by identifier.
    /// </summary>
    /// <param name="movieID">Movie identifier.</param>
    /// <returns>The matching movie, or <see langword="null"/> when it does not exist.</returns>
    public static Movie? GetById(int movieID)
    {
        return GetAll().FirstOrDefault(movie => movie.movieID == movieID);
    }

    /// <summary>
    /// Updates an existing movie.
    /// </summary>
    /// <param name="movieID">Identifier of the movie to update.</param>
    /// <param name="updatedMovie">Updated movie payload.</param>
    /// <returns>The updated movie, or <see langword="null"/> when it does not exist.</returns>
    public static Movie? UpdateMovie(int movieID, Movie updatedMovie)
    {
        var movies = GetAll();
        var index = movies.FindIndex(movie => movie.movieID == movieID);

        if (index == -1)
        {
            return null;
        }

        // We always trust the route key over the body so the identifier remains stable.
        updatedMovie.movieID = movieID;
        movies[index] = updatedMovie;
        SaveAll(movies);

        return updatedMovie;
    }

    /// <summary>
    /// Deletes a movie by identifier.
    /// </summary>
    /// <param name="movieID">Movie identifier.</param>
    /// <returns><see langword="true"/> when the movie was removed; otherwise, <see langword="false"/>.</returns>
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
            // Repositories are responsible for bootstrapping storage so the API can start from a clean machine.
            Directory.CreateDirectory(directory);
        }

        if (!File.Exists(filePath))
        {
            File.WriteAllText(filePath, "[]");
        }
    }

    private static void SaveAll(List<Movie> movies)
    {
        // Ordering by movieID keeps the JSON diff-friendly for teammates reviewing stored changes.
        var jsonData = JsonSerializer.Serialize(movies.OrderBy(movie => movie.movieID), new JsonSerializerOptions
        {
            WriteIndented = true
        });

        File.WriteAllText(filePath, jsonData);
    }
}
