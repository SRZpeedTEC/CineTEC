const TICKET_PRICE = 3200;
const SERVICE_FEE = 500;
const TAX_RATE = 0.13;

export function buildPurchaseSummary({ movie, session, seats, cinema }) {
  const ticketSubtotal = seats.length * TICKET_PRICE;
  const tax = Math.round(ticketSubtotal * TAX_RATE);
  const total = ticketSubtotal + SERVICE_FEE + tax;
  const purchaseDate = new Date();
  const purchaseCode = `CT-${movie.movieID}-${purchaseDate.getTime().toString().slice(-6)}`;

  return {
    cinema: cinema === "Todas las sedes" ? "CineTEC Central" : cinema,
    movieTitle: movie.title,
    movieId: movie.movieID,
    rating: movie.rating,
    duration: movie.duration,
    session,
    seats,
    purchaseCode,
    purchaseDate,
    ticketSubtotal,
    serviceFee: SERVICE_FEE,
    tax,
    total,
  };
}
