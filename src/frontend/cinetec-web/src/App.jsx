import { useState } from "react";
import ClientMainPage from "./pages/clientMainPage";
import AdminLogin from "./pages/AdminLogin";
import AdminMainPage from "./pages/adminMainPage";

/**
 * Root application shell used to switch between client and admin experiences.
 *
 * @returns {JSX.Element}
 */
function App() {
  // This local switch is handy while the project still keeps client and admin entry flows in the same app shell.
  const mode = "client";
  const [logged, setLogged] = useState(false);

  if (mode === "client") {
    return <ClientMainPage />;
  }

  if (mode === "admin") {
    if (!logged) {
      return <AdminLogin onLogin={() => setLogged(true)} />;
    }

    return <AdminMainPage />;
  }

  return <ClientMainPage />;
}

export default App;
