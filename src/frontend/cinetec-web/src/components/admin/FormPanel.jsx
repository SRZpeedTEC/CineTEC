import { ratingOptions, sectionMeta } from "../../config/adminConfig";

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
          <FormField label="Nombre completo">
            <input
              className="form-control admin-form-control"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Cedula">
            <input
              className="form-control admin-form-control"
              name="cedula"
              type="text"
              value={formData.cedula}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Telefono">
            <input
              className="form-control admin-form-control"
              name="telefono"
              type="tel"
              value={formData.telefono}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Fecha de nacimiento">
            <input
              className="form-control admin-form-control"
              name="fechaNacimiento"
              type="date"
              value={formData.fechaNacimiento}
              onChange={onChange}
            />
          </FormField>
          <FormField
            label="Edad"
            helper="Se calcula automaticamente al elegir la fecha de nacimiento."
          >
            <input
              className="form-control admin-form-control"
              name="edad"
              type="text"
              value={formData.edad}
              readOnly
            />
          </FormField>
        </>
      );

    case "peliculas":
      return (
        <>
          <FormField label="Nombre original">
            <input
              className="form-control admin-form-control"
              name="nombreOriginal"
              type="text"
              value={formData.nombreOriginal}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Nombre comercial">
            <input
              className="form-control admin-form-control"
              name="nombreComercial"
              type="text"
              value={formData.nombreComercial}
              onChange={onChange}
            />
          </FormField>
          <FormField label="URL de imagen">
            <input
              className="form-control admin-form-control"
              name="imagenUrl"
              type="url"
              value={formData.imagenUrl}
              onChange={onChange}
            />
          </FormField>
          <FormField
            label="Archivo de poster"
            helper={
              formData.imagenArchivo
                ? `Archivo seleccionado: ${formData.imagenArchivo}`
                : "Tambien puedes cargar una imagen local para pruebas."
            }
          >
            <input
              className="form-control admin-form-control"
              name="imagenArchivo"
              type="file"
              accept="image/*"
              onChange={onChange}
            />
          </FormField>
          <FormField label="Duracion">
            <input
              className="form-control admin-form-control"
              name="duracion"
              type="text"
              placeholder="120 min"
              value={formData.duracion}
              onChange={onChange}
            />
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
          <FormField label="Clasificacion">
            <select
              className="form-select admin-form-control"
              name="clasificacion"
              value={formData.clasificacion}
              onChange={onChange}
            >
              {ratingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Protagonistas">
            <textarea
              className="form-control admin-form-control admin-form-textarea"
              name="protagonistas"
              value={formData.protagonistas}
              onChange={onChange}
            />
          </FormField>
        </>
      );

    case "sucursales":
      return (
        <>
          <FormField label="Nombre del cine">
            <input
              className="form-control admin-form-control"
              name="nombreCine"
              type="text"
              value={formData.nombreCine}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Ubicacion">
            <input
              className="form-control admin-form-control"
              name="ubicacion"
              type="text"
              value={formData.ubicacion}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Cantidad de salas">
            <input
              className="form-control admin-form-control"
              name="cantidadSalas"
              type="number"
              min="0"
              value={formData.cantidadSalas}
              onChange={onChange}
            />
          </FormField>
        </>
      );

    case "salas":
      return (
        <>
          <FormField label="Identificador">
            <input
              className="form-control admin-form-control"
              name="identificador"
              type="text"
              value={formData.identificador}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Sucursal">
            <select
              className="form-select admin-form-control"
              name="nombreSucursal"
              value={formData.nombreSucursal}
              onChange={onChange}
            >
              {records.sucursales.map((branch) => (
                <option key={branch.id} value={branch.nombreCine}>
                  {branch.nombreCine}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Cantidad de filas">
            <input
              className="form-control admin-form-control"
              name="cantidadFilas"
              type="number"
              min="0"
              value={formData.cantidadFilas}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Columnas o espacios por fila">
            <input
              className="form-control admin-form-control"
              name="columnasEspacios"
              type="number"
              min="0"
              value={formData.columnasEspacios}
              onChange={onChange}
            />
          </FormField>
          <FormField
            label="Capacidad"
            helper="Se actualiza automaticamente segun filas y columnas."
          >
            <input
              className="form-control admin-form-control"
              name="capacidad"
              type="text"
              value={formData.capacidad}
              readOnly
            />
          </FormField>
        </>
      );

    case "proyecciones":
      return (
        <>
          <FormField label="Pelicula">
            <select
              className="form-select admin-form-control"
              name="pelicula"
              value={formData.pelicula}
              onChange={onChange}
            >
              {records.peliculas.map((movie) => (
                <option key={movie.id} value={movie.nombreComercial}>
                  {movie.nombreComercial}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Sala">
            <select
              className="form-select admin-form-control"
              name="sala"
              value={formData.sala}
              onChange={onChange}
            >
              {records.salas.map((room) => (
                <option key={room.id} value={room.identificador}>
                  {room.identificador}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Horario">
            <input
              className="form-control admin-form-control"
              name="horario"
              type="datetime-local"
              value={formData.horario}
              onChange={onChange}
            />
          </FormField>
        </>
      );

    default:
      return null;
  }
}

export default function FormPanel({
  sectionKey,
  mode,
  formData,
  records,
  onChange,
  onCancel,
  onSubmit,
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
          <div className="row g-3">
            {renderFields(sectionKey, formData, records, onChange)}
          </div>

          <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
            <button type="submit" className="btn admin-btn admin-btn-primary">
              {mode === "edit" ? "Guardar cambios" : "Guardar registro"}
            </button>
            <button
              type="button"
              className="btn admin-btn admin-btn-ghost"
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
