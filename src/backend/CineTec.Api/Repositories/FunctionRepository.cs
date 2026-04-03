using System.Text.Json;
using CineTec.Api.Models;

namespace CineTec.Api.Repositories
{
    public static class FunctionRepository
    {
        private static readonly string filePath =
            Path.Combine(Directory.GetCurrentDirectory(), "dataBase", "functions.json");

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

        public static Function AddFunction(Function function)
        {
            var functions = GetAll();
            functions.Add(function);
            SaveAll(functions);
            return function;
        }

        public static Function? GetFunction(string movieId, int roomNumber, DateTime datetime)
        {
            return GetAll().FirstOrDefault(f =>
                f.Movie_id == movieId &&
                f.room_number == roomNumber &&
                f.datetime == datetime);
        }

        public static List<Function> GetByMovie(string movieId)
        {
            return GetAll().Where(f => f.Movie_id == movieId).ToList();
        }

        public static List<Function> GetByRoom(int roomNumber)
        {
            return GetAll().Where(f => f.room_number == roomNumber).ToList();
        }

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
            var jsonData = JsonSerializer.Serialize(functions, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            File.WriteAllText(filePath, jsonData);
        }
    }
}