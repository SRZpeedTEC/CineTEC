/**
 * Sidebar navigation entries for the admin workspace.
 *
 * @type {{ key: string, label: string, badge: string }[]}
 */
export const navigationItems = [
  { key: "clientes", label: "Clientes", badge: "CL" },
  { key: "peliculas", label: "Peliculas", badge: "PL" },
  { key: "sucursales", label: "Sucursales", badge: "SC" },
  { key: "salas", label: "Salas", badge: "SL" },
  { key: "proyecciones", label: "Proyecciones", badge: "PR" },
];

/**
 * Presentation metadata for each admin section.
 *
 * @type {Record<string, { title: string, subtitle: string, addLabel: string, columns: string[] }>}
 */
export const sectionMeta = {
  clientes: {
    title: "Gestion de Clientes",
    subtitle: "Informacion de clientes registrada en CineTEC.",
    addLabel: "Agregar cliente",
    columns: ["ID", "Email", "Password", "Birthdate", "Age", "Fname", "Minit"],
  },
  peliculas: {
    title: "Gestion de Peliculas",
    subtitle: "Peliculas disponibles en CineTEC.",
    addLabel: "Agregar pelicula",
    columns: [
      "Movie ID",
      "Original Name",
      "Commercial Name",
      "Image",
      "Duration",
      "Rating",
      "Director",
      "Protagonists",
    ],
  },
  sucursales: {
    title: "Gestion de Sucursales",
    subtitle: "Sucursales disponibles en CineTEC.",
    addLabel: "Agregar sucursal",
    columns: ["Name", "Number of Rooms", "Address", "Province"],
  },
  salas: {
    title: "Gestion de Salas",
    subtitle: "Salas disponibles en CineTEC.",
    addLabel: "Agregar sala",
    columns: [
      "Cinema ID",
      "Room Number",
      "Number of Columns",
      "Number of Rows",
      "Total Capacity",
      "Capacity Factor",
      "Max Capacity",
    ],
  },
  proyecciones: {
    title: "Gestion de Proyecciones",
    subtitle: "Proyecciones disponibles en CineTEC.",
    addLabel: "Agregar proyeccion",
    columns: ["Movie ID", "Room Number", "Datetime"],
  },
};

/**
 * Empty form blueprints per admin section.
 *
 * Keeping the initial state in one place makes it easier to add new sections
 * without hunting through component code for default values.
 *
 * @type {Record<string, Record<string, string>>}
 */
export const emptyFormBySection = {
  clientes: {
    ID: "",
    email: "",
    password: "",
    birthdate: "",
    age: "",
    Fname: "",
    Minit: "",
  },
  peliculas: {
    movieID: "",
    originalName: "",
    commercialName: "",
    imageURL: "",
    imageFileName: "",
    imagePreviewURL: "",
    duration: "",
    rating: "PG",
    director: "",
    protagonists: "",
  },
  sucursales: {
    name: "",
    number_of_rooms: "",
    address: "",
    province: "",
  },
  salas: {
    Cinema_id: "",
    room_number: "",
    number_of_columns: "",
    number_of_rows: "",
    total_capacity: "",
    capacity_factor: "100",
    max_capacity: "",
  },
  proyecciones: {
    Movie_id: "",
    room_number: "",
    datetime: "",
  },
};

/**
 * Allowed movie rating values shown in the admin form.
 *
 * @type {string[]}
 */
export const ratingOptions = ["G", "PG", "PG-13", "R", "NC-17"];
