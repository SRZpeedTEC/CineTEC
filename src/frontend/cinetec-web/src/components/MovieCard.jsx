function createPosterDataUri(movie) {
  const posterSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 620">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${movie.posterTheme.from}" />
          <stop offset="100%" stop-color="${movie.posterTheme.to}" />
        </linearGradient>
      </defs>
      <rect width="420" height="620" fill="url(#bg)" rx="28" />
      <circle cx="330" cy="120" r="90" fill="${movie.posterTheme.accent}" fill-opacity="0.22" />
      <circle cx="110" cy="500" r="120" fill="${movie.posterTheme.accent}" fill-opacity="0.18" />
      <path d="M64 438C122 330 209 280 316 132" stroke="${movie.posterTheme.accent}" stroke-opacity="0.45" stroke-width="18" />
      <text x="42" y="106" fill="#F8F8F8" font-family="Arial, sans-serif" font-size="28" letter-spacing="5">CINETEC</text>
      <text x="42" y="470" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="48" font-weight="700">${movie.title}</text>
      <text x="42" y="520" fill="#F3F4F6" font-family="Arial, sans-serif" font-size="24">${movie.genre}</text>
      <text x="42" y="560" fill="${movie.posterTheme.accent}" font-family="Arial, sans-serif" font-size="24">${movie.format}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(posterSvg)}`;
}

function MovieCard({ movie }) {
  return (
    <article className="client-movie-card h-100">
      <div className="client-movie-poster-wrap">
        <img
          alt={`${movie.title} poster`}
          className="client-movie-poster"
          src={createPosterDataUri(movie)}
        />
        <span className="client-format-badge">{movie.format}</span>
      </div>

      <div className="client-movie-content">
        <div>
          <div className="d-flex flex-wrap gap-2 mb-2">
            <span className="client-meta-pill">{movie.rating}</span>
            <span className="client-meta-pill">{movie.duration}</span>
          </div>
          <h3 className="client-movie-title">{movie.title}</h3>
          <p className="client-movie-genre mb-2">{movie.genre}</p>
          <p className="client-movie-description mb-3">{movie.description}</p>
        </div>

        <div className="mt-auto">
          <p className="client-card-label mb-2">Showtimes</p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {movie.sessions.map((session) => (
              <span className="client-session-pill" key={session}>
                {session}
              </span>
            ))}
          </div>

          <button className="btn client-btn-primary w-100" type="button">
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
