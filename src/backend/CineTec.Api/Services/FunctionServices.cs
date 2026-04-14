using CineTec.Api.Models;
using CineTec.Api.Repositories;

namespace CineTec.Api.Services
{
    public static class FunctionService
    {
        public static Function CreateFunction(Function function)
        {
            return FunctionRepository.AddFunction(function);
        }

        public static Function? GetFunction(string movieId, int roomNumber, DateTime datetime)
        {
            return FunctionRepository.GetFunction(movieId, roomNumber, datetime);
        }

        public static List<Function> GetAllFunctions()
        {
            return FunctionRepository.GetAll();
        }

        public static List<Function> GetFunctionsByMovie(string movieId)
        {
            return FunctionRepository.GetByMovie(movieId);
        }

        public static List<Function> GetFunctionsByRoom(int roomNumber)
        {
            return FunctionRepository.GetByRoom(roomNumber);
        }

        public static Function? UpdateFunction(string movieId, int roomNumber, DateTime datetime, Function function)
        {
            return FunctionRepository.UpdateFunction(movieId, roomNumber, datetime, function);
        }

        public static bool DeleteFunction(string movieId, int roomNumber, DateTime datetime)
        {
            return FunctionRepository.DeleteFunction(movieId, roomNumber, datetime);
        }
    }
}