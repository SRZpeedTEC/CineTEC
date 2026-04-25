using System.Text.Json;
using CineTec.Api.Helpers;
using CineTec.Api.Models;

namespace CineTec.Api.Repositories
{
    /// <summary>
    /// Persists client records in JSON storage.
    /// </summary>
    public static class ClientRepository
    {
        private static readonly string filePath =
            StoragePathHelper.GetStorageFilePath("clients.json");

        /// <summary>
        /// Gets every stored client.
        /// </summary>
        /// <returns>A list of clients.</returns>
        public static List<Client> GetAll()
        {
            if (!File.Exists(filePath))
            {
                File.WriteAllText(filePath, "[]");
            }

            var jsonData = File.ReadAllText(filePath);

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var clients = JsonSerializer.Deserialize<List<Client>>(jsonData, options);

            return clients ?? new List<Client>();
        }

        /// <summary>
        /// Adds a client to storage.
        /// </summary>
        /// <param name="client">Client data to save.</param>
        /// <returns>The stored client.</returns>
        public static Client AddClient(Client client)
        {
            var clients = GetAll();

            // IDs are generated here so new clients stay unique even if the caller sends an empty value.
            client.ID = clients.Count > 0 ? clients.Max(c => c.ID) + 1 : 1;

            clients.Add(client);

            SaveAll(clients);

            return client;
        }

        /// <summary>
        /// Gets one client by identifier.
        /// </summary>
        /// <param name="id">Client identifier.</param>
        /// <returns>The matching client, or <see langword="null"/> when it does not exist.</returns>
        public static Client? GetById(int id)
        {
            return GetAll().FirstOrDefault(c => c.ID == id);
        }

        /// <summary>
        /// Gets one client by email.
        /// </summary>
        /// <param name="email">Client email address.</param>
        /// <returns>The matching client, or <see langword="null"/> when it does not exist.</returns>
        public static Client? GetByEmail(string email)
        {
            return GetAll().FirstOrDefault(c => c.email == email);
        }

        /// <summary>
        /// Updates an existing client.
        /// </summary>
        /// <param name="id">Client identifier.</param>
        /// <param name="updatedClient">Updated client payload.</param>
        /// <returns>The updated client, or <see langword="null"/> when it does not exist.</returns>
        public static Client? UpdateClient(int id, Client updatedClient)
        {
            var clients = GetAll();

            var index = clients.FindIndex(c => c.ID == id);

            if (index == -1)
                return null;

            // We preserve the existing ID from the route so callers cannot accidentally re-key a customer.
            updatedClient.ID = id; // mantener ID

            clients[index] = updatedClient;

            SaveAll(clients);

            return updatedClient;
        }

        /// <summary>
        /// Deletes a client by identifier.
        /// </summary>
        /// <param name="id">Client identifier.</param>
        /// <returns><see langword="true"/> when the client was removed; otherwise, <see langword="false"/>.</returns>
        public static bool DeleteClient(int id)
        {
            var clients = GetAll();

            var client = clients.FirstOrDefault(c => c.ID == id);

            if (client == null)
                return false;

            clients.Remove(client);

            SaveAll(clients);

            return true;
        }

        private static void SaveAll(List<Client> clients)
        {
            // The indented JSON output helps when teammates need to inspect seed data by hand.
            var jsonData = JsonSerializer.Serialize(clients, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            File.WriteAllText(filePath, jsonData);
        }
    }
}
