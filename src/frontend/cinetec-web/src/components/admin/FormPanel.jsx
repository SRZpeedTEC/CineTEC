import { ratingOptions, sectionMeta } from "../../config/adminConfig";
import { formatProtagonistsInput } from "../../utils/adminHelpers";

function FormField({ label, helper, children }) {
  return (
    <div className="col-12">
      <label className="admin-form-label d-block">
        <span className="d-block">{label}</span>
        {children}
      </label>
      {helper ? <p className="admin-field-helper mb-0 mt-2">{helper}</p> : null}
    </div>
  );
}

function renderFields(sectionKey, formData, records, onChange) {
  switch (sectionKey) {
    case "clientes":
      return (
        <>
          <FormField label="ID">
            <input
              className="form-control admin-form-control"
              name="ID"
              type="number"
              value={formData.ID}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Email">
            <input
              className="form-control admin-form-control"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Password">
            <input
              className="form-control admin-form-control"
              name="password"
              type="text"
              value={formData.password}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Birthdate">
            <input
              className="form-control admin-form-control"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Age" helper="Se calcula automaticamente al elegir el birthdate.">
            <input
              className="form-control admin-form-control"
              name="age"
              type="text"
              value={formData.age}
              readOnly
            />
          </FormField>
          <FormField label="Fname">
            <input
              className="form-control admin-form-control"
              name="Fname"
              type="text"
              value={formData.Fname}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Minit">
            <input
              className="form-control admin-form-control"
              name="Minit"
              type="text"
              maxLength="1"
              value={formData.Minit}
              onChange={onChange}
            />
          </FormField>
        </>
      );

    case "peliculas":
      return (
        <>
          <FormField label="Movie ID">
            <input
              className="form-control admin-form-control"
              name="movieID"
              type="number"
              min="1"
              value={formData.movieID}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Original Name">
            <input
              className="form-control admin-form-control"
              name="originalName"
              type="text"
              value={formData.originalName}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Commercial Name">
            <input
              className="form-control admin-form-control"
              name="commercialName"
              type="text"
              value={formData.commercialName}
              onChange={onChange}
            />
          </FormField>
          <FormField
            label="Movie Poster"
            helper={
              formData.imageFileName
                ? `Archivo seleccionado: ${formData.imageFileName}`
                : "Selecciona una imagen local y el sistema guardara el imageURL automaticamente."
            }
          >
            <input
              className="form-control admin-form-control"
              name="imageFile"
              type="file"
              accept="image/*"
              onChange={onChange}
            />
          </FormField>
          {formData.imageURL ? (
            <div className="col-12">
              <div className="admin-image-preview">
                <img
                  src={formData.imageURL}
                  alt={formData.commercialName || formData.originalName || "Poster preview"}
                />
              </div>
            </div>
          ) : null}
          <FormField label="Duration">
            <input
              className="form-control admin-form-control"
              name="duration"
              type="text"
              placeholder="120 min"
              value={formData.duration}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Rating">
            <select
              className="form-select admin-form-control"
              name="rating"
              value={formData.rating}
              onChange={onChange}
            >
              {ratingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Director">
            <input
              className="form-control admin-form-control"
              name="director"
              type="text"
              value={formData.director}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Protagonists" helper="Separalos con comas para generar el arreglo del backend.">
            <textarea
              className="form-control admin-form-control admin-form-textarea"
              name="protagonists"
              value={formatProtagonistsInput(formData.protagonists)}
              onChange={onChange}
            />
          </FormField>
        </>
      );

    case "sucursales":
      return (
        <>
          <FormField label="Name">
            <input
              className="form-control admin-form-control"
              name="name"
              type="text"
              value={formData.name}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Number of Rooms">
            <input
              className="form-control admin-form-control"
              name="number_of_rooms"
              type="number"
              min="0"
              value={formData.number_of_rooms}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Address">
            <input
              className="form-control admin-form-control"
              name="address"
              type="text"
              value={formData.address}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Province">
            <input
              className="form-control admin-form-control"
              name="province"
              type="text"
              value={formData.province}
              onChange={onChange}
            />
          </FormField>
        </>
      );

    case "salas":
      return (
        <>
          <FormField label="Cinema ID">
            <select
              className="form-select admin-form-control"
              name="Cinema_id"
              value={formData.Cinema_id}
              onChange={onChange}
            >
              {records.sucursales.map((cinema) => (
                <option key={cinema.name} value={cinema.name}>
                  {cinema.name}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Room Number">
            <input
              className="form-control admin-form-control"
              name="room_number"
              type="number"
              min="0"
              value={formData.room_number}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Number of Columns">
            <input
              className="form-control admin-form-control"
              name="number_of_columns"
              type="number"
              min="0"
              value={formData.number_of_columns}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Number of Rows">
            <input
              className="form-control admin-form-control"
              name="number_of_rows"
              type="number"
              min="0"
              value={formData.number_of_rows}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Capacity Factor">
            <input
              className="form-control admin-form-control"
              name="capacity_factor"
              type="number"
              min="1"
              value={formData.capacity_factor}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Total Capacity" helper="Se calcula automaticamente con filas y columnas.">
            <input
              className="form-control admin-form-control"
              name="total_capacity"
              type="text"
              value={formData.total_capacity}
              readOnly
            />
          </FormField>
          <FormField label="Max Capacity" helper="Usa el capacity factor para calcular la capacidad operativa.">
            <input
              className="form-control admin-form-control"
              name="max_capacity"
              type="text"
              value={formData.max_capacity}
              readOnly
            />
          </FormField>
        </>
      );

    case "proyecciones":
      return (
        <>
          <FormField label="Movie ID">
            <select
              className="form-select admin-form-control"
              name="Movie_id"
              value={formData.Movie_id}
              onChange={onChange}
            >
              {records.peliculas.map((movie) => (
                <option key={movie.movieID} value={movie.movieID}>
                  {movie.movieID} - {movie.commercialName || movie.originalName}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Room Number">
            <select
              className="form-select admin-form-control"
              name="room_number"
              value={formData.room_number}
              onChange={onChange}
            >
              {records.salas.map((room) => (
                <option
                  key={`${room.Cinema_id}-${room.room_number}`}
                  value={room.room_number}
                >
                  {room.Cinema_id} - Sala {room.room_number}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Datetime">
            <input
              className="form-control admin-form-control"
              name="datetime"
              type="datetime-local"
              value={formData.datetime}
              onChange={onChange}
            />
          </FormField>
        </>
      );

    default:
      return null;
  }
}

/**
 * Side panel form used by the admin workspace.
 *
 * @param {{
 *   sectionKey: string,
 *   mode: "add" | "edit",
 *   formData: Record<string, unknown> | null,
 *   records: Record<string, Array<Record<string, unknown>>>,
 *   onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => Promise<void>,
 *   onCancel: () => void,
 *   onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
 *   isSubmitting?: boolean,
 * }} props
 * @returns {JSX.Element | null}
 */
export default function FormPanel({
  sectionKey,
  mode,
  formData,
  records,
  onChange,
  onCancel,
  onSubmit,
  isSubmitting = false,
}) {
  const meta = sectionMeta[sectionKey];

  if (!meta || !formData) {
    return null;
  }

  return (
    <div className="admin-form-panel card border-0">
      <div className="card-body p-4">
        <div className="admin-alert admin-alert-info">
          {mode === "edit"
            ? `Editando registro de ${meta.title.toLowerCase()}.`
            : `Preparando un nuevo registro para ${meta.title.toLowerCase()}.`}
        </div>

        <div className="mb-4">
          <span className="admin-kicker">Formulario</span>
          <h3 className="admin-section-title mb-2">
            {mode === "edit" ? "Editar registro" : meta.addLabel}
          </h3>
          <p className="admin-section-copy mb-0">{meta.subtitle}</p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="row g-3">{renderFields(sectionKey, formData, records, onChange)}</div>

          <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
            <button
              type="submit"
              className="btn admin-btn admin-btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Guardando..."
                : mode === "edit"
                  ? "Guardar cambios"
                  : "Guardar registro"}
            </button>
            <button
              type="button"
              className="btn admin-btn admin-btn-ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
