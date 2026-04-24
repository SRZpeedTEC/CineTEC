using System.Text.Json;
using CineTec.Api.Helpers;
using CineTec.Api.Models;

namespace CineTec.Api.Repositories
{
    /// <summary>
    /// Persists projection records in JSON storage.
    /// </summary>
    public static class FunctionRepository
    {
        private static readonly string filePath =
            StoragePathHelper.GetStorageFilePath("functions.json");

        /// <summary>
        /// Gets every stored projection.
        /// </summary>
        /// <returns>A list of projections.</returns>
        public static List<Function> GetAll()
        {
            if (!File.Exists(filePath))
            {
                File.WriteAllText(filePath, "[]");
            }

            var jsonData = File.ReadAllText(filePath);
            var functions = JsonSerializer.Deserialize<List<Function>>(jsonData);

            return functions ?? new List<Function>();
        }

        /// <summary>
        /// Adds a projection to storage.
        /// </summary>
        /// <param name="function">Projection data to save.</param>
        /// <returns>The stored projection.</returns>
        public static Function AddFunction(Function function)
        {
            var functions = GetAll();
            functions.Add(function);
            SaveAll(functions);
            return function;
        }

        /// <summary>
        /// Gets one projection by its composite key.
        /// </summary>
        /// <param name="movieId">Movie identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <param name="datetime">Projection date and time.</param>
        /// <returns>The matching projection, or <see langword="null"/> when it does not exist.</returns>
        public static Function? GetFunction(string movieId, int roomNumber, DateTime datetime)
        {
            return GetAll().FirstOrDefault(f =>
                f.Movie_id == movieId &&
                f.room_number == roomNumber &&
                f.datetime == datetime);
        }

        /// <summary>
        /// Gets every projection for a movie.
        /// </summary>
        /// <param name="movieId">Movie identifier.</param>
        /// <returns>A list of projections.</returns>
        public static List<Function> GetByMovie(string movieId)
        {
            return GetAll().Where(f => f.Movie_id == movieId).ToList();
        }

        /// <summary>
        /// Gets every projection for a room.
        /// </summary>
        /// <param name="roomNumber">Room number.</param>
        /// <returns>A list of projections.</returns>
        public static List<Function> GetByRoom(int roomNumber)
        {
            return GetAll().Where(f => f.room_number == roomNumber).ToList();
        }

        /// <summary>
        /// Updates an existing projection.
        /// </summary>
        /// <param name="movieId">Movie identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <param name="datetime">Projection date and time.</param>
        /// <param name="updatedFunction">Updated projection payload.</param>
        /// <returns>The updated projection, or <see langword="null"/> when it does not exist.</returns>
        public static Function? UpdateFunction(string movieId, int roomNumber, DateTime datetime, Function updatedFunction)
        {
            var functions = GetAll();

            var index = functions.FindIndex(f =>
                f.Movie_id == movieId &&
                f.room_number == roomNumber &&
                f.datetime == datetime);

            if (index == -1)
                return null;

            functions[index] = updatedFunction;

            SaveAll(functions);

            return updatedFunction;
        }

        /// <summary>
        /// Deletes a projection by its composite key.
        /// </summary>
        /// <param name="movieId">Movie identifier.</param>
        /// <param name="roomNumber">Room number.</param>
        /// <param name="datetime">Projection date and time.</param>
        /// <returns><see langword="true"/> when the projection was removed; otherwise, <see langword="false"/>.</returns>
        public static bool DeleteFunction(string movieId, int roomNumber, DateTime datetime)
        {
            var functions = GetAll();

            var function = functions.FirstOrDefault(f =>
                f.Movie_id == movieId &&
                f.room_number == roomNumber &&
                f.datetime == datetime);

            if (function == null)
                return false;

            functions.Remove(function);

            SaveAll(functions);

            return true;
        }

        private static void SaveAll(List<Function> functions)
        {
            // Pretty-printed JSON keeps schedule changes readable when debugging test data.
            var jsonData = JsonSerializer.Serialize(functions, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            File.WriteAllText(filePath, jsonData);
        }
    }
}
