export const navigationItems = [
  { key: "dashboard", label: "Dashboard", badge: "DS" },
  { key: "clients", label: "Clients", badge: "CL" },
  { key: "movies", label: "Movies", badge: "MV" },
  { key: "cinemas", label: "Cinemas", badge: "CN" },
  { key: "rooms", label: "Rooms", badge: "RM" },
  { key: "functions", label: "Functions", badge: "FN" },
];

export const sectionMeta = {
  clients: {
    title: "Client Management",
    subtitle: "Manage account details, contact data, and client profile fields.",
    addLabel: "Add client",
    columns: ["ID", "Email", "Password", "Birthdate", "Age", "First Name", "Middle Initial"],
  },
  movies: {
    title: "Movie Management",
    subtitle: "Maintain the movie catalog, poster links, and core release metadata.",
    addLabel: "Add movie",
    columns: [
      "Original Name",
      "Commercial Name",
      "Poster",
      "Duration",
      "Protagonists",
      "Director",
      "Rating",
    ],
  },
  cinemas: {
    title: "Cinema Management",
    subtitle: "Track cinema names, locations, provinces, and room availability.",
    addLabel: "Add cinema",
    columns: ["Name", "Address", "Province", "Number of Rooms"],
  },
  rooms: {
    title: "Room Management",
    subtitle: "Configure room layout, capacity metrics, and cinema identifiers.",
    addLabel: "Add room",
    columns: [
      "Cinema ID",
      "Room Number",
      "Columns",
      "Rows",
      "Total Capacity",
      "Capacity Factor",
      "Max Capacity",
    ],
  },
  functions: {
    title: "Function Management",
    subtitle: "Schedule movie functions by room number and exact date and time.",
    addLabel: "Add function",
    columns: ["Movie ID", "Room Number", "Date and Time"],
  },
};

export const emptyFormBySection = {
  clients: {
    ID: "",
    email: "",
    password: "",
    birthdate: "",
    age: "",
    Fname: "",
    Minit: "",
  },
  movies: {
    originalName: "",
    commercialName: "",
    imageURL: "",
    duration: "",
    protagonists: "",
    director: "",
    rating: "PG",
  },
  cinemas: {
    name: "",
    address: "",
    province: "",
    number_of_rooms: "",
  },
  rooms: {
    Cinema_id: "",
    room_number: "",
    number_of_columns: "",
    number_of_rows: "",
    total_capacity: "",
    capacity_factor: "80",
    max_capacity: "",
  },
  functions: {
    Movie_id: "",
    room_number: "",
    datetime: "",
  },
};

export const ratingOptions = ["G", "PG", "PG-13", "R", "NC-17"];
