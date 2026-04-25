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

  /**
   * Validates the temporary local credentials and unlocks the admin view.
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   * @returns {void}
   */
  const handleLogin = (event) => {
    event.preventDefault();

    // These local credentials are only a temporary front-end gate until a real auth flow is connected.
    if (user.trim() === "admin" && pass === "1234") {
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
        <p>Iniciar sesion</p>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Usuario"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          />

          <input
            type="password"
            placeholder="Contrasena"
            value={pass}
            onChange={(event) => setPass(event.target.value)}
          />

          <button type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
