export function createPosterDataUri(movie) {
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

function MovieCard({ movie, index, total, onPrev, onNext, onBookNow }) {
  return (
    <div className="client-feature">

      {/* Left arrow */}
      <button className="client-arrow-btn client-arrow-left" onClick={onPrev} type="button">
        &#8592;
      </button>

      {/* Center: poster + title + book */}
      <div className="client-feature-center">
        <div className="client-feature-poster">
          <img
            alt={`${movie.title} poster`}
            className="client-feature-img"
            src={createPosterDataUri(movie)}
          />
          <span className="client-format-badge">{movie.format}</span>
        </div>

        <div className="client-feature-info">
          <h2 className="client-feature-title">{movie.title}</h2>
          <button className="client-book-btn" onClick={onBookNow} type="button">
            Book Now
          </button>
        </div>
      </div>

      {/* Right arrow */}
      <button className="client-arrow-btn client-arrow-right" onClick={onNext} type="button">
        &#8594;
      </button>

      {/* Counter */}
      <span className="client-counter">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>

    </div>
  );
}

export default MovieCard;
