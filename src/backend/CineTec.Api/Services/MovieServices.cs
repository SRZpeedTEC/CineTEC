using CineTec.Api.Models;
using CineTec.Api.Repositories;

namespace CineTec.Api.Services;

public static class MovieServices
{
    public static Movie CreateMovie(Movie movie)
    {
        return MovieRepository.AddMovie(movie);
    }

    public static Movie? GetMovie(int movieID)
    {
        return MovieRepository.GetById(movieID);
    }

    public static List<Movie> GetAllMovies()
    {
        return MovieRepository.GetAll();
    }

    public static Movie? UpdateMovie(int movieID, Movie movie)
    {
        return MovieRepository.UpdateMovie(movieID, movie);
    }

    public static bool DeleteMovie(int movieID)
    {
        return MovieRepository.DeleteMovie(movieID);
    }
}
