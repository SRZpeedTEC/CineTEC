import { useState } from "react";
import "./admin.css";

/**
 * Renders the lightweight admin login gate used by the current frontend.
 *
 * @param {{ onLogin: () => void }} props
 * @returns {JSX.Element}
 */
export default function AdminLogin({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    // These local credentials are only a temporary front-end gate until a real auth flow is connected.
    if (user === "admin" && pass === "1234") {
      onLogin();
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="admin-login-container">
      {/* Centered card keeps this transitional login isolated from the rest of the admin workspace. */}
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
