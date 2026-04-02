import { useMemo, useState } from 'react';
import ClientNavbar from '../components/ClientNavbar';
import MovieCard from '../components/MovieCard';
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
    description:
      'A deep-space rescue mission picks up a transmission that should not exist.',
    cinemas: ['CineTEC Downtown', 'CineTEC Escazu'],
    sessions: ['4:15 PM', '7:20 PM', '10:10 PM'],
    posterTheme: {
      from: '#101827',
      to: '#4466F6',
      accent: '#9BD1FF',
    },
  },
  {
    id: 2,
    title: 'Velvet Heist',
    genre: 'Crime Drama',
    duration: '1h 56m',
    rating: 'R',
    format: '2D',
    description:
      'A retired getaway driver is pulled into one final museum robbery in Madrid.',
    cinemas: ['CineTEC Downtown', 'CineTEC Cartago'],
    sessions: ['3:40 PM', '6:30 PM', '9:35 PM'],
    posterTheme: {
      from: '#21140E',
      to: '#E69946',
      accent: '#FFD3A2',
    },
  },
  {
    id: 3,
    title: 'Sunset Avenue',
    genre: 'Romance',
    duration: '1h 48m',
    rating: 'PG',
    format: '2D',
    description:
      'Two strangers cross paths every summer on the same train platform.',
    cinemas: ['CineTEC Escazu', 'CineTEC Heredia'],
    sessions: ['2:15 PM', '5:10 PM', '8:00 PM'],
    posterTheme: {
      from: '#4B2239',
      to: '#F97316',
      accent: '#FDE68A',
    },
  },
  {
    id: 4,
    title: 'Last Kingdom',
    genre: 'Epic Fantasy',
    duration: '2h 24m',
    rating: 'PG-13',
    format: '3D',
    description:
      'Three rival heirs race to claim a throne before an ancient eclipse begins.',
    cinemas: ['CineTEC Downtown', 'CineTEC Heredia'],
    sessions: ['1:50 PM', '5:00 PM', '8:40 PM'],
    posterTheme: {
      from: '#1E1B4B',
      to: '#7C3AED',
      accent: '#C4B5FD',
    },
  },
  {
    id: 5,
    title: 'Static Hearts',
    genre: 'Music Drama',
    duration: '2h 02m',
    rating: 'PG-13',
    format: 'Dolby Atmos',
    description:
      'An underground band gets one shot at the stage that can change everything.',
    cinemas: ['CineTEC Cartago', 'CineTEC Escazu'],
    sessions: ['4:45 PM', '7:00 PM', '9:50 PM'],
    posterTheme: {
      from: '#172033',
      to: '#0EA5E9',
      accent: '#A5F3FC',
    },
  },
  {
    id: 6,
    title: 'Paper Tiger',
    genre: 'Action Comedy',
    duration: '1h 42m',
    rating: 'PG-13',
    format: '2D',
    description:
      'A timid accountant accidentally becomes the face of an international chase.',
    cinemas: ['CineTEC Heredia', 'CineTEC Downtown'],
    sessions: ['12:40 PM', '3:20 PM', '6:10 PM'],
    posterTheme: {
      from: '#3F1D1D',
      to: '#DC2626',
      accent: '#FCA5A5',
    },
  },
  {
    id: 7,
    title: 'Ocean Below',
    genre: 'Adventure',
    duration: '2h 12m',
    rating: 'PG',
    format: '3D',
    description:
      'A marine archaeology team dives beneath a storm front in search of a lost city.',
    cinemas: ['CineTEC Escazu', 'CineTEC Cartago'],
    sessions: ['1:10 PM', '4:30 PM', '7:40 PM'],
    posterTheme: {
      from: '#082F49',
      to: '#0284C7',
      accent: '#BAE6FD',
    },
  },
  {
    id: 8,
    title: 'Afterglow',
    genre: 'Mystery',
    duration: '1h 50m',
    rating: 'PG-13',
    format: '2D',
    description:
      'A photojournalist discovers the same unknown figure in decades of archived images.',
    cinemas: ['CineTEC Downtown', 'CineTEC Cartago', 'CineTEC Heredia'],
    sessions: ['2:50 PM', '6:00 PM', '8:55 PM'],
    posterTheme: {
      from: '#312E81',
      to: '#4466F6',
      accent: '#BFDBFE',
    },
  },
];

function clientMainPage() {
  const [selectedCinema, setSelectedCinema] = useState(cinemaOptions[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return movies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(normalizedSearch);
      const matchesCinema =
        selectedCinema === 'All cinemas' || movie.cinemas.includes(selectedCinema);

      return matchesSearch && matchesCinema;
    });
  }, [searchTerm, selectedCinema]);

  const featuredMovie = filteredMovies[0] ?? movies[0];

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

      <main className="container-fluid px-3 px-lg-4 pb-5">
        
        <section className="client-movie-section">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
            <div>
              <p className="client-kicker mb-2">Browse Movies</p>
              <h2 className="client-section-title mb-0">Find your next screening</h2>
            </div>
            <p className="client-results-copy mb-0">
              {filteredMovies.length} movie{filteredMovies.length === 1 ? '' : 's'} available
            </p>
          </div>

          <div className="row g-4">
            {filteredMovies.map((movie) => (
              <div className="col-sm-6 col-lg-4 col-xl-3" key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}

            {filteredMovies.length === 0 && (
              <div className="col-12">
                <div className="client-empty-state text-center">
                  <h3 className="mb-2">No movies match your search</h3>
                  <p className="mb-0">
                    Try another cinema or search term to explore more showtimes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default clientMainPage;
