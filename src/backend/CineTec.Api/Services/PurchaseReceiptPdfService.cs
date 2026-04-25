using System.Globalization;
using System.Text;
using CineTec.Api.Models;

namespace CineTec.Api.Services;

/// <summary>
/// Builds a simple branded PDF receipt without external dependencies.
/// </summary>
public static class PurchaseReceiptPdfService
{
    private static readonly CultureInfo MoneyCulture = CultureInfo.GetCultureInfo("en-US");

    /// <summary>
    /// Creates the PDF bytes and download filename for a purchase receipt.
    /// </summary>
    /// <param name="request">Receipt data.</param>
    /// <returns>The PDF bytes and a suggested download filename.</returns>
    public static (byte[] Content, string FileName) CreateReceiptPdf(PurchaseReceiptRequest request)
    {
        var content = BuildContent(request);
        var pdf = BuildPdf(content);
        var safeTitle = SanitizeFileName(string.IsNullOrWhiteSpace(request.movieTitle) ? "cinetec" : request.movieTitle);
        var safeCode = SanitizeFileName(string.IsNullOrWhiteSpace(request.purchaseCode) ? "receipt" : request.purchaseCode);

        return (Encoding.ASCII.GetBytes(pdf), $"cinetec-{safeTitle}-{safeCode}.pdf");
    }

    private static string BuildContent(PurchaseReceiptRequest request)
    {
        var purchaseDate = request.purchaseDate == default ? DateTime.Now : request.purchaseDate;
        var dateText = purchaseDate.ToString("dd MMM yyyy HH:mm", CultureInfo.InvariantCulture);
        var seatText = request.seats.Count > 0 ? string.Join(", ", request.seats) : "N/A";
        var cinemaText = string.IsNullOrWhiteSpace(request.cinema) ? "CineTEC Central" : request.cinema;
        var titleText = string.IsNullOrWhiteSpace(request.movieTitle) ? "Funcion CineTEC" : request.movieTitle;
        var codeText = string.IsNullOrWhiteSpace(request.purchaseCode) ? $"CT-{request.movieId}-{purchaseDate:HHmmss}" : request.purchaseCode;

        return string.Join(
            "\n",
            Rect(0, 0, 612, 792, "0.98 0.98 0.98"),
            Rect(42, 64, 528, 664, "1 1 1", "0.82 0.82 0.82"),
            Rect(42, 650, 528, 78, "0.80 0 0"),
            Line("CineTEC", 66, 696, 26, "F2", "1 1 1"),
            Line("Comprobante de compra", 66, 674, 12, "F1", "1 1 1"),
            Line(codeText, 414, 696, 13, "F2", "1 1 1"),
            Line("Factura de servicios cinematograficos", 314, 674, 9, "F1", "1 1 1"),
            Rect(66, 594, 480, 34, "0.08 0.08 0.08"),
            Line(titleText, 84, 606, 17, "F2", "1 1 1"),
            Line($"ID pelicula {request.movieId}  |  {request.rating}  |  {request.duration}", 84, 578, 10, "F1", "0.28 0.28 0.28"),
            Line("Detalle de funcion", 66, 532, 13, "F2", "0.80 0 0"),
            Line("Sede", 66, 506, 9, "F2", "0.35 0.35 0.35"),
            Line(cinemaText, 66, 488, 12, "F1", "0 0 0"),
            Line("Horario", 246, 506, 9, "F2", "0.35 0.35 0.35"),
            Line(request.session, 246, 488, 12, "F1", "0 0 0"),
            Line("Fecha de compra", 396, 506, 9, "F2", "0.35 0.35 0.35"),
            Line(dateText, 396, 488, 12, "F1", "0 0 0"),
            Rect(66, 428, 480, 34, "0.94 0.94 0.94", "0.82 0.82 0.82"),
            Line($"Asientos: {seatText}", 84, 440, 13, "F2", "0 0 0"),
            Line("Resumen de pago", 66, 382, 13, "F2", "0.80 0 0"),
            Line($"{request.seats.Count} entrada(s)", 84, 354, 11, "F1", "0 0 0"),
            Line(FormatMoney(request.ticketSubtotal), 438, 354, 11, "F1", "0 0 0"),
            Line("Cargo de servicio", 84, 326, 11, "F1", "0 0 0"),
            Line(FormatMoney(request.serviceFee), 438, 326, 11, "F1", "0 0 0"),
            Line("IVA estimado", 84, 298, 11, "F1", "0 0 0"),
            Line(FormatMoney(request.tax), 438, 298, 11, "F1", "0 0 0"),
            Rect(66, 242, 480, 40, "0.80 0 0"),
            Line("Total", 84, 256, 15, "F2", "1 1 1"),
            Line(FormatMoney(request.total), 420, 256, 15, "F2", "1 1 1"),
            Line("Presenta este comprobante en boleteria para retirar tus entradas.", 66, 194, 10, "F1", "0.25 0.25 0.25"),
            Line("Gracias por elegir CineTEC.", 66, 174, 10, "F2", "0.25 0.25 0.25"),
            Line("www.cinetec.cr", 66, 112, 9, "F1", "0.45 0.45 0.45"));
    }

