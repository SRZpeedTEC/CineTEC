using CineTec.Api.Models;
using CineTec.Api.Repositories;

namespace CineTec.Api.Services
{
    public static class ClientService
    {
        public static Client CreateClient(Client client)
        {
            return ClientRepository.AddClient(client);
        }

        public static Client? GetClient(int id)
        {
            return ClientRepository.GetById(id);
        }

        public static List<Client> GetAllClients()
        {
            return ClientRepository.GetAll();
        }

        public static Client? UpdateClient(int id, Client client)
        {
            return ClientRepository.UpdateClient(id, client);
        }

        public static bool DeleteClient(int id)
        {
            return ClientRepository.DeleteClient(id);
        }
    }
}