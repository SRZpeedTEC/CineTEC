using CineTec.Api.Models;
using CineTec.Api.Repositories;

namespace CineTec.Api.Services
{
    /// <summary>
    /// Encapsulates projection scheduling operations for the API layer.
    /// </summary>
    public static class FunctionService
    {
        /// <summary>
        /// Creates a new projection.
        /// </summary>
        /// <param name="function">Projection data to persist.</param>
        /// <returns>The created projection.</returns>
        public static Function CreateFunction(Function function)
        {
            return FunctionRepository.AddFunction(function);
        }

        /// <summary>
        /// Gets a projection by its composite key.
        /// </summary>
        /// <param name="movieId">Movie identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <param name="datetime">Projection date and time.</param>
        /// <returns>The matching projection, or <see langword="null"/> when it does not exist.</returns>
        public static Function? GetFunction(string movieId, int roomNumber, DateTime datetime)
        {
            return FunctionRepository.GetFunction(movieId, roomNumber, datetime);
        }

        /// <summary>
        /// Returns all projections.
        /// </summary>
        /// <returns>A list of projections.</returns>
        public static List<Function> GetAllFunctions()
        {
            return FunctionRepository.GetAll();
        }

        /// <summary>
        /// Returns every projection for a movie.
        /// </summary>
        /// <param name="movieId">Movie identifier.</param>
        /// <returns>A list of projections.</returns>
        public static List<Function> GetFunctionsByMovie(string movieId)
        {
            return FunctionRepository.GetByMovie(movieId);
        }

        /// <summary>
        /// Returns every projection scheduled in a room.
        /// </summary>
        /// <param name="roomNumber">Room number.</param>
        /// <returns>A list of projections.</returns>
        public static List<Function> GetFunctionsByRoom(int roomNumber)
        {
            return FunctionRepository.GetByRoom(roomNumber);
        }

        /// <summary>
        /// Updates an existing projection.
        /// </summary>
        /// <param name="movieId">Movie identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <param name="datetime">Projection date and time.</param>
        /// <param name="function">Updated projection payload.</param>
        /// <returns>The updated projection, or <see langword="null"/> when it does not exist.</returns>
        public static Function? UpdateFunction(string movieId, int roomNumber, DateTime datetime, Function function)
        {
            return FunctionRepository.UpdateFunction(movieId, roomNumber, datetime, function);
        }

        /// <summary>
        /// Deletes an existing projection.
        /// </summary>
        /// <param name="movieId">Movie identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <param name="datetime">Projection date and time.</param>
        /// <returns><see langword="true"/> when the projection was removed; otherwise, <see langword="false"/>.</returns>
        public static bool DeleteFunction(string movieId, int roomNumber, DateTime datetime)
        {
            return FunctionRepository.DeleteFunction(movieId, roomNumber, datetime);
        }
    }
}
