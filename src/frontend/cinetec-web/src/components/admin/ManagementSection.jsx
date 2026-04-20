import { sectionMeta } from "../../config/adminConfig";
import {
  formatProjectionDateTime,
  getPosterLabel,
  getRecordIdentifier,
} from "../../utils/adminHelpers";
import FormPanel from "./FormPanel";

function renderTableCells(sectionKey, row) {
  switch (sectionKey) {
    case "clientes":
      return (
        <>
          <td>{row.ID}</td>
          <td>{row.email}</td>
          <td>{row.password}</td>
          <td>{row.birthdate}</td>
          <td>{row.age}</td>
          <td>{row.Fname}</td>
          <td>{row.Minit}</td>
        </>
      );

    case "peliculas":
      return (
        <>
          <td>{row.movieID}</td>
          <td>{row.originalName}</td>
          <td>{row.commercialName}</td>
          <td>
            {row.imageURL ? (
              <div className="admin-poster-thumb admin-poster-thumb-image">
                <img src={row.imageURL} alt={row.commercialName || row.originalName} />
              </div>
            ) : (
              <div className="admin-poster-thumb">
                <span>{getPosterLabel(row)}</span>
              </div>
            )}
          </td>
          <td>{row.duration}</td>
          <td>
            <span className="admin-table-badge">{row.rating}</span>
          </td>
          <td>{row.director}</td>
          <td>{row.protagonists.join(", ")}</td>
        </>
      );

    case "sucursales":
      return (
        <>
          <td>{row.name}</td>
          <td>{row.number_of_rooms}</td>
          <td>{row.address}</td>
          <td>{row.province}</td>
        </>
      );

    case "salas":
      return (
        <>
          <td>{row.Cinema_id}</td>
          <td>{row.room_number}</td>
          <td>{row.number_of_columns}</td>
          <td>{row.number_of_rows}</td>
          <td>{row.total_capacity}</td>
          <td>{row.capacity_factor}</td>
          <td>{row.max_capacity}</td>
        </>
      );

    case "proyecciones":
      return (
        <>
          <td>{row.Movie_id}</td>
          <td>{row.room_number}</td>
          <td>{formatProjectionDateTime(row.datetime)}</td>
        </>
      );

    default:
      return null;
  }
}

/**
 * Shared management table + side-form layout for admin sections.
 *
 * @param {{
 *   sectionKey: string,
 *   records: Record<string, Array<Record<string, unknown>>>,
 *   panelState: { isOpen: boolean, sectionKey: string | null, mode: "add" | "edit" },
 *   formData: Record<string, unknown> | null,
 *   onOpenAdd: () => void,
 *   onOpenEdit: (record: Record<string, unknown>) => void,
 *   onDelete: (recordId: string | number) => Promise<void>,
 *   onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => Promise<void>,
 *   onCancel: () => void,
 *   onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
 *   movieSearchId?: string,
 *   movieSearchResult?: Record<string, unknown> | null,
 *   movieSearchError?: string,
 *   movieApiNotice?: { type: string, message: string },
 *   isMovieSearchLoading?: boolean,
 *   isMovieSubmitting?: boolean,
 *   onMovieSearchInputChange?: (value: string) => void,
 *   onMovieSearchSubmit?: () => Promise<void>,
 *   onMovieSearchReset?: () => void,
 * }} props
 * @returns {JSX.Element}
 */
