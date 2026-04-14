import { useState } from "react";
import "./admin.css";

export default function AdminLogin({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    if (user === "admin" && pass === "1234") {
      onLogin();
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>CineTEC Admin</h2>
        <p>Iniciar sesión</p>

        <input
          placeholder="Usuario"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPass(e.target.value)}
        />

        <button onClick={handleLogin}>
          Ingresar
        </button>
      </div>
    </div>
  );
}