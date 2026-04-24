import { startTransition, useDeferredValue, useEffect, useMemo, useState } from "react";
import ClientNavbar from "../components/ClientNavbar";
import { resolveMoviePosterSource } from "../components/MovieCard";
import logo from "../assets/icons/CineTEC_Logo.png";
import { initialRecords } from "../mocks/adminMockData";
import { getMovies, toClientMovieCard } from "../services/movieService";
import { downloadReceiptFromApi } from "../services/purchaseService";
import { buildPurchaseSummary } from "../utils/ticketPdf";
import "./clientMainPage.css";

const mockRoom = { rows: 12, cols: 10 };

/**
 * Generates a deterministic seat map for the current prototype booking flow.
 *
 * @param {number} rows
 * @param {number} cols
 * @param {number} seed
 * @returns {{ id: string, row: number, col: number, occupied: boolean }[]}
 */
function generateSeats(rows, cols, seed) {
  const seats = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < cols; column += 1) {
      // A seeded pattern keeps the demo predictable, which makes UI testing much less frustrating.
      const id = `${String.fromCharCode(65 + row)}${column + 1}`;
      const hash = (seed * 31 + row * 17 + column * 7) % 100;
      seats.push({ id, row, col: column, occupied: hash < 30 });
    }
  }

  return seats;
}

const rowLabels = Array.from({ length: mockRoom.rows }, (_, index) =>
  String.fromCharCode(65 + index)
);

/**
 * Client-facing billboard page fed by the Movie API.
 *
 * @returns {JSX.Element}
 */
function ClientMainPage() {
  const cinemaOptions = useMemo(
    () => ["Todas las sedes", ...initialRecords.sucursales.map((cinema) => cinema.name)],
    []
  );
  const [movies, setMovies] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(cinemaOptions[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const [modalMovie, setModalMovie] = useState(null);
  const [bookingSession, setBookingSession] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const deferredSearchTerm = useDeferredValue(searchTerm);
  const isSearching = deferredSearchTerm.trim() !== "";

  useEffect(() => {
    let isMounted = true;

    async function loadMovies() {
      try {
        const apiMovies = await getMovies();

        if (!isMounted) {
          return;
        }

        startTransition(() => {
          setMovies(
            apiMovies.map((movie, index) => ({
              ...toClientMovieCard(movie, index),
              // Cinemas still come from local branch records until a dedicated cinema API is wired into this screen.
              cinemas: initialRecords.sucursales.map((cinema) => cinema.name),
            }))
          );
          setErrorMessage("");
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "No se pudo conectar con el API de peliculas."
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (movies.length === 0) {
      setHeroIndex(0);
      return;
    }

    // If the list shrinks after filtering or reloading, we clamp the hero index to avoid reading past the array.
    setHeroIndex((currentIndex) => Math.min(currentIndex, movies.length - 1));
  }, [movies]);

  useEffect(() => {
    if (isSearching || movies.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setHeroIndex((currentIndex) => (currentIndex + 1) % movies.length);
    }, 10000);

    return () => window.clearInterval(timer);
  }, [isSearching, movies]);

  const filteredMovies = useMemo(() => {
    const query = deferredSearchTerm.trim().toLowerCase();

    return movies.filter((movie) => {
      if (selectedCinema !== cinemaOptions[0] && !movie.cinemas.includes(selectedCinema)) {
        return false;
      }

      const searchableText = [
        movie.title,
        movie.subtitle,
        movie.director,
        movie.protagonists.join(" "),
        String(movie.movieID),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [deferredSearchTerm, movies, selectedCinema]);

  const heroMovie = filteredMovies[heroIndex] ?? movies[heroIndex] ?? null;

  function openModal(movie) {
    // Opening a new movie always resets booking state so seats from a previous selection do not leak across movies.
    setModalMovie(movie);
    setBookingSession(null);
    setSelectedSeats([]);
    setPurchaseMessage("");
  }

  function closeModal() {
    setModalMovie(null);
    setBookingSession(null);
    setSelectedSeats([]);
    setPurchaseMessage("");
  }

  function pickSession(session) {
    if (!modalMovie) {
      return;
    }

    setBookingSession(session);
    // The movie ID works as a stable seed, so each movie gets a repeatable seat pattern for demos.
    setSeats(generateSeats(mockRoom.rows, mockRoom.cols, modalMovie.movieID));
    setSelectedSeats([]);
    setPurchaseMessage("");
  }

  function toggleSeat(seat) {
    if (seat.occupied) {
      return;
    }

    setSelectedSeats((currentSelection) =>
      currentSelection.includes(seat.id)
        ? currentSelection.filter((seatId) => seatId !== seat.id)
        : [...currentSelection, seat.id]
    );
    setPurchaseMessage("");
  }

  async function confirmPurchase() {
    if (!modalMovie || !bookingSession || selectedSeats.length === 0) {
      return;
    }

    const summary = buildPurchaseSummary({
      cinema: selectedCinema,
      movie: modalMovie,
      seats: selectedSeats,
      session: bookingSession,
    });

    await downloadReceiptFromApi(summary);
    setPurchaseMessage(`Comprobante ${summary.purchaseCode} descargado desde el API .NET.`);
  }

  return (
    <div className="client-main-page">
      {/* Global navbar: filters and search stay available while the rest of the page reflows underneath. */}
      <ClientNavbar
        cinemas={cinemaOptions}
        logo={logo}
        onCinemaChange={setSelectedCinema}
        onSearchChange={setSearchTerm}
        searchValue={searchTerm}
        selectedCinema={selectedCinema}
      />

      {errorMessage ? <div className="client-api-alert">{errorMessage}</div> : null}

      {!isSearching && heroMovie ? (
        <section className="client-hero">
          <img
            alt={`${heroMovie.title} poster`}
            className="client-hero-poster"
            src={resolveMoviePosterSource(heroMovie)}
          />

          <div className="client-hero-info">
            <div className="client-hero-tags">
              <span className="client-tag client-tag-accent">{heroMovie.rating}</span>
              <span className="client-tag">{heroMovie.duration}</span>
              <span className="client-tag">ID {heroMovie.movieID}</span>
            </div>
            <h1 className="client-hero-title">{heroMovie.title}</h1>
            <p className="client-hero-genre">{heroMovie.subtitle}</p>
            <p className="client-hero-desc">
              Director: {heroMovie.director}
              <br />
              Protagonistas: {heroMovie.protagonists.join(", ") || "Pendientes"}
            </p>
            <p className="client-hero-cinemas">Solo en CineTEC</p>
            <button
              className="client-book-btn"
              onClick={() => openModal(heroMovie)}
              type="button"
            >
              Ver detalle
            </button>
            <div className="client-hero-dots">
              {movies.map((movie, index) => (
                <button
                  className={`client-hero-dot${movie.movieID === heroMovie.movieID ? " active" : ""}`}
                  key={movie.movieID}
                  onClick={() => setHeroIndex(index)}
                  type="button"
                />
              ))}
            </div>
          </div>

          {/* Side promo panel: this keeps concession items visible without mixing them into the movie metadata itself. */}
          <div className="client-hero-dulceria">
            <p className="client-dulceria-label">Dulcería</p>
            <ul className="client-dulceria-list">
              {[
                { emoji: '🍿', name: 'Palomitas grandes', price: '₡2.800' },
                { emoji: '🥤', name: 'Refresco mediano', price: '₡1.500' },
                { emoji: '🌮', name: 'Nachos con queso', price: '₡3.200' },
                { emoji: '🍬', name: 'Dulces surtidos', price: '₡1.200' },
                { emoji: '☕', name: 'Café americano', price: '₡1.800' },
              ].map((item) => (
                <li className="client-dulceria-item" key={item.name}>
                  <span className="client-dulceria-emoji">{item.emoji}</span>
                  <span className="client-dulceria-name">{item.name}</span>
                  <span className="client-dulceria-price">{item.price}</span>
                </li>
              ))}
            </ul>
            <button className="client-dulceria-btn" type="button">Ver menú completo</button>
          </div>
        </section>
      ) : null}

      <div className="client-billboard-wrap">
        <main className="client-billboard">
          <div className="client-billboard-header">
            <h2 className="client-billboard-title">Cartelera semanal</h2>
            <span className="client-billboard-count">
              {isLoading
                ? "Cargando..."
                : `${filteredMovies.length} pelicula${filteredMovies.length !== 1 ? "s" : ""}`}
            </span>
          </div>

          <div className="client-poster-grid">
            {filteredMovies.map((movie) => (
              <div className="client-poster-card" key={movie.movieID}>
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
                <button
                  className="client-showtimes-btn"
                  onClick={() => openModal(movie)}
                  type="button"
                >
                  Ver detalle
                </button>
              </div>
            ))}

            {!isLoading && filteredMovies.length === 0 ? (
              <div className="client-empty-state">
                <p>No hay peliculas disponibles con los filtros actuales.</p>
              </div>
            ) : null}
          </div>
        </main>
      </div>

      {modalMovie ? (
        <div className="client-modal-overlay" onClick={closeModal}>
          <div className="client-modal" onClick={(event) => event.stopPropagation()}>
            <button className="client-modal-close" onClick={closeModal} type="button">
              &#10005;
            </button>

            {!bookingSession ? (
              <>
                {/* Movie detail state: first step lets the user review the title before committing to a time. */}
                <img
                  alt={`${modalMovie.title} poster`}
                  className="client-modal-poster"
                  src={resolveMoviePosterSource(modalMovie)}
                />
                <div className="client-modal-info">
                  <div className="client-tags-row">
                    <span className="client-tag client-tag-accent">{modalMovie.rating}</span>
                    <span className="client-tag">{modalMovie.duration}</span>
                    <span className="client-tag">ID {modalMovie.movieID}</span>
                  </div>
                  <h2 className="client-modal-title">{modalMovie.title}</h2>
                  <p className="client-modal-genre">{modalMovie.subtitle}</p>
                  <p className="client-modal-desc">
                    Director: {modalMovie.director}
                    <br />
                    Protagonistas: {modalMovie.protagonists.join(", ") || "Pendientes"}
                  </p>
                  <p className="client-card-label">Seleccionar horario</p>
                  <div className="client-sessions-row">
                    {["2:00 PM", "5:15 PM", "8:30 PM"].map((session) => (
                      <button
                        className="client-session-btn"
                        key={session}
                        onClick={() => pickSession(session)}
                        type="button"
                      >
                        {session}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Seat selection lives in the same modal so users do not lose the context of the movie they picked. */}
                <div className="client-seats-view">
                  <div className="client-seats-header">
                    <button
                      className="client-seats-back"
                      onClick={() => {
                        setBookingSession(null);
                        setSelectedSeats([]);
                      }}
                      type="button"
                    >
                      &#8592; Volver
                    </button>
                    <div className="client-seats-title-block">
                      <span className="client-modal-title">{modalMovie.title}</span>
                      <span className="client-tag">{bookingSession}</span>
                    </div>
                  </div>

                  <div className="client-screen-wrap">
                    <div className="client-screen" />
                    <span className="client-screen-label">PANTALLA</span>
                  </div>

                  <div className="client-seat-grid">
                    <div className="client-seat-row">
                      <span className="client-row-label" />
                      {Array.from({ length: mockRoom.cols }, (_, column) => (
                        <span className="client-col-label" key={column}>
                          {column + 1}
                        </span>
                      ))}
                    </div>
                    {rowLabels.map((label, rowIndex) => (
                      <div className="client-seat-row" key={label}>
                        <span className="client-row-label">{label}</span>
                        {seats.filter((seat) => seat.row === rowIndex).map((seat) => (
                          <button
                            className={[
                              "client-seat",
                              seat.occupied ? "seat-occupied" : "",
                              selectedSeats.includes(seat.id) ? "seat-selected" : "",
                            ].join(" ")}
                            disabled={seat.occupied}
                            key={seat.id}
                            onClick={() => toggleSeat(seat)}
                            title={seat.id}
                            type="button"
                          />
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="client-seat-legend">
                    <span className="client-legend-item">
                      <span className="client-legend-box legend-available" /> Disponible
                    </span>
                    <span className="client-legend-item">
                      <span className="client-legend-box legend-occupied" /> Ocupado
                    </span>
                    <span className="client-legend-item">
                      <span className="client-legend-box legend-selected" /> Seleccionado
                    </span>
                  </div>

                  <div className="client-seats-footer">
                    <span className="client-seats-count">
                      {selectedSeats.length > 0
                        ? `${selectedSeats.length} asiento${selectedSeats.length > 1 ? "s" : ""}: ${selectedSeats.join(", ")}`
                        : "Ningun asiento seleccionado"}
                    </span>
                    <button
                      className="client-book-btn"
                      disabled={selectedSeats.length === 0}
                      onClick={confirmPurchase}
                      type="button"
                    >
                      Descargar PDF
                    </button>
                  </div>
                  {purchaseMessage ? (
                    <p className="client-purchase-message">{purchaseMessage}</p>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ClientMainPage;
