import logo from "../assets/icons/CineTEC_Logo.png";
import "./admin.css";
import { navigationItems } from "../config/adminConfig";
import { useAdminMainPage } from "../hooks/useAdminMainPage";
import DashboardSection from "../components/admin/DashboardSection";
import ManagementSection from "../components/admin/ManagementSection";

export default function AdminMainPage() {
  const {
    activeTab,
    activeSection,
    records,
    panelState,
    formData,
    dashboardMetrics,
    projectionHighlights,
    openForm,
    closeForm,
    handleTabChange,
    handleFormChange,
    handleSubmit,
    handleDeleteRecord,
  } = useAdminMainPage();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-inner">
          <div className="admin-brand">
            <div className="admin-brand-logo">
              <img src={logo} alt="CineTEC Logo" />
            </div>
            <div>
              <p className="admin-brand-kicker mb-1">Cinema operations</p>
              <h2 className="admin-brand-title mb-0">CineTEC Admin</h2>
            </div>
          </div>

          <nav className="nav flex-column admin-nav">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`admin-nav-item ${activeTab === item.key ? "active" : ""}`}
                onClick={() => handleTabChange(item.key)}
              >
                <span className="admin-nav-badge">{item.badge}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <span className="admin-inline-chip">Modo administrador</span>
            <p className="mb-0">
              Panel visual con navegación interna rápida y formularios integrados.
            </p>
          </div>
        </div>
      </aside>

      <main className="admin-main-content">
        <div className="container-fluid px-3 px-lg-4 px-xxl-5 py-4 py-lg-5">
          <div className="admin-topbar mb-4">
            <div>
              <p className="admin-kicker mb-2">Administrador</p>
              <h1 className="admin-current-title mb-1">
                {activeTab === "dashboard" ? "Dashboard Ejecutivo" : activeSection.title}
              </h1>
              <p className="admin-current-copy mb-0">
                {activeTab === "dashboard"
                  ? "Vista general de rendimiento, cartelera y operaciones del sistema."
                  : activeSection.subtitle}
              </p>
            </div>

            <div className="admin-topbar-meta">
              <span className="admin-inline-chip">Jueves, 2 Abr 2026</span>
              <span className="admin-inline-chip admin-inline-chip-muted">Sesión activa</span>
            </div>
          </div>

          {activeTab === "dashboard" ? (
            <DashboardSection
              metrics={dashboardMetrics}
              projectionHighlights={projectionHighlights}
              onCreateProjection={() => openForm("proyecciones", "add")}
              onOpenCartelera={() => handleTabChange("peliculas")}
            />
          ) : (
            <ManagementSection
              sectionKey={activeTab}
              records={records}
              panelState={panelState}
              formData={formData}
              onOpenAdd={() => openForm(activeTab, "add")}
              onOpenEdit={(record) => openForm(activeTab, "edit", record)}
              onDelete={(recordId) => handleDeleteRecord(activeTab, recordId)}
              onChange={handleFormChange}
              onCancel={closeForm}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </main>
    </div>
  );
}