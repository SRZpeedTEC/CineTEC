export const initialRecords = {
  clients: [
    {
      ID: 1,
      email: "edu@gmail.com",
      password: "12345",
      birthdate: "2000-06-15",
      age: 25,
      Fname: "Eduardo",
      Minit: "J",
    },
  ],
  movies: [
    {
      originalName: "Emoji Movie",
      commercialName: "La pelicula de los emojis ",
      imageURL: "https://m.media-amazon.com/images/I/51s8n9a2lRL._AC_.jpg",
      duration: "1h 26m",
      rating: "PG",
      director: "Vince Gilligan",
      protagonists: ["Smile face", "Shit emoji", "Marco Rivera"],
    },
  ],
  cinemas: [
    {
      name: "Cinepolis - Paseo Metropoli",
      address: "Paseito Metropolitanizado",
      province: "Cartago",
      number_of_rooms: 8,
    },
  ],
  rooms: [
    {
      Cinema_id: "Cinepolis - PaseoMetropoli",
      room_number: 1,
      number_of_columns: 10,
      number_of_rows: 12,
      total_capacity: 120,
      capacity_factor: 80,
      max_capacity: 96,
    },
  ],
  functions: [
    {
      Movie_id: "Inception",
      room_number: 1,
      datetime: "2026-04-02T18:30:00",
    },
  ],
};
