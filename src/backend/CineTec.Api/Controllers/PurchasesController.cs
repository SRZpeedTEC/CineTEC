using CineTec.Api.Models;
using CineTec.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CineTec.Api.Controllers;

/// <summary>
/// Exposes purchase endpoints for ticket receipt generation.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class PurchasesController : ControllerBase
{
    /// <summary>
    /// Generates a PDF receipt for a prototype purchase.
    /// </summary>
    /// <param name="request">Purchase data used to render the receipt.</param>
    /// <returns>A PDF file download.</returns>
    [HttpPost("receipt")]
    public IActionResult CreateReceipt([FromBody] PurchaseReceiptRequest request)
    {
        if (request.movieId <= 0)
        {
            return BadRequest("movieId is required.");
        }

        if (string.IsNullOrWhiteSpace(request.movieTitle))
        {
            return BadRequest("movieTitle is required.");
        }

        if (string.IsNullOrWhiteSpace(request.session))
        {
            return BadRequest("session is required.");
        }

        if (request.seats.Count == 0)
        {
            return BadRequest("At least one seat is required.");
        }

        var receipt = PurchaseReceiptPdfService.CreateReceiptPdf(request);

        return File(receipt.Content, "application/pdf", receipt.FileName);
    }
}
