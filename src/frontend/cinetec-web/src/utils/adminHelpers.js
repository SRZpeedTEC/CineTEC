import { emptyFormBySection } from "../config/adminConfig";

export function calculateAge(birthdate) {
  if (!birthdate) return "";

  const parsedBirthdate = new Date(birthdate);
  if (Number.isNaN(parsedBirthdate.getTime())) return "";

  const today = new Date();
  let age = today.getFullYear() - parsedBirthdate.getFullYear();
  const monthDifference = today.getMonth() - parsedBirthdate.getMonth();
  const dayDifference = today.getDate() - parsedBirthdate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age -= 1;
  }

  return age;
}

export function calculateCapacity(rows, columns) {
  const numericRows = Number(rows);
  const numericColumns = Number(columns);

  if (!numericRows || !numericColumns) return "";

  return numericRows * numericColumns;
}

export function calculateMaxCapacity(totalCapacity, capacityFactor) {
  const numericTotalCapacity = Number(totalCapacity);
  const numericCapacityFactor = Number(capacityFactor);

  if (!numericTotalCapacity || !numericCapacityFactor) return "";

  return Math.floor(numericTotalCapacity * (numericCapacityFactor / 100));
}

export function formatProjectionDateTime(value) {
  if (!value) return "--";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function getPosterLabel(movie) {
  const source = movie.commercialName || movie.originalName || "MV";

  return source
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function getRecordKey(sectionKey, record) {
  switch (sectionKey) {
    case "clients":
      return String(record.ID);
    case "movies":
      return record.originalName;
    case "cinemas":
      return record.name;
    case "rooms":
      return `${record.Cinema_id}-${record.room_number}`;
    case "functions":
      return `${record.Movie_id}-${record.room_number}-${record.datetime}`;
    default:
      return "";
  }
}

export function createFormState(sectionKey, records, record = null) {
  const base = { ...emptyFormBySection[sectionKey] };

  if (sectionKey === "rooms") {
    base.Cinema_id = records.cinemas[0]?.name ?? records.rooms[0]?.Cinema_id ?? "";
  }

  if (sectionKey === "functions") {
    base.Movie_id = records.movies[0]?.originalName ?? records.functions[0]?.Movie_id ?? "";
    base.room_number = String(
      records.rooms[0]?.room_number ?? records.functions[0]?.room_number ?? ""
    );
  }

  if (!record) return base;

  switch (sectionKey) {
    case "clients":
      return {
        ...base,
        ...record,
        age: record.age ?? calculateAge(record.birthdate),
      };
    case "movies":
      return {
        ...base,
        ...record,
        protagonists: Array.isArray(record.protagonists)
          ? record.protagonists.join(", ")
          : record.protagonists ?? "",
      };
    case "cinemas":
      return {
        ...base,
        ...record,
        number_of_rooms: String(record.number_of_rooms ?? ""),
      };
    case "rooms":
      return {
        ...base,
        ...record,
        room_number: String(record.room_number ?? ""),
        number_of_columns: String(record.number_of_columns ?? ""),
        number_of_rows: String(record.number_of_rows ?? ""),
        total_capacity: String(record.total_capacity ?? ""),
        capacity_factor: String(record.capacity_factor ?? ""),
        max_capacity: String(record.max_capacity ?? ""),
      };
    case "functions":
      return {
        ...base,
        ...record,
        room_number: String(record.room_number ?? ""),
      };
    default:
      return {
        ...base,
        ...record,
      };
  }
}