export default function ManagementSection({
  sectionKey,
  records,
  panelState,
  formData,
  onOpenAdd,
  onOpenEdit,
  onDelete,
  onChange,
  onCancel,
  onSubmit,
  movieSearchId = "",
  movieSearchResult = null,
  movieSearchError = "",
  movieApiNotice = { type: "", message: "" },
  isMovieSearchLoading = false,
  isMovieSubmitting = false,
  onMovieSearchInputChange = () => {},
  onMovieSearchSubmit = async () => {},
  onMovieSearchReset = () => {},
}) {
  const meta = sectionMeta[sectionKey];
  const rows = records[sectionKey];
  const isFormOpen = panelState.isOpen && panelState.sectionKey === sectionKey;
  const visibleRows =
    sectionKey === "peliculas" && movieSearchResult ? [movieSearchResult] : rows;

  return (
    <section className="admin-section-panel">
      <div className={`admin-workspace ${isFormOpen ? "admin-workspace-split" : ""}`}>
        <div className="admin-workspace-main">
          <div className="card border-0 admin-table-card">
            <div className="card-body p-0">
              <div className="d-flex flex-column gap-3 px-4 py-4 border-bottom admin-table-header">
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                  <h2 className="admin-section-title mb-0">{meta.title}</h2>

                  <div className="d-flex flex-column flex-sm-row gap-2">
                    <button type="button" className="btn admin-btn admin-btn-ghost">
                      Exportar
                    </button>
                    <button
                      type="button"
                      className="btn admin-btn admin-btn-primary"
                      onClick={onOpenAdd}
                    >
                      {meta.addLabel}
                    </button>
                  </div>
                </div>

                {sectionKey === "peliculas" ? (
                  <div className="admin-search-row">
                    <div className="admin-search-group">
                      <input
                        className="admin-search-input"
                        type="search"
                        value={movieSearchId}
                        onChange={(event) => onMovieSearchInputChange(event.target.value)}
                        placeholder="Buscar pelicula por ID..."
                        inputMode="numeric"
                      />
                      <button
                        type="button"
                        className="admin-search-btn"
                        onClick={onMovieSearchSubmit}
                        disabled={isMovieSearchLoading}
                      >
                        {isMovieSearchLoading ? "Buscando..." : "Buscar"}
                      </button>
                      {movieSearchResult || movieSearchId ? (
                        <button
                          type="button"
                          className="btn admin-btn admin-btn-ghost"
                          onClick={onMovieSearchReset}
                        >
                          Limpiar
                        </button>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {movieApiNotice.message ? (
                  <div
                    className={`admin-alert ${
                      movieApiNotice.type === "error"
                        ? "admin-alert-error"
                        : "admin-alert-success"
                    } mb-0`}
                  >
                    {movieApiNotice.message}
                  </div>
                ) : null}

                {movieSearchError ? (
                  <div className="admin-alert admin-alert-error mb-0">{movieSearchError}</div>
                ) : null}
              </div>

              <div className="table-responsive">
                <table className="table table-dark align-middle mb-0 admin-data-table">
                  <thead>
                    <tr>
                      {meta.columns.map((column) => (
                        <th key={column} scope="col">
                          {column}
                        </th>
                      ))}
                      <th scope="col" className="text-end">
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {visibleRows.map((row) => {
                      const recordId = getRecordIdentifier(sectionKey, row);

                      return (
                        <tr key={recordId}>
                          {renderTableCells(sectionKey, row)}
                          <td className="text-end">
                            <div className="d-flex justify-content-end gap-2">
                              <button
                                type="button"
                                className="btn btn-sm admin-btn admin-btn-secondary"
                                onClick={() => onOpenEdit(row)}
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm admin-btn admin-btn-outline"
                                onClick={() => onDelete(recordId)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {visibleRows.length === 0 ? (
                      <tr>
                        <td colSpan={meta.columns.length + 1}>
                          <div className="admin-empty-state">
                            No hay registros disponibles para esta seccion.
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className={`admin-form-shell ${isFormOpen ? "open" : ""}`}>
          {isFormOpen ? (
            <FormPanel
              sectionKey={sectionKey}
              mode={panelState.mode}
              formData={formData}
              records={records}
              onChange={onChange}
              onCancel={onCancel}
              onSubmit={onSubmit}
              isSubmitting={sectionKey === "peliculas" ? isMovieSubmitting : false}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
