using CineTec.Api.Models;
using CineTec.Api.Repositories;

namespace CineTec.Api.Services;

/// <summary>
/// Encapsulates movie business operations for the API layer.
/// </summary>
public static class MovieServices
{
    /// <summary>
    /// Creates a new movie record.
    /// </summary>
    /// <param name="movie">Movie data to persist.</param>
    /// <returns>The created movie.</returns>
    public static Movie CreateMovie(Movie movie)
    {
        return MovieRepository.AddMovie(movie);
    }

    /// <summary>
    /// Gets a movie by its identifier.
    /// </summary>
    /// <param name="movieID">Movie identifier.</param>
    /// <returns>The matching movie, or <see langword="null"/> when it does not exist.</returns>
    public static Movie? GetMovie(int movieID)
    {
        return MovieRepository.GetById(movieID);
    }

    /// <summary>
    /// Returns all registered movies.
    /// </summary>
    /// <returns>A list of movies.</returns>
    public static List<Movie> GetAllMovies()
    {
        return MovieRepository.GetAll();
    }

    /// <summary>
    /// Updates an existing movie.
    /// </summary>
    /// <param name="movieID">Identifier of the movie to update.</param>
    /// <param name="movie">Updated movie payload.</param>
    /// <returns>The updated movie, or <see langword="null"/> when it does not exist.</returns>
    public static Movie? UpdateMovie(int movieID, Movie movie)
    {
        return MovieRepository.UpdateMovie(movieID, movie);
    }

    /// <summary>
    /// Deletes a movie by its identifier.
    /// </summary>
    /// <param name="movieID">Identifier of the movie to delete.</param>
    /// <returns><see langword="true"/> when the movie was removed; otherwise, <see langword="false"/>.</returns>
    public static bool DeleteMovie(int movieID)
    {
        return MovieRepository.DeleteMovie(movieID);
    }
}
