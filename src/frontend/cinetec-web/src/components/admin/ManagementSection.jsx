import { sectionMeta } from "../../config/adminConfig";
import {
  formatProjectionDateTime,
  getPosterLabel,
  getRecordKey,
} from "../../utils/adminHelpers";
import FormPanel from "./FormPanel";

function renderTableCells(sectionKey, row) {
  switch (sectionKey) {
    case "clients":
      return (
        <>
          <td>{row.ID}</td>
          <td>{row.email}</td>
          <td>{"*".repeat(row.password?.length ?? 0)}</td>
          <td>{row.birthdate}</td>
          <td>{row.age}</td>
          <td>{row.Fname}</td>
          <td>{row.Minit}</td>
        </>
      );

    case "movies":
      return (
        <>
          <td>{row.originalName}</td>
          <td>{row.commercialName}</td>
          <td>
            <div className="admin-poster-thumb">
              <span>{getPosterLabel(row)}</span>
            </div>
          </td>
          <td>{row.duration}</td>
          <td>{Array.isArray(row.protagonists) ? row.protagonists.join(", ") : row.protagonists}</td>
          <td>{row.director}</td>
          <td>
            <span className="admin-table-badge">{row.rating}</span>
          </td>
        </>
      );

    case "cinemas":
      return (
        <>
          <td>{row.name}</td>
          <td>{row.address}</td>
          <td>{row.province}</td>
          <td>{row.number_of_rooms}</td>
        </>
      );

    case "rooms":
      return (
        <>
          <td>{row.Cinema_id}</td>
          <td>{row.room_number}</td>
          <td>{row.number_of_columns}</td>
          <td>{row.number_of_rows}</td>
          <td>{row.total_capacity}</td>
          <td>{row.capacity_factor}%</td>
          <td>{row.max_capacity}</td>
        </>
      );

    case "functions":
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
}) {
  const meta = sectionMeta[sectionKey];
  const rows = records[sectionKey];
  const isFormOpen = panelState.isOpen && panelState.sectionKey === sectionKey;

  return (
    <section className="admin-section-panel">
      <div className={`admin-workspace ${isFormOpen ? "admin-workspace-split" : ""}`}>
        <div className="admin-workspace-main">
          <div className="admin-section-toolbar card border-0">
            <div className="card-body p-4">
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                <div>
                  <span className="admin-kicker">Management</span>
                  <h2 className="admin-section-title mb-2">{meta.title}</h2>
                  <p className="admin-section-copy mb-0">{meta.subtitle}</p>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-2">
                  <button type="button" className="btn admin-btn admin-btn-ghost">
                    Export
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
            </div>
          </div>

          <div className="card border-0 admin-table-card mt-4">
            <div className="card-body p-0">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 px-4 py-4 border-bottom admin-table-header">
                <div>
                  <h3 className="admin-card-title mb-1">{meta.title}</h3>
                  <p className="admin-card-copy mb-0">
                    Design view for browsing and editing locally aligned backend records.
                  </p>
                </div>

                <div className="admin-inline-stats">
                  <span className="admin-inline-chip">Records: {rows.length}</span>
                  <span className="admin-inline-chip admin-inline-chip-muted">UI demo</span>
                </div>
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
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((row) => {
                      const rowKey = getRecordKey(sectionKey, row);

                      return (
                        <tr key={rowKey}>
                          {renderTableCells(sectionKey, row)}
                          <td className="text-end">
                            <div className="d-flex justify-content-end gap-2">
                              <button
                                type="button"
                                className="btn btn-sm admin-btn admin-btn-secondary"
                                onClick={() => onOpenEdit(row)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm admin-btn admin-btn-outline"
                                onClick={() => onDelete(rowKey)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className={`admin-form-shell ${isFormOpen ? "open" : ""}`}>
          {isFormOpen && (
            <FormPanel
              sectionKey={sectionKey}
              mode={panelState.mode}
              formData={formData}
              onChange={onChange}
              onCancel={onCancel}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </div>
    </section>
  );
}
