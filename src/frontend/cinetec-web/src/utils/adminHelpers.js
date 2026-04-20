import { emptyFormBySection } from "../config/adminConfig";

/**
 * Calculates age from a birthdate string.
 *
 * @param {string} birthdate
 * @returns {number | ""}
 */
export function calculateAge(birthdate) {
  if (!birthdate) {
    return "";
  }

  const date = new Date(birthdate);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDifference = today.getMonth() - date.getMonth();
  const dayDifference = today.getDate() - date.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age -= 1;
  }

  return age;
}

/**
 * Calculates room capacities based on rows, columns, and capacity factor.
 *
 * @param {number | string} rows
 * @param {number | string} columns
 * @param {number | string} capacityFactor
 * @returns {{ total_capacity: number | "", max_capacity: number | "" }}
 */
export function calculateRoomCapacities(rows, columns, capacityFactor = 100) {
  const parsedRows = Number(rows);
  const parsedColumns = Number(columns);
  const parsedFactor = Number(capacityFactor);

  if (!parsedRows || !parsedColumns) {
    return { total_capacity: "", max_capacity: "" };
  }

  const totalCapacity = parsedRows * parsedColumns;
  const factor = Number.isFinite(parsedFactor) && parsedFactor > 0 ? parsedFactor : 100;

  return {
    total_capacity: totalCapacity,
    max_capacity: Math.round(totalCapacity * (factor / 100)),
  };
}

/**
 * Formats a projection datetime for the admin UI.
 *
 * @param {string} value
 * @returns {string}
 */
export function formatProjectionDateTime(value) {
  if (!value) {
    return "--";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

/**
 * Builds a short poster label when an actual image preview is unavailable.
 *
 * @param {{ commercialName?: string, originalName?: string }} movie
 * @returns {string}
 */
export function getPosterLabel(movie) {
  const source = movie.commercialName || movie.originalName || "MV";

  return source
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Converts a selected image file into a Data URL so it can be previewed and
 * sent to the backend as `imageURL`.
 *
 * @param {File} file
 * @returns {Promise<string>}
 */
export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("No se pudo leer la imagen seleccionada."));
    reader.readAsDataURL(file);
  });
}

/**
 * Converts a protagonist list into textarea-friendly text.
 *
 * @param {string[] | string | null | undefined} protagonists
 * @returns {string}
 */
export function formatProtagonistsInput(protagonists) {
  if (Array.isArray(protagonists)) {
    return protagonists.join(", ");
  }

  return String(protagonists ?? "");
}

/**
 * Parses a comma-separated protagonist input into the backend array format.
 *
 * @param {string} value
 * @returns {string[]}
 */
export function parseProtagonists(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * Produces a stable identifier per section.
 *
 * @param {string} sectionKey
 * @param {Record<string, unknown>} record
 * @returns {string | number}
 */
export function getRecordIdentifier(sectionKey, record) {
  switch (sectionKey) {
    case "clientes":
      return Number(record.ID);
    case "peliculas":
      return Number(record.movieID);
    case "sucursales":
      return String(record.name);
    case "salas":
      return `${record.Cinema_id}-${record.room_number}`;
    case "proyecciones":
      return `${record.Movie_id}-${record.room_number}-${record.datetime}`;
    default:
      return JSON.stringify(record);
  }
}

/**
 * Creates the initial form state for a section, optionally hydrating existing data.
 *
 * @param {string} sectionKey
 * @param {Record<string, Array<Record<string, unknown>>>} records
 * @param {Record<string, unknown> | null} [record]
 * @returns {Record<string, unknown>}
 */
export function createFormState(sectionKey, records, record = null) {
  const base = { ...emptyFormBySection[sectionKey] };

  if (sectionKey === "salas" && records.sucursales[0]) {
    base.Cinema_id = records.sucursales[0].name;
  }

  if (sectionKey === "proyecciones") {
    base.Movie_id = String(records.peliculas[0]?.movieID ?? "");
    base.room_number = String(records.salas[0]?.room_number ?? "");
  }

  if (!record) {
    if (sectionKey === "peliculas") {
      const nextMovieId = Math.max(0, ...records.peliculas.map((movie) => Number(movie.movieID) || 0)) + 1;
      base.movieID = nextMovieId;
    }

    if (sectionKey === "clientes") {
      const nextClientId = Math.max(0, ...records.clientes.map((client) => Number(client.ID) || 0)) + 1;
      base.ID = nextClientId;
    }

    return base;
  }

  if (sectionKey === "peliculas") {
    return {
      ...base,
      ...record,
      protagonists: formatProtagonistsInput(record.protagonists),
      imageFileName: "",
      imagePreviewURL: record.imageURL ?? "",
    };
  }

  return {
    ...base,
    ...record,
  };
}

/**
 * Coerces form state into storage-ready records for sections that remain local.
 *
 * @param {string} sectionKey
 * @param {Record<string, unknown>} formData
 * @returns {Record<string, unknown>}
 */
export function normalizeSectionRecord(sectionKey, formData) {
  switch (sectionKey) {
    case "clientes":
      return {
        ID: Number(formData.ID),
        email: String(formData.email ?? ""),
        password: String(formData.password ?? ""),
        birthdate: String(formData.birthdate ?? ""),
        age: Number(calculateAge(String(formData.birthdate ?? "")) || 0),
        Fname: String(formData.Fname ?? ""),
        Minit: String(formData.Minit ?? ""),
      };

    case "sucursales":
      return {
        name: String(formData.name ?? ""),
        number_of_rooms: Number(formData.number_of_rooms ?? 0),
        address: String(formData.address ?? ""),
        province: String(formData.province ?? ""),
      };

    case "salas": {
      const capacities = calculateRoomCapacities(
        formData.number_of_rows,
        formData.number_of_columns,
        formData.capacity_factor
      );

      return {
        Cinema_id: String(formData.Cinema_id ?? ""),
        room_number: Number(formData.room_number ?? 0),
        number_of_columns: Number(formData.number_of_columns ?? 0),
        number_of_rows: Number(formData.number_of_rows ?? 0),
        total_capacity: Number(capacities.total_capacity || 0),
        capacity_factor: Number(formData.capacity_factor ?? 100),
        max_capacity: Number(capacities.max_capacity || 0),
      };
    }

    case "proyecciones":
      return {
        Movie_id: String(formData.Movie_id ?? ""),
        room_number: Number(formData.room_number ?? 0),
        datetime: String(formData.datetime ?? ""),
      };

    default:
      return formData;
  }
}
