using CineTec.Api.Models;
using CineTec.Api.Repositories;

namespace CineTec.Api.Services
{
    /// <summary>
    /// Encapsulates cinema branch operations for the API layer.
    /// </summary>
    public static class CinemaServices
    {
        /// <summary>
        /// Creates a new cinema branch.
        /// </summary>
        /// <param name="cinema">Cinema data to persist.</param>
        /// <returns>The created cinema.</returns>
        public static Cinema CreateCinema(Cinema cinema)
        {
            return CinemaRepository.AddCinema(cinema);
        }

        /// <summary>
        /// Gets a cinema by name.
        /// </summary>
        /// <param name="name">Branch name.</param>
        /// <returns>The matching cinema, or <see langword="null"/> when it does not exist.</returns>
        public static Cinema? GetCinema(string name)
        {
            return CinemaRepository.GetByName(name);
        }

        /// <summary>
        /// Returns every registered cinema branch.
        /// </summary>
        /// <returns>A list of cinemas.</returns>
        public static List<Cinema> GetAllCinemas()
        {
            return CinemaRepository.GetAll();
        }

        /// <summary>
        /// Updates an existing cinema branch.
        /// </summary>
        /// <param name="name">Current cinema name.</param>
        /// <param name="cinema">Updated cinema payload.</param>
        /// <returns>The updated cinema, or <see langword="null"/> when it does not exist.</returns>
        public static Cinema? UpdateCinema(string name, Cinema cinema)
        {
            return CinemaRepository.UpdateCinema(name, cinema);
        }

        /// <summary>
        /// Deletes a cinema branch.
        /// </summary>
        /// <param name="name">Branch name.</param>
        /// <returns><see langword="true"/> when the branch was removed; otherwise, <see langword="false"/>.</returns>
        public static bool DeleteCinema(string name)
        {
            return CinemaRepository.DeleteCinema(name);
        }
    }
}
