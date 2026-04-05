import { useMemo, useState } from "react";
import { sectionMeta } from "../config/adminConfig";
import { initialRecords } from "../mocks/adminMockData";
import {
  calculateAge,
  calculateCapacity,
  calculateMaxCapacity,
  createFormState,
  formatProjectionDateTime,
  getRecordKey,
} from "../utils/adminHelpers";

function buildRecord(sectionKey, formData, currentRecords, mode) {
  switch (sectionKey) {
    case "clients": {
      const nextId =
        mode === "edit" && formData.ID
          ? Number(formData.ID)
          : Math.max(0, ...currentRecords.clients.map((client) => Number(client.ID) || 0)) + 1;

      return {
        ID: nextId,
        email: formData.email.trim(),
        password: formData.password,
        birthdate: formData.birthdate,
        age: Number(calculateAge(formData.birthdate)) || 0,
        Fname: formData.Fname.trim(),
        Minit: formData.Minit.trim(),
      };
    }
    case "movies":
      return {
        originalName: formData.originalName.trim(),
        commercialName: formData.commercialName.trim(),
        imageURL: formData.imageURL.trim(),
        duration: formData.duration.trim(),
        rating: formData.rating,
        director: formData.director.trim(),
        protagonists: formData.protagonists
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };
    case "cinemas":
      return {
        name: formData.name.trim(),
        address: formData.address.trim(),
        province: formData.province.trim(),
        number_of_rooms: Number(formData.number_of_rooms) || 0,
      };
    case "rooms": {
      const totalCapacity =
        calculateCapacity(formData.number_of_rows, formData.number_of_columns) || 0;
      const maxCapacity = calculateMaxCapacity(totalCapacity, formData.capacity_factor) || 0;

      return {
        Cinema_id: formData.Cinema_id.trim(),
        room_number: Number(formData.room_number) || 0,
        number_of_columns: Number(formData.number_of_columns) || 0,
        number_of_rows: Number(formData.number_of_rows) || 0,
        total_capacity: Number(totalCapacity) || 0,
        capacity_factor: Number(formData.capacity_factor) || 0,
        max_capacity: Number(maxCapacity) || 0,
      };
    }
    case "functions":
      return {
        Movie_id: formData.Movie_id.trim(),
        room_number: Number(formData.room_number) || 0,
        datetime: formData.datetime,
      };
    default:
      return formData;
  }
}

export function useAdminMainPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [records, setRecords] = useState(initialRecords);
  const [panelState, setPanelState] = useState({
    isOpen: false,
    sectionKey: null,
    mode: "add",
    recordKey: null,
  });
  const [formData, setFormData] = useState(null);

  const activeSection = activeTab === "dashboard" ? null : sectionMeta[activeTab];

  const dashboardMetrics = useMemo(
    () => [
      { label: "Active clients", value: `${records.clients.length}`, accent: "primary" },
      { label: "Movies in catalog", value: `${records.movies.length}`, accent: "secondary" },
      { label: "Active rooms", value: `${records.rooms.length}`, accent: "neutral" },
      { label: "Functions scheduled", value: `${records.functions.length}`, accent: "secondary" },
    ],
    [records]
  );

  const projectionHighlights = useMemo(
    () =>
      records.functions.slice(0, 3).map((projection, index) => ({
        movie: projection.Movie_id,
        room: `Room ${projection.room_number}`,
        time: formatProjectionDateTime(projection.datetime),
        occupancy: ["84%", "71%", "66%"][index] ?? "60%",
      })),
    [records.functions]
  );

  function openForm(sectionKey, mode, record = null) {
    setActiveTab(sectionKey);
    setPanelState({
      isOpen: true,
      sectionKey,
      mode,
      recordKey: record ? getRecordKey(sectionKey, record) : null,
    });
    setFormData(createFormState(sectionKey, records, record));
  }

  function closeForm() {
    setPanelState({
      isOpen: false,
      sectionKey: null,
      mode: "add",
      recordKey: null,
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
    const { name, value } = event.target;

    setFormData((current) => {
      const next = { ...current, [name]: value };

      if (name === "birthdate") {
        const calculatedAge = calculateAge(value);
        next.age = calculatedAge === "" ? "" : calculatedAge;
      }

      if (
        name === "number_of_rows" ||
        name === "number_of_columns" ||
        name === "capacity_factor"
      ) {
        const totalCapacity = calculateCapacity(
          name === "number_of_rows" ? value : next.number_of_rows,
          name === "number_of_columns" ? value : next.number_of_columns
        );
        const maxCapacity = calculateMaxCapacity(
          totalCapacity,
          name === "capacity_factor" ? value : next.capacity_factor
        );

        next.total_capacity = totalCapacity === "" ? "" : String(totalCapacity);
        next.max_capacity = maxCapacity === "" ? "" : String(maxCapacity);
      }

      return next;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!panelState.sectionKey || !formData) {
      closeForm();
      return;
    }

    const nextRecord = buildRecord(panelState.sectionKey, formData, records, panelState.mode);

    setRecords((current) => {
      const currentSectionRecords = current[panelState.sectionKey];

      if (panelState.mode === "edit" && panelState.recordKey) {
        return {
          ...current,
          [panelState.sectionKey]: currentSectionRecords.map((row) =>
            getRecordKey(panelState.sectionKey, row) === panelState.recordKey ? nextRecord : row
          ),
        };
      }

      return {
        ...current,
        [panelState.sectionKey]: [...currentSectionRecords, nextRecord],
      };
    });

    closeForm();
  }

  function handleDeleteRecord(sectionKey, recordKey) {
    setRecords((current) => ({
      ...current,
      [sectionKey]: current[sectionKey].filter(
        (row) => getRecordKey(sectionKey, row) !== recordKey
      ),
    }));

    if (panelState.sectionKey === sectionKey && panelState.recordKey === recordKey) {
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
