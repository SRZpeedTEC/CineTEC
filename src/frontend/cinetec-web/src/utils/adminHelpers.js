import { emptyFormBySection } from "../config/adminConfig";

export function calculateAge(fechaNacimiento) {
  if (!fechaNacimiento) return "";

  const birthDate = new Date(fechaNacimiento);
  if (Number.isNaN(birthDate.getTime())) return "";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age -= 1;
  }

  return age;
}

export function calculateCapacity(filas, columnas) {
  const numericRows = Number(filas);
  const numericColumns = Number(columnas);

  if (!numericRows || !numericColumns) return "";

  return numericRows * numericColumns;
}

export function formatProjectionDateTime(value) {
  if (!value) return "--";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function getPosterLabel(movie) {
  const source = movie.nombreComercial || movie.nombreOriginal || "MV";

  return source
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function createFormState(sectionKey, records, record = null) {
  const base = { ...emptyFormBySection[sectionKey] };

  if (sectionKey === "salas" && records.sucursales[0]) {
    base.nombreSucursal = records.sucursales[0].nombreCine;
  }

  if (sectionKey === "proyecciones") {
    base.pelicula = records.peliculas[0]?.nombreComercial ?? "";
    base.sala = records.salas[0]?.identificador ?? "";
  }

  if (!record) return base;

  return {
    ...base,
    ...record,
    imagenFile: null,
    imagenArchivo: record.imagenArchivo ?? "",
  };
}