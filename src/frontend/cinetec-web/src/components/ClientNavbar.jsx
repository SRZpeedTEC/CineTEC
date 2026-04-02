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
      <div className="container-fluid px-3 px-lg-4">
        <nav className="client-navbar">
          <div className="client-brand">
            <img alt="CineTEC logo" className="client-brand-logo" src={logo} />
          </div>

          <div className="client-navbar-controls">
            <div className="client-control-group">
              <label className="client-control-label" htmlFor="cinema-select">
                Cinema
              </label>
              <select
                className="form-select client-select"
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
            </div>

            <div className="client-control-group client-search-group">
              <label className="client-control-label" htmlFor="movie-search">
                Search
              </label>
              <input
                className="form-control client-search-input"
                id="movie-search"
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search movies"
                type="search"
                value={searchValue}
              />
            </div>

            <button className="btn client-btn-secondary client-login-button" type="button">
              Login
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default ClientNavbar;
