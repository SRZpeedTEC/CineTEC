import { API_BASE_URL } from "./apiClient";

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function extractFilename(contentDisposition) {
  const match = /filename="?([^"]+)"?/i.exec(contentDisposition ?? "");
  return match?.[1] ?? "cinetec-recibo.pdf";
}

export async function downloadReceiptFromApi(payload) {
  const response = await fetch(`${API_BASE_URL}/purchases/receipt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "No se pudo generar el PDF desde el API.");
  }

  const blob = await response.blob();
  const filename = extractFilename(response.headers.get("Content-Disposition"));
  downloadBlob(blob, filename);
}
