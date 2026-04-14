using CineTec.Api.Models;
using CineTec.Api.Repositories;

namespace CineTec.Api.Services
{
    public static class MovieServices
    {
        public static Movie CreateMovie(Movie movie)
        {
            return MovieRepository.AddMovie(movie);
        }

        public static Movie? GetMovie(string originalName)
        {
            return MovieRepository.GetById(originalName);
        }

        public static List<Movie> GetAllMovies()
        {
            return MovieRepository.GetAll();
        }

        public static Movie? UpdateMovie(string originalName, Movie movie)
        {
            return MovieRepository.UpdateMovie(originalName, movie);
        }

        public static bool DeleteMovie(string originalName)
        {
            return MovieRepository.DeleteMovie(originalName);
        }
    }
}