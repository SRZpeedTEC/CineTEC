import { useState } from "react";
import ClientMainPage from "./pages/clientMainPage";
import AdminLogin from "./pages/AdminLogin";
import AdminMainPage from "./pages/adminMainPage";

function App() {
  const mode = "admin"; // "client" o "admin"
  const [logged, setLogged] = useState(false);

  // MODO CLIENTE
  if (mode === "client") {
    return <ClientMainPage />;
  }

  return <AdminMainPage />;
  //return <ClientMainPage />;

  /*
  // MODO ADMIN
  if (mode === "admin") {
    if (!logged) {
      return <AdminLogin onLogin={() => setLogged(true)} />;
    }

    return <AdminMainPage />;
  }
  */
}

export default App;
