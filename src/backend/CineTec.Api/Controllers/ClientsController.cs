using Microsoft.AspNetCore.Mvc;
using CineTec.Api.Services;
using CineTec.Api.Models;

namespace CineTec.Api.Controllers
{
    /// <summary>
    /// Exposes CRUD endpoints for client management.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        /// <summary>
        /// Creates a new client.
        /// </summary>
        /// <param name="client">Client payload received from the client application.</param>
        /// <returns>The created client response.</returns>
        [HttpPost]
        public ActionResult<Client> CreateClient([FromBody] Client client)
        {
            if (string.IsNullOrWhiteSpace(client.email))
            {
                return BadRequest("Email is required");
            }

            var createdClient = ClientService.CreateClient(client);

            return CreatedAtAction(nameof(GetClient),
                new { id = createdClient.ID },
                createdClient);
        }

        /// <summary>
        /// Gets a client by identifier.
        /// </summary>
        /// <param name="id">Client identifier.</param>
        /// <returns>The matching client response.</returns>
        [HttpGet("{id}")]
        public ActionResult<Client> GetClient(int id)
        {
            var client = ClientService.GetClient(id);

            if (client == null)
            {
                return NotFound("Client not found");
            }

            return Ok(client);
        }

        /// <summary>
        /// Returns every client.
        /// </summary>
        /// <returns>A collection of clients.</returns>
        [HttpGet]
        public ActionResult<List<Client>> GetAll()
        {
            return Ok(ClientService.GetAllClients());
        }

        /// <summary>
        /// Updates an existing client.
        /// </summary>
        /// <param name="id">Client identifier.</param>
        /// <param name="client">Updated client payload.</param>
        /// <returns>The updated client response.</returns>
        [HttpPut("{id}")]
        public ActionResult<Client> UpdateClient(int id, [FromBody] Client client)
        {
            var updatedClient = ClientService.UpdateClient(id, client);

            if (updatedClient == null)
            {
                return NotFound("Client not found");
            }

            return Ok(updatedClient);
        }

        /// <summary>
        /// Deletes a client by identifier.
        /// </summary>
        /// <param name="id">Client identifier.</param>
        /// <returns>No content when the client is removed.</returns>
        [HttpDelete("{id}")]
        public IActionResult DeleteClient(int id)
        {
            var deleted = ClientService.DeleteClient(id);

            if (!deleted)
            {
                return NotFound("Client not found");
            }

            return NoContent();
        }
    }
}
