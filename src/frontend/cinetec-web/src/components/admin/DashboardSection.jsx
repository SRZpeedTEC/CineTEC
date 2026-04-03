export default function DashboardSection({
  metrics,
  projectionHighlights,
  onCreateProjection,
  onOpenCartelera,
}) {
  return (
    <section className="admin-dashboard">
      <div className="card border-0 admin-hero-card position-relative">
        <div className="card-body p-4 p-xl-5">
          <div className="row g-4 align-items-center">
            <div className="col-xl-7">
              <span className="admin-kicker">Panel central</span>
              <h1 className="admin-page-title mt-2 mb-3">
                Control operativo elegante para todo CineTEC.
              </h1>
              <p className="admin-page-copy mb-4">
                Supervisa clientes, peliculas, sucursales, salas y proyecciones desde una
                sola experiencia fluida.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3">
                <button
                  type="button"
                  className="btn admin-btn admin-btn-primary"
                  onClick={onCreateProjection}
                >
                  Crear nueva proyeccion
                </button>
                <button
                  type="button"
                  className="btn admin-btn admin-btn-ghost"
                  onClick={onOpenCartelera}
                >
                  Revisar cartelera
                </button>
              </div>
            </div>

            <div className="col-xl-5">
              <div className="admin-hero-sidecard">
                <div className="admin-hero-sidecard-top">
                  <span className="admin-inline-chip">Resumen visual</span>
                  <span className="admin-live-dot" />
                </div>
                <div className="admin-hero-sidecard-grid">
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className={`admin-metric-tile admin-metric-${metric.accent}`}
                    >
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-12 col-xxl-8">
          <div className="card border-0 admin-table-card h-100">
            <div className="card-body p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                  <h2 className="admin-card-title mb-1">Funciones destacadas del dia</h2>
                  <p className="admin-card-copy mb-0">
                    Monitorea visualmente los horarios y salas con mas movimiento.
                  </p>
                </div>
                <span className="admin-inline-chip admin-inline-chip-muted">Demo UI</span>
              </div>

              <div className="table-responsive">
                <table className="table table-dark align-middle mb-0 admin-data-table">
                  <thead>
                    <tr>
                      <th scope="col">Pelicula</th>
                      <th scope="col">Sala</th>
                      <th scope="col">Hora</th>
                      <th scope="col">Ocupacion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectionHighlights.map((item) => (
                      <tr key={`${item.movie}-${item.time}`}>
                        <td>{item.movie}</td>
                        <td>{item.room}</td>
                        <td>{item.time}</td>
                        <td>
                          <span className="admin-table-badge">{item.occupancy}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xxl-4">
          <div className="card border-0 admin-side-card h-100">
            <div className="card-body p-4">
              <h2 className="admin-card-title mb-3">Acceso rapido</h2>
              <div className="d-grid gap-3">
                <div className="admin-quick-action">
                  <span className="admin-quick-action-label">Clientes</span>
                  <strong>Actualizar base de datos de membresias</strong>
                </div>
                <div className="admin-quick-action">
                  <span className="admin-quick-action-label">Salas</span>
                  <strong>Revisar mantenimiento preventivo programado</strong>
                </div>
                <div className="admin-quick-action">
                  <span className="admin-quick-action-label">Sucursales</span>
                  <strong>Comparar capacidad instalada por complejo</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
