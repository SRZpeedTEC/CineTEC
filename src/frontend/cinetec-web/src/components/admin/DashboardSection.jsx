export default function DashboardSection({
  metrics,
  projectionHighlights,
  onCreateFunction,
  onOpenMovies,
}) {
  return (
    <section className="admin-dashboard">
      <div className="card border-0 admin-hero-card position-relative">
        <div className="card-body p-4 p-xl-5">
          <div className="row g-4 align-items-center">
            <div className="col-xl-7">
              <span className="admin-kicker">Main panel</span>
              <h1 className="admin-page-title mt-2 mb-3">
                Clean operational control for the full CineTEC admin flow.
              </h1>
              <p className="admin-page-copy mb-4">
                Review clients, movies, cinemas, rooms, and functions from one
                consistent workspace.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3">
                <button
                  type="button"
                  className="btn admin-btn admin-btn-primary"
                  onClick={onCreateFunction}
                >
                  Create new function
                </button>
                <button
                  type="button"
                  className="btn admin-btn admin-btn-ghost"
                  onClick={onOpenMovies}
                >
                  Review movie catalog
                </button>
              </div>
            </div>

            <div className="col-xl-5">
              <div className="admin-hero-sidecard">
                <div className="admin-hero-sidecard-top">
                  <span className="admin-inline-chip">Visual summary</span>
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
                  <h2 className="admin-card-title mb-1">Highlighted functions</h2>
                  <p className="admin-card-copy mb-0">
                    Quickly monitor the busiest function times and room assignments.
                  </p>
                </div>
                <span className="admin-inline-chip admin-inline-chip-muted">UI demo</span>
              </div>

              <div className="table-responsive">
                <table className="table table-dark align-middle mb-0 admin-data-table">
                  <thead>
                    <tr>
                      <th scope="col">Movie</th>
                      <th scope="col">Room</th>
                      <th scope="col">Time</th>
                      <th scope="col">Occupancy</th>
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
              <h2 className="admin-card-title mb-3">Quick access</h2>
              <div className="d-grid gap-3">
                <div className="admin-quick-action">
                  <span className="admin-quick-action-label">Clients</span>
                  <strong>Review credentials and profile records</strong>
                </div>
                <div className="admin-quick-action">
                  <span className="admin-quick-action-label">Rooms</span>
                  <strong>Validate capacity values before syncing with the API</strong>
                </div>
                <div className="admin-quick-action">
                  <span className="admin-quick-action-label">Functions</span>
                  <strong>Compare movie IDs and room numbers across schedules</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
