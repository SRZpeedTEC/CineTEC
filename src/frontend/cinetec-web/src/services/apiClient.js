const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

/**
 * Executes an HTTP request against the CineTEC API.
 *
 * @template T
 * @param {string} path
 * @param {{
 *   method?: string,
 *   body?: unknown,
 *   headers?: Record<string, string>,
 *   parseJson?: boolean,
 * }} [options]
 * @returns {Promise<T | null>}
 */
export async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    parseJson = true,
  } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      // We only send JSON headers when there is a body so GET requests stay lean and conventional.
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}.`);
  }

  if (!parseJson || response.status === 204) {
    return null;
  }

  // Reading as text first lets us safely handle empty JSON bodies from simple endpoints.
  const responseText = await response.text();
  return responseText ? JSON.parse(responseText) : null;
}

export { API_BASE_URL };
