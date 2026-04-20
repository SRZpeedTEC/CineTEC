import { useEffect, useState } from "react";
import ClientMainPage from "./pages/clientMainPage";
import AdminMainPage from "./pages/adminMainPage";

function getAppModeFromHash() {
  return window.location.hash.toLowerCase() === "#admin" ? "admin" : "client";
}

function App() {
  const [appMode, setAppMode] = useState(getAppModeFromHash);

  useEffect(() => {
    function syncModeWithHash() {
      setAppMode(getAppModeFromHash());
    }

    window.addEventListener("hashchange", syncModeWithHash);

    return () => {
      window.removeEventListener("hashchange", syncModeWithHash);
    };
  }, []);

  return appMode === "admin" ? <AdminMainPage /> : <ClientMainPage />;
}

export default App;
