using CineTec.Api.Models;
using CineTec.Api.Repositories;

namespace CineTec.Api.Services
{
    /// <summary>
    /// Encapsulates client operations for the API layer.
    /// </summary>
    public static class ClientService
    {
        /// <summary>
        /// Creates a new client.
        /// </summary>
        /// <param name="client">Client data to persist.</param>
        /// <returns>The created client.</returns>
        public static Client CreateClient(Client client)
        {
            return ClientRepository.AddClient(client);
        }

        /// <summary>
        /// Gets a client by identifier.
        /// </summary>
        /// <param name="id">Client identifier.</param>
        /// <returns>The matching client, or <see langword="null"/> when it does not exist.</returns>
        public static Client? GetClient(int id)
        {
            return ClientRepository.GetById(id);
        }

        /// <summary>
        /// Returns every registered client.
        /// </summary>
        /// <returns>A list of clients.</returns>
        public static List<Client> GetAllClients()
        {
            return ClientRepository.GetAll();
        }

        /// <summary>
        /// Updates an existing client.
        /// </summary>
        /// <param name="id">Client identifier.</param>
        /// <param name="client">Updated client payload.</param>
        /// <returns>The updated client, or <see langword="null"/> when it does not exist.</returns>
        public static Client? UpdateClient(int id, Client client)
        {
            return ClientRepository.UpdateClient(id, client);
        }

        /// <summary>
        /// Deletes a client by identifier.
        /// </summary>
        /// <param name="id">Client identifier.</param>
        /// <returns><see langword="true"/> when the client was removed; otherwise, <see langword="false"/>.</returns>
        public static bool DeleteClient(int id)
        {
            return ClientRepository.DeleteClient(id);
        }
    }
}
