import { apiRequest } from "./apiClient";

const MOVIES_ENDPOINT = "/movies";

const POSTER_THEMES = [
  { from: "#2C3140", to: "#4466F6", accent: "#9BD1FF" },
  { from: "#402E1F", to: "#E69946", accent: "#FFD3A2" },
  { from: "#1F2E28", to: "#2FA36B", accent: "#B3F4CF" },
  { from: "#391F3A", to: "#D063E6", accent: "#F0C7FF" },
];

/**
 * Normalizes a movie payload from API, mock data, or form state into the
 * frontend movie contract aligned with the backend model.
 *
 * @param {Record<string, unknown> | null | undefined} movie
 * @returns {{
 *   movieID: number,
 *   originalName: string,
 *   commercialName: string,
 *   imageURL: string,
 *   duration: string,
 *   rating: string,
 *   director: string,
 *   protagonists: string[],
 * }}
 */
export function normalizeMovie(movie) {
  const protagonistsValue = movie?.protagonists;
  const protagonists = Array.isArray(protagonistsValue)
    ? protagonistsValue.map((item) => String(item).trim()).filter(Boolean)
    : String(protagonistsValue ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  // This normalizer is intentionally forgiving because movies can originate from forms, API responses, or seed data.
  return {
    movieID: Number(movie?.movieID ?? movie?.MovieID ?? movie?.id ?? 0),
    originalName: String(movie?.originalName ?? movie?.Original_name ?? ""),
    commercialName: String(movie?.commercialName ?? movie?.Com_name ?? ""),
    imageURL: String(movie?.imageURL ?? movie?.image_url ?? ""),
    duration: String(movie?.duration ?? ""),
    rating: String(movie?.rating ?? ""),
    director: String(movie?.director ?? movie?.Director ?? ""),
    protagonists,
  };
}

/**
 * Converts a movie record into the exact payload expected by the .NET API.
 *
 * @param {Record<string, unknown>} movie
 * @returns {{
 *   movieID: number,
 *   originalName: string,
 *   commercialName: string,
 *   imageURL: string,
 *   duration: string,
 *   rating: string,
 *   director: string,
 *   protagonists: string[],
 * }}
 */
export function toMoviePayload(movie) {
  const normalizedMovie = normalizeMovie(movie);

  return {
    // The backend expects a numeric ID, so we coerce here instead of trusting raw form strings.
    ...normalizedMovie,
    movieID: Number.isFinite(normalizedMovie.movieID) ? normalizedMovie.movieID : 0,
  };
}

/**
 * Fetches every movie from the API.
 *
 * @returns {Promise<ReturnType<typeof normalizeMovie>[]>}
 */
export async function getMovies() {
  const data = await apiRequest(MOVIES_ENDPOINT);
  return Array.isArray(data) ? data.map(normalizeMovie) : [];
}

/**
 * Fetches one movie by its `movieID`.
 *
 * @param {number | string} movieID
 * @returns {Promise<ReturnType<typeof normalizeMovie>>}
 */
export async function getMovieById(movieID) {
  const data = await apiRequest(`${MOVIES_ENDPOINT}/${movieID}`);
  return normalizeMovie(data);
}

/**
 * Creates a new movie in the API.
 *
 * @param {Record<string, unknown>} movie
 * @returns {Promise<ReturnType<typeof normalizeMovie>>}
 */
export async function createMovie(movie) {
  const data = await apiRequest(MOVIES_ENDPOINT, {
    method: "POST",
    body: toMoviePayload(movie),
  });

  return normalizeMovie(data);
}

/**
 * Updates an existing movie in the API.
 *
 * @param {number | string} movieID
 * @param {Record<string, unknown>} movie
 * @returns {Promise<ReturnType<typeof normalizeMovie>>}
 */
export async function updateMovie(movieID, movie) {
  const data = await apiRequest(`${MOVIES_ENDPOINT}/${movieID}`, {
    method: "PUT",
    body: toMoviePayload(movie),
  });

  return normalizeMovie(data);
}

/**
 * Deletes one movie in the API.
 *
 * @param {number | string} movieID
 * @returns {Promise<void>}
 */
export async function deleteMovie(movieID) {
  await apiRequest(`${MOVIES_ENDPOINT}/${movieID}`, {
    method: "DELETE",
    parseJson: false,
  });
}

/**
 * Maps a backend movie record into the display model used by the client view.
 *
 * @param {Record<string, unknown>} movie
 * @param {number} index
 * @returns {{
 *   movieID: number,
 *   title: string,
 *   originalName: string,
 *   commercialName: string,
 *   subtitle: string,
 *   duration: string,
 *   rating: string,
 *   director: string,
 *   protagonists: string[],
 *   imageURL: string,
 *   posterTheme: { from: string, to: string, accent: string },
 * }}
 */
export function toClientMovieCard(movie, index = 0) {
  const normalizedMovie = normalizeMovie(movie);

  return {
    movieID: normalizedMovie.movieID,
    title: normalizedMovie.commercialName || normalizedMovie.originalName || `Movie ${index + 1}`,
    originalName: normalizedMovie.originalName,
    commercialName: normalizedMovie.commercialName,
    subtitle:
      normalizedMovie.commercialName &&
      normalizedMovie.originalName &&
      normalizedMovie.commercialName !== normalizedMovie.originalName
        ? normalizedMovie.originalName
        : normalizedMovie.director || "Sin director registrado",
    duration: normalizedMovie.duration || "Duracion pendiente",
    rating: normalizedMovie.rating || "Sin clasificacion",
    director: normalizedMovie.director || "Sin director registrado",
    protagonists: normalizedMovie.protagonists,
    imageURL: normalizedMovie.imageURL,
    // Rotating poster themes gives placeholder posters enough variety to feel intentional during incomplete datasets.
    posterTheme: POSTER_THEMES[index % POSTER_THEMES.length],
  };
}