    private static string BuildPdf(string content)
    {
        var objects = new[]
        {
            "<< /Type /Catalog /Pages 2 0 R >>",
            "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
            "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>",
            $"<< /Length {content.Length} >>\nstream\n{content}\nendstream",
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
        };

        var builder = new StringBuilder("%PDF-1.4\n");
        var offsets = new List<int> { 0 };

        for (var index = 0; index < objects.Length; index += 1)
        {
            offsets.Add(builder.Length);
            builder.Append(index + 1).Append(" 0 obj\n").Append(objects[index]).Append("\nendobj\n");
        }

        var xrefOffset = builder.Length;
        builder.Append("xref\n0 ").Append(objects.Length + 1).Append('\n');
        builder.Append("0000000000 65535 f \n");

        foreach (var offset in offsets.Skip(1))
        {
            builder.Append(offset.ToString("0000000000", CultureInfo.InvariantCulture)).Append(" 00000 n \n");
        }

        builder.Append("trailer\n<< /Size ").Append(objects.Length + 1).Append(" /Root 1 0 R >>\n");
        builder.Append("startxref\n").Append(xrefOffset).Append("\n%%EOF");

        return builder.ToString();
    }

    private static string Line(string text, int x, int y, int size, string font, string color)
    {
        return $"BT /{font} {size} Tf {color} rg {x} {y} Td {PdfText(text)} Tj ET";
    }

    private static string Rect(int x, int y, int width, int height, string fillColor, string? strokeColor = null)
    {
        var fill = $"{fillColor} rg {x} {y} {width} {height} re f";
        var stroke = strokeColor is null ? string.Empty : $"{strokeColor} RG {x} {y} {width} {height} re S";
        return string.IsNullOrEmpty(stroke) ? fill : $"{fill}\n{stroke}";
    }

    private static string PdfText(string value)
    {
        var normalized = RemoveAccents(value)
            .Replace("\\", "\\\\", StringComparison.Ordinal)
            .Replace("(", "\\(", StringComparison.Ordinal)
            .Replace(")", "\\)", StringComparison.Ordinal);

        return $"({normalized})";
    }

    private static string RemoveAccents(string value)
    {
        var normalized = value.Normalize(NormalizationForm.FormD);
        var builder = new StringBuilder(normalized.Length);

        foreach (var character in normalized)
        {
            if (CharUnicodeInfo.GetUnicodeCategory(character) != UnicodeCategory.NonSpacingMark && character <= 126)
            {
                builder.Append(character);
            }
        }

        return builder.ToString().Normalize(NormalizationForm.FormC);
    }

    private static string FormatMoney(decimal value)
    {
        return $"CRC {value.ToString("N0", MoneyCulture)}";
    }

    private static string SanitizeFileName(string value)
    {
        var clean = RemoveAccents(value).ToLowerInvariant();
        var builder = new StringBuilder(clean.Length);

        foreach (var character in clean)
        {
            if (char.IsLetterOrDigit(character))
            {
                builder.Append(character);
            }
            else if (character == ' ' || character == '-' || character == '_')
            {
                builder.Append('-');
            }
        }

        return builder.ToString().Trim('-');
    }
}
