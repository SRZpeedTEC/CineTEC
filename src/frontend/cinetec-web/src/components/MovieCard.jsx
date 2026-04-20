/**
 * Creates an inline SVG fallback when a movie does not have an `imageURL`.
 *
 * @param {{
 *   title?: string,
 *   subtitle?: string,
 *   posterTheme?: { from: string, to: string, accent: string },
 * }} movie
 * @returns {string}
 */
export function createPosterDataUri(movie) {
  const theme = movie.posterTheme ?? {
    from: "#2C3140",
    to: "#4466F6",
    accent: "#9BD1FF",
  };

  const posterSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 620">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${theme.from}" />
          <stop offset="100%" stop-color="${theme.to}" />
        </linearGradient>
      </defs>
      <rect width="420" height="620" fill="url(#bg)" rx="28" />
      <circle cx="330" cy="120" r="90" fill="${theme.accent}" fill-opacity="0.22" />
      <circle cx="110" cy="500" r="120" fill="${theme.accent}" fill-opacity="0.18" />
      <path d="M64 438C122 330 209 280 316 132" stroke="${theme.accent}" stroke-opacity="0.45" stroke-width="18" />
      <text x="42" y="106" fill="#F8F8F8" font-family="Arial, sans-serif" font-size="28" letter-spacing="5">CINETEC</text>
      <text x="42" y="470" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="44" font-weight="700">${movie.title ?? "Movie"}</text>
      <text x="42" y="520" fill="#F3F4F6" font-family="Arial, sans-serif" font-size="22">${movie.subtitle ?? "Now Showing"}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(posterSvg)}`;
}

/**
 * Returns the best poster source for a movie.
 *
 * @param {{ imageURL?: string }} movie
 * @returns {string}
 */
export function resolveMoviePosterSource(movie) {
  return movie.imageURL || createPosterDataUri(movie);
}

function MovieCard({ movie, onOpen }) {
  return (
    <button className="client-poster-card" type="button" onClick={() => onOpen(movie)}>
      <div className="client-poster-img-wrap">
        <img
          alt={`${movie.title} poster`}
          className="client-poster-img"
          src={resolveMoviePosterSource(movie)}
        />
        <span className="client-format-badge">ID {movie.movieID}</span>
      </div>
      <div className="client-poster-footer">
        <p className="client-poster-title">{movie.title}</p>
        <span className="client-tag client-tag-accent">{movie.rating}</span>
      </div>
    </button>
  );
}

export default MovieCard;
