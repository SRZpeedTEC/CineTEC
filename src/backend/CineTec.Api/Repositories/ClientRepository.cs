using System.Text.Json;
using CineTec.Api.Models;

namespace CineTec.Api.Repositories
{
    public static class ClientRepository
    {
        private static readonly string filePath =
            Path.Combine(Directory.GetCurrentDirectory(), "dataBase", "clients.json");

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

        public static Client AddClient(Client client)
        {
            var clients = GetAll();

            client.ID = clients.Count > 0 ? clients.Max(c => c.ID) + 1 : 1;

            clients.Add(client);

            SaveAll(clients);

            return client;
        }

        public static Client? GetById(int id)
        {
            return GetAll().FirstOrDefault(c => c.ID == id);
        }

        public static Client? GetByEmail(string email)
        {
            return GetAll().FirstOrDefault(c => c.email == email);
        }

        public static Client? UpdateClient(int id, Client updatedClient)
        {
            var clients = GetAll();

            var index = clients.FindIndex(c => c.ID == id);

            if (index == -1)
                return null;

            updatedClient.ID = id; // mantener ID

            clients[index] = updatedClient;

            SaveAll(clients);

            return updatedClient;
        }

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
            var jsonData = JsonSerializer.Serialize(clients, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            File.WriteAllText(filePath, jsonData);
        }
    }
}