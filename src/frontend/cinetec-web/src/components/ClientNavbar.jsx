function ClientNavbar({
  logo,
  cinemas,
  selectedCinema,
  onCinemaChange,
  searchValue,
  onSearchChange,
}) {
  return (
    <header className="client-navbar-wrap">
      <nav className="client-navbar">
        <img alt="CineTEC logo" className="client-brand-logo" src={logo} />

        <div className="client-navbar-controls">
          <select
            className="client-select"
            id="cinema-select"
            onChange={(event) => onCinemaChange(event.target.value)}
            value={selectedCinema}
          >
            {cinemas.map((cinema) => (
              <option key={cinema} value={cinema}>
                {cinema}
              </option>
            ))}
          </select>

          <input
            className="client-search-input"
            id="movie-search"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar peliculas..."
            type="search"
            value={searchValue}
          />

          <button className="client-login-btn" type="button">Login</button>
        </div>
      </nav>
    </header>
  );
}

export default ClientNavbar;
