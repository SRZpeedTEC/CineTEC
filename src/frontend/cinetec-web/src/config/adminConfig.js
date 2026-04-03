export const navigationItems = [
  { key: "dashboard", label: "Dashboard", badge: "DS" },
  { key: "clientes", label: "Clientes", badge: "CL" },
  { key: "peliculas", label: "Películas", badge: "PL" },
  { key: "sucursales", label: "Sucursales", badge: "SC" },
  { key: "salas", label: "Salas", badge: "SL" },
  { key: "proyecciones", label: "Proyecciones", badge: "PR" },
];

export const sectionMeta = {
  clientes: {
    title: "Gestión de Clientes",
    subtitle: "Seguimiento de perfiles, datos personales y segmentación de audiencia.",
    addLabel: "Agregar cliente",
    columns: ["Nombre", "Cédula", "Teléfono", "Fecha de Nacimiento", "Edad"],
  },
  peliculas: {
    title: "Gestión de Películas",
    subtitle: "Catálogo comercial, assets promocionales y metadata operativa.",
    addLabel: "Agregar película",
    columns: [
      "Nombre Original",
      "Nombre Comercial",
      "Imagen",
      "Duración",
      "Protagonistas",
      "Director",
      "Clasificación",
    ],
  },
  sucursales: {
    title: "Gestión de Sucursales",
    subtitle: "Control unificado de complejos, cobertura y capacidad instalada.",
    addLabel: "Agregar sucursal",
    columns: ["Nombre del cine", "Ubicación", "Cantidad de Salas"],
  },
  salas: {
    title: "Gestión de Salas",
    subtitle: "Configuración física de espacios, distribución y capacidad operativa.",
    addLabel: "Agregar sala",
    columns: [
      "Identificador",
      "Nombre de la Sucursal",
      "Cantidad de Filas",
      "Columnas/Espacios",
      "Capacidad",
    ],
  },
  proyecciones: {
    title: "Gestión de Proyecciones",
    subtitle: "Programación de funciones, disponibilidad de salas y horarios clave.",
    addLabel: "Agregar proyección",
    columns: ["Película", "Sala", "Horario/Momento específico"],
  },
};

export const emptyFormBySection = {
  clientes: {
    nombre: "",
    cedula: "",
    telefono: "",
    fechaNacimiento: "",
    edad: "",
  },
  peliculas: {
    nombreOriginal: "",
    nombreComercial: "",
    imagenUrl: "",
    imagenFile: null,
    imagenArchivo: "",
    duracion: "",
    protagonistas: "",
    director: "",
    clasificacion: "PG",
  },
  sucursales: {
    nombreCine: "",
    ubicacion: "",
    cantidadSalas: "",
  },
  salas: {
    identificador: "",
    nombreSucursal: "",
    cantidadFilas: "",
    columnasEspacios: "",
    capacidad: "",
  },
  proyecciones: {
    pelicula: "",
    sala: "",
    horario: "",
  },
};

export const ratingOptions = ["G", "PG", "PG-13", "R", "NC-17"];