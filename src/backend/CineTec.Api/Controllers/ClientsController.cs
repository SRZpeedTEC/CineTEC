using Microsoft.AspNetCore.Mvc;
using CineTec.Api.Services;
using CineTec.Api.Models;

namespace CineTec.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        // POST: api/clients
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

        // GET: api/clients/{id}
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

        // GET: api/clients
        [HttpGet]
        public ActionResult<List<Client>> GetAll()
        {
            return Ok(ClientService.GetAllClients());
        }

        // PUT: api/clients/{id}
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

        // DELETE: api/clients/{id}
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