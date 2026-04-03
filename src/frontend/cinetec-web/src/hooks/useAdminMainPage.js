import { useMemo, useState } from "react";
import { sectionMeta } from "../config/adminConfig";
import { initialRecords } from "../mocks/adminMockData";
import {
  calculateAge,
  calculateCapacity,
  createFormState,
  formatProjectionDateTime,
} from "../utils/adminHelpers";

export function useAdminMainPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [records, setRecords] = useState(initialRecords);
  const [panelState, setPanelState] = useState({
    isOpen: false,
    sectionKey: null,
    mode: "add",
    editingId: null,
  });
  const [formData, setFormData] = useState(null);

  const activeSection = activeTab === "dashboard" ? null : sectionMeta[activeTab];

  const dashboardMetrics = useMemo(
    () => [
      { label: "Clientes activos", value: `${records.clientes.length}`, accent: "primary" },
      { label: "Películas en cartelera", value: `${records.peliculas.length}`, accent: "secondary" },
      { label: "Salas operativas", value: `${records.salas.length}`, accent: "neutral" },
      { label: "Funciones hoy", value: `${records.proyecciones.length}`, accent: "secondary" },
    ],
    [records]
  );

  const projectionHighlights = useMemo(
    () =>
      records.proyecciones.slice(0, 3).map((projection, index) => ({
        movie: projection.pelicula,
        room: `Sala ${projection.sala}`,
        time: formatProjectionDateTime(projection.horario),
        occupancy: ["84%", "71%", "66%"][index] ?? "60%",
      })),
    [records.proyecciones]
  );

  function openForm(sectionKey, mode, record = null) {
    setActiveTab(sectionKey);
    setPanelState({
      isOpen: true,
      sectionKey,
      mode,
      editingId: record?.id ?? null,
    });
    setFormData(createFormState(sectionKey, records, record));
  }

  function closeForm() {
    setPanelState({
      isOpen: false,
      sectionKey: null,
      mode: "add",
      editingId: null,
    });
    setFormData(null);
  }

  function handleTabChange(nextTab) {
    setActiveTab(nextTab);

    if (nextTab !== panelState.sectionKey) {
      closeForm();
    }
  }

  function handleFormChange(event) {
    const { name, value, type, files } = event.target;

    setFormData((current) => {
      const next = { ...current };

      if (type === "file") {
        next.imagenFile = files?.[0] ?? null;
        next.imagenArchivo = files?.[0]?.name ?? "";
        return next;
      }

      next[name] = value;

      if (name === "fechaNacimiento") {
        const calculatedAge = calculateAge(value);
        next.edad = calculatedAge === "" ? "" : calculatedAge;
      }

      if (name === "cantidadFilas" || name === "columnasEspacios") {
        next.capacidad = calculateCapacity(
          name === "cantidadFilas" ? value : next.cantidadFilas,
          name === "columnasEspacios" ? value : next.columnasEspacios
        );
      }

      return next;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    closeForm();
  }

  function handleDeleteRecord(sectionKey, recordId) {
    setRecords((current) => ({
      ...current,
      [sectionKey]: current[sectionKey].filter((row) => row.id !== recordId),
    }));

    if (panelState.sectionKey === sectionKey && panelState.editingId === recordId) {
      closeForm();
    }
  }

  return {
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
  };
}