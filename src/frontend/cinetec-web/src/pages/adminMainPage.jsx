import logo from "../assets/icons/CineTEC_Logo.png";
import "./admin.css";
import { navigationItems } from "../config/adminConfig";
import { useAdminMainPage } from "../hooks/useAdminMainPage";
import ManagementSection from "../components/admin/ManagementSection";

export default function AdminMainPage() {
  const {
    activeTab,
    records,
    panelState,
    formData,
    movieSearchId,
    movieSearchResult,
    movieSearchError,
    movieApiNotice,
    isMovieSearchLoading,
    isMovieSubmitting,
    openForm,
    closeForm,
    handleTabChange,
    handleFormChange,
    handleSubmit,
    handleDeleteRecord,
    handleMovieSearchInputChange,
    handleMovieSearchSubmit,
    clearMovieSearch,
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
        </div>
      </aside>

      <main className="admin-main-content">
        <div className="container-fluid px-3 px-lg-4 px-xxl-5 py-4 py-lg-5">
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
            movieSearchId={movieSearchId}
            movieSearchResult={movieSearchResult}
            movieSearchError={movieSearchError}
            movieApiNotice={movieApiNotice}
            isMovieSearchLoading={isMovieSearchLoading}
            isMovieSubmitting={isMovieSubmitting}
            onMovieSearchInputChange={handleMovieSearchInputChange}
            onMovieSearchSubmit={handleMovieSearchSubmit}
            onMovieSearchReset={clearMovieSearch}
          />
        </div>
      </main>
    </div>
  );
}
