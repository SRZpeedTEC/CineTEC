import { useEffect, useMemo, useState } from 'react';
import ClientNavbar from '../components/ClientNavbar';
import { createPosterDataUri } from '../components/MovieCard';
import logo from '../assets/icons/CineTEC_Logo.png';
import './clientMainPage.css';

// This will be replaced by the cinemas from the database
const cinemaOptions = [
  'All cinemas',
  'CineTEC Downtown',
  'CineTEC Escazu',
  'CineTEC Cartago',
  'CineTEC Heredia',
];

// This will be replaced by the movies from the database
const movies = [
  {
    id: 1,
    title: 'Midnight Signal',
    genre: 'Sci-Fi Thriller',
    duration: '2h 08m',
    rating: 'PG-13',
    format: 'IMAX',
    room: 'Sala 1',
    description: 'A deep-space rescue mission picks up a transmission that should not exist.',
    cinemas: ['CineTEC Downtown', 'CineTEC Escazu'],
    sessions: ['4:15 PM', '7:20 PM', '10:10 PM'],
    posterTheme: { from: '#101827', to: '#4466F6', accent: '#9BD1FF' },
  },
  {
    id: 2,
    title: 'Velvet Heist',
    genre: 'Crime Drama',
    duration: '1h 56m',
    rating: 'R',
    format: '2D',
    room: 'Sala 3',
    description: 'A retired getaway driver is pulled into one final museum robbery in Madrid.',
    cinemas: ['CineTEC Downtown', 'CineTEC Cartago'],
    sessions: ['3:40 PM', '6:30 PM', '9:35 PM'],
    posterTheme: { from: '#21140E', to: '#E69946', accent: '#FFD3A2' },
  },
  {
    id: 3,
    title: 'Sunset Avenue',
    genre: 'Romance',
    duration: '1h 48m',
    rating: 'PG',
    format: '2D',
    room: 'Sala 2',
    description: 'Two strangers cross paths every summer on the same train platform.',
    cinemas: ['CineTEC Escazu', 'CineTEC Heredia'],
    sessions: ['2:15 PM', '5:10 PM', '8:00 PM'],
    posterTheme: { from: '#4B2239', to: '#F97316', accent: '#FDE68A' },
  },
  {
    id: 4,
    title: 'Last Kingdom',
    genre: 'Epic Fantasy',
    duration: '2h 24m',
    rating: 'PG-13',
    format: '3D',
    room: 'Sala 4',
    description: 'Three rival heirs race to claim a throne before an ancient eclipse begins.',
    cinemas: ['CineTEC Downtown', 'CineTEC Heredia'],
    sessions: ['1:50 PM', '5:00 PM', '8:40 PM'],
    posterTheme: { from: '#1E1B4B', to: '#7C3AED', accent: '#C4B5FD' },
  },
  {
    id: 5,
    title: 'Static Hearts',
    genre: 'Music Drama',
    duration: '2h 02m',
    rating: 'PG-13',
    format: 'Dolby Atmos',
    room: 'Sala 2',
    description: 'An underground band gets one shot at the stage that can change everything.',
    cinemas: ['CineTEC Cartago', 'CineTEC Escazu'],
    sessions: ['4:45 PM', '7:00 PM', '9:50 PM'],
    posterTheme: { from: '#172033', to: '#0EA5E9', accent: '#A5F3FC' },
  },
  {
    id: 6,
    title: 'Paper Tiger',
    genre: 'Action Comedy',
    duration: '1h 42m',
    rating: 'PG-13',
    format: '2D',
    room: 'Sala 1',
    description: 'A timid accountant accidentally becomes the face of an international chase.',
    cinemas: ['CineTEC Heredia', 'CineTEC Downtown'],
    sessions: ['12:40 PM', '3:20 PM', '6:10 PM'],
    posterTheme: { from: '#3F1D1D', to: '#DC2626', accent: '#FCA5A5' },
  },
  {
    id: 7,
    title: 'Ocean Below',
    genre: 'Adventure',
    duration: '2h 12m',
    rating: 'PG',
    format: '3D',
    room: 'Sala 5',
    description: 'A marine archaeology team dives beneath a storm front in search of a lost city.',
    cinemas: ['CineTEC Escazu', 'CineTEC Cartago'],
    sessions: ['1:10 PM', '4:30 PM', '7:40 PM'],
    posterTheme: { from: '#082F49', to: '#0284C7', accent: '#BAE6FD' },
  },
  {
    id: 8,
    title: 'Afterglow',
    genre: 'Mystery',
    duration: '1h 50m',
    rating: 'PG-13',
    format: '2D',
    room: 'Sala 3',
    description: 'A photojournalist discovers the same unknown figure in decades of archived images.',
    cinemas: ['CineTEC Downtown', 'CineTEC Cartago', 'CineTEC Heredia'],
    sessions: ['2:50 PM', '6:00 PM', '8:55 PM'],
    posterTheme: { from: '#312E81', to: '#4466F6', accent: '#BFDBFE' },
  },
];

// Mock room layout — will be replaced by API data from Room model
const mockRoom = { rows: 12, cols: 10 };

function generateSeats(rows, cols, seed) {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const id = `${String.fromCharCode(65 + r)}${c + 1}`;
      const hash = (seed * 31 + r * 17 + c * 7) % 100;
      seats.push({ id, row: r, col: c, occupied: hash < 30 });
    }
  }
  return seats;
}

const rowLabels = Array.from({ length: mockRoom.rows }, (_, i) =>
  String.fromCharCode(65 + i)
);


function clientMainPage() {
  const [selectedCinema, setSelectedCinema] = useState(cinemaOptions[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);
  const [modalMovie, setModalMovie] = useState(null);
  const [bookingSession, setBookingSession] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const isSearching = searchTerm.trim() !== '';

  const filteredMovies = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return movies.filter((m) => {
      const matchSearch = m.title.toLowerCase().includes(q);
      const matchCinema = selectedCinema === 'All cinemas' || m.cinemas.includes(selectedCinema);
      return matchSearch && matchCinema;
    });
  }, [searchTerm, selectedCinema]);

  // Auto-advance hero every 10 seconds
  useEffect(() => {
    if (isSearching || movies.length <= 1) return;
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % movies.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [isSearching, heroIndex]);

  const heroMovie = movies[heroIndex];

  const openModal = (m) => {
    setModalMovie(m);
    setBookingSession(null);
    setSelectedSeats([]);
  };

  const closeModal = () => {
    setModalMovie(null);
    setBookingSession(null);
    setSelectedSeats([]);
  };

  const pickSession = (session) => {
    setBookingSession(session);
    setSeats(generateSeats(mockRoom.rows, mockRoom.cols, modalMovie.id));
    setSelectedSeats([]);
  };

  const toggleSeat = (seat) => {
    if (seat.occupied) return;
    setSelectedSeats((prev) =>
      prev.includes(seat.id) ? prev.filter((id) => id !== seat.id) : [...prev, seat.id]
    );
  };

  return (
    <div className="client-main-page">
      <ClientNavbar
        cinemas={cinemaOptions}
        logo={logo}
        onCinemaChange={setSelectedCinema}
        onSearchChange={setSearchTerm}
        searchValue={searchTerm}
        selectedCinema={selectedCinema}
      />

      {/* Hero carousel — hidden while searching */}
      {!isSearching && (
        <section className="client-hero">
          <img
            alt={`${heroMovie.title} poster`}
            className="client-hero-poster"
            src={createPosterDataUri(heroMovie)}
          />

          {/* Movie info */}
          <div className="client-hero-info">
            <div className="client-hero-tags">
              <span className="client-tag client-tag-accent">{heroMovie.rating}</span>
              <span className="client-tag">{heroMovie.format}</span>
              <span className="client-tag">{heroMovie.room}</span>
            </div>
            <h1 className="client-hero-title">{heroMovie.title}</h1>
            <p className="client-hero-genre">{heroMovie.genre} &middot; {heroMovie.duration}</p>
            <p className="client-hero-desc">{heroMovie.description}</p>
            <p className="client-hero-cinemas">{heroMovie.cinemas.join(' · ')}</p>
            <button
              className="client-book-btn"
              onClick={() => openModal(heroMovie)}
              type="button"
            >
              Ver horarios
            </button>
            <div className="client-hero-dots">
              {movies.map((_, i) => (
                <button
                  className={`client-hero-dot${i === heroIndex ? ' active' : ''}`}
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  type="button"
                />
              ))}
            </div>
          </div>

          {/* Dulcería */}
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
      )}

      {/* Cartelera semanal */}
      <div className="client-billboard-wrap">
      <main className="client-billboard">
        <div className="client-billboard-header">
          <h2 className="client-billboard-title">Cartelera Semanal</h2>
          {isSearching && (
            <span className="client-billboard-count">
              {filteredMovies.length} resultado{filteredMovies.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="client-poster-grid">
          {filteredMovies.map((m) => (
            <div className="client-poster-card" key={m.id}>
              <div className="client-poster-img-wrap">
                <img
                  alt={`${m.title} poster`}
                  className="client-poster-img"
                  src={createPosterDataUri(m)}
                />
                <span className="client-format-badge">{m.format}</span>
              </div>
              <div className="client-poster-footer">
                <p className="client-poster-title">{m.title}</p>
                <span className="client-tag client-tag-accent">{m.rating}</span>
              </div>
              <button
                className="client-showtimes-btn"
                onClick={() => openModal(m)}
                type="button"
              >
                Ver horarios
              </button>
            </div>
          ))}

          {filteredMovies.length === 0 && (
            <div className="client-empty-state">
              <p>No hay películas disponibles.</p>
            </div>
          )}
        </div>
      </main>
      </div>

      {/* Modal */}
      {modalMovie && (
        <div className="client-modal-overlay" onClick={closeModal}>
          <div className="client-modal" onClick={(e) => e.stopPropagation()}>
            <button className="client-modal-close" onClick={closeModal} type="button">
              &#10005;
            </button>

            {/* Step 1: movie info + session picker */}
            {!bookingSession && (
              <>
                <img
                  alt={`${modalMovie.title} poster`}
                  className="client-modal-poster"
                  src={createPosterDataUri(modalMovie)}
                />
                <div className="client-modal-info">
                  <div className="client-tags-row">
                    <span className="client-tag client-tag-accent">{modalMovie.rating}</span>
                    <span className="client-tag">{modalMovie.duration}</span>
                    <span className="client-tag">{modalMovie.format}</span>
                    <span className="client-tag">{modalMovie.room}</span>
                  </div>
                  <h2 className="client-modal-title">{modalMovie.title}</h2>
                  <p className="client-modal-genre">{modalMovie.genre}</p>
                  <p className="client-modal-desc">{modalMovie.description}</p>
                  <p className="client-card-label">Seleccionar horario</p>
                  <div className="client-sessions-row">
                    {modalMovie.sessions.map((s) => (
                      <button
                        className="client-session-btn"
                        key={s}
                        onClick={() => pickSession(s)}
                        type="button"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Step 2: seat selection */}
            {bookingSession && (
              <div className="client-seats-view">
                <div className="client-seats-header">
                  <button
                    className="client-seats-back"
                    onClick={() => { setBookingSession(null); setSelectedSeats([]); }}
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
                    {Array.from({ length: mockRoom.cols }, (_, c) => (
                      <span className="client-col-label" key={c}>{c + 1}</span>
                    ))}
                  </div>
                  {rowLabels.map((label, r) => (
                    <div className="client-seat-row" key={label}>
                      <span className="client-row-label">{label}</span>
                      {seats.filter((s) => s.row === r).map((seat) => (
                        <button
                          className={[
                            'client-seat',
                            seat.occupied ? 'seat-occupied' : '',
                            selectedSeats.includes(seat.id) ? 'seat-selected' : '',
                          ].join(' ')}
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
                      ? `${selectedSeats.length} asiento${selectedSeats.length > 1 ? 's' : ''}: ${selectedSeats.join(', ')}`
                      : 'Ningún asiento seleccionado'}
                  </span>
                  <button
                    className="client-book-btn"
                    disabled={selectedSeats.length === 0}
                    type="button"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default clientMainPage;
