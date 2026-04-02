import { useState } from "react";
import "./admin.css";

export default function AdminMainPage() {
  const [section, setSection] = useState("dashboard");

  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <h2>CineTEC</h2>

        <button onClick={() => setSection("dashboard")}>Dashboard</button>
        <button onClick={() => setSection("clientes")}>Clientes</button>
        <button onClick={() => setSection("peliculas")}>Películas</button>
        <button onClick={() => setSection("sucursales")}>Sucursales</button>
        <button onClick={() => setSection("salas")}>Salas</button>
        <button onClick={() => setSection("proyecciones")}>Proyecciones</button>
      </div>

      {/* CONTENIDO */}
      <div className="admin-content">
        {section === "dashboard" && <h1>Bienvenido Admin</h1>}

        {section === "clientes" && <h1>Gestión de Clientes</h1>}

        {section === "peliculas" && <h1>Gestión de Películas</h1>}

        {section === "sucursales" && <h1>Gestión de Sucursales</h1>}

        {section === "salas" && <h1>Gestión de Salas</h1>}

        {section === "proyecciones" && <h1>Gestión de Proyecciones</h1>}
      </div>

    </div>
  );
}