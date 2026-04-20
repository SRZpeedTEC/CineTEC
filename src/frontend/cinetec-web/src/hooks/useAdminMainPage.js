import { useEffect, useMemo, useState } from "react";
import { sectionMeta } from "../config/adminConfig";
import { initialRecords } from "../mocks/adminMockData";
import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  normalizeMovie,
  updateMovie,
} from "../services/movieService";
import {
  calculateAge,
  calculateRoomCapacities,
  createFormState,
  formatProjectionDateTime,
  getRecordIdentifier,
  normalizeSectionRecord,
  parseProtagonists,
  readFileAsDataUrl,
} from "../utils/adminHelpers";

/**
 * Drives the admin experience for dashboard metrics, local sections, and the
 * movie API workflows.
 *
 * @returns {{
 *   activeTab: string,
 *   activeSection: Record<string, unknown> | null,
 *   records: Record<string, Array<Record<string, unknown>>>,
 *   panelState: { isOpen: boolean, sectionKey: string | null, mode: "add" | "edit", editingId: string | number | null },
 *   formData: Record<string, unknown> | null,
 *   dashboardMetrics: Array<{ label: string, value: string, accent: string }>,
 *   projectionHighlights: Array<{ movie: string, room: string, time: string, occupancy: string }>,
 *   movieSearchId: string,
 *   movieSearchResult: Record<string, unknown> | null,
 *   movieSearchError: string,
 *   movieApiNotice: { type: "success" | "error" | "", message: string },
 *   isMovieSearchLoading: boolean,
 *   isMovieSubmitting: boolean,
 *   openForm: (sectionKey: string, mode: "add" | "edit", record?: Record<string, unknown> | null) => void,
 *   closeForm: () => void,
 *   handleTabChange: (nextTab: string) => void,
 *   handleFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => Promise<void>,
 *   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
 *   handleDeleteRecord: (sectionKey: string, recordId: string | number) => Promise<void>,
 *   handleMovieSearchInputChange: (value: string) => void,
 *   handleMovieSearchSubmit: () => Promise<void>,
 *   clearMovieSearch: () => void,
 * }}
 */
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
  const [movieSearchId, setMovieSearchId] = useState("");
  const [movieSearchResult, setMovieSearchResult] = useState(null);
  const [movieSearchError, setMovieSearchError] = useState("");
  const [isMovieSearchLoading, setIsMovieSearchLoading] = useState(false);
  const [isMovieSubmitting, setIsMovieSubmitting] = useState(false);
  const [movieApiNotice, setMovieApiNotice] = useState({ type: "", message: "" });

  const activeSection = activeTab === "dashboard" ? null : sectionMeta[activeTab];

  useEffect(() => {
    let isMounted = true;

    async function loadMovies() {
      try {
        const movies = await getMovies();

        if (!isMounted) {
          return;
        }

        setRecords((current) => ({
          ...current,
          peliculas: movies.length > 0 ? movies : current.peliculas,
        }));
        setMovieApiNotice({ type: "", message: "" });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setMovieApiNotice({
          type: "error",
          message: error instanceof Error
            ? error.message
            : "No se pudo cargar la cartelera desde el backend.",
        });
      }
    }

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  const dashboardMetrics = useMemo(
    () => [
      { label: "Clientes activos", value: `${records.clientes.length}`, accent: "primary" },
      { label: "Peliculas en cartelera", value: `${records.peliculas.length}`, accent: "secondary" },
      { label: "Salas operativas", value: `${records.salas.length}`, accent: "neutral" },
      { label: "Funciones hoy", value: `${records.proyecciones.length}`, accent: "secondary" },
    ],
    [records]
  );

  const projectionHighlights = useMemo(
    () =>
      records.proyecciones.slice(0, 3).map((projection, index) => {
        const movie = records.peliculas.find(
          (item) => String(item.movieID) === String(projection.Movie_id)
        );

        return {
          movie: movie?.commercialName || movie?.originalName || `Movie ${projection.Movie_id}`,
          room: `Sala ${projection.room_number}`,
          time: formatProjectionDateTime(projection.datetime),
          occupancy: ["84%", "71%", "66%"][index] ?? "60%",
        };
      }),
    [records]
  );

  function openForm(sectionKey, mode, record = null) {
    setActiveTab(sectionKey);
    setPanelState({
      isOpen: true,
      sectionKey,
      mode,
      editingId: record ? getRecordIdentifier(sectionKey, record) : null,
    });
    setFormData(createFormState(sectionKey, records, record));
    setMovieApiNotice({ type: "", message: "" });
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

  function clearMovieSearch() {
    setMovieSearchId("");
    setMovieSearchResult(null);
    setMovieSearchError("");
  }

  function handleTabChange(nextTab) {
    setActiveTab(nextTab);

    if (nextTab !== panelState.sectionKey) {
      closeForm();
    }

    if (nextTab !== "peliculas") {
      clearMovieSearch();
      setMovieApiNotice({ type: "", message: "" });
    }
  }

  async function handleFormChange(event) {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      const selectedFile = files?.[0] ?? null;

      if (!selectedFile) {
        setFormData((current) => ({
          ...current,
          imageFile: null,
          imageFileName: "",
          imageURL: "",
        }));
        return;
      }

      const imageURL = await readFileAsDataUrl(selectedFile);
      setFormData((current) => ({
        ...current,
        imageFile: selectedFile,
        imageFileName: selectedFile.name,
        imageURL,
      }));
      return;
    }

    setFormData((current) => {
      const next = { ...current, [name]: value };

      if (name === "birthdate") {
        const age = calculateAge(value);
        next.age = age === "" ? "" : age;
      }

      if (name === "number_of_rows" || name === "number_of_columns" || name === "capacity_factor") {
        const capacities = calculateRoomCapacities(
          name === "number_of_rows" ? value : next.number_of_rows,
          name === "number_of_columns" ? value : next.number_of_columns,
          name === "capacity_factor" ? value : next.capacity_factor
        );

        next.total_capacity = capacities.total_capacity;
        next.max_capacity = capacities.max_capacity;
      }

      if (name === "protagonists") {
        next.protagonists = parseProtagonists(value);
      }

      return next;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!panelState.sectionKey || !formData) {
      return;
    }

    if (panelState.sectionKey === "peliculas") {
      setIsMovieSubmitting(true);

      try {
        const moviePayload = normalizeMovie({
          ...formData,
          movieID: Number(formData.movieID),
        });

        const savedMovie =
          panelState.mode === "edit"
            ? await updateMovie(moviePayload.movieID, moviePayload)
            : await createMovie(moviePayload);

        setRecords((current) => ({
          ...current,
          peliculas:
            panelState.mode === "edit"
              ? current.peliculas.map((movie) =>
                  Number(movie.movieID) === savedMovie.movieID ? savedMovie : movie
                )
              : [...current.peliculas, savedMovie].sort((left, right) => left.movieID - right.movieID),
        }));

        if (String(movieSearchId) === String(savedMovie.movieID)) {
          setMovieSearchResult(savedMovie);
        }

        setMovieApiNotice({
          type: "success",
          message:
            panelState.mode === "edit"
              ? `La pelicula ${savedMovie.movieID} se actualizo correctamente.`
              : `La pelicula ${savedMovie.movieID} se creo correctamente.`,
        });

        closeForm();
      } catch (error) {
        setMovieApiNotice({
          type: "error",
          message: error instanceof Error
            ? error.message
            : "No se pudo guardar la pelicula.",
        });
      } finally {
        setIsMovieSubmitting(false);
      }

      return;
    }

    const normalizedRecord = normalizeSectionRecord(panelState.sectionKey, formData);

    setRecords((current) => {
      const currentRows = current[panelState.sectionKey];
      const nextRows =
        panelState.mode === "edit"
          ? currentRows.map((row) =>
              getRecordIdentifier(panelState.sectionKey, row) === panelState.editingId
                ? normalizedRecord
                : row
            )
          : [...currentRows, normalizedRecord];

      return {
        ...current,
        [panelState.sectionKey]: nextRows,
      };
    });

    closeForm();
  }

  async function handleDeleteRecord(sectionKey, recordId) {
    if (sectionKey === "peliculas") {
      try {
        await deleteMovie(recordId);

        setRecords((current) => ({
          ...current,
          peliculas: current.peliculas.filter((row) => Number(row.movieID) !== Number(recordId)),
        }));

        if (String(movieSearchResult?.movieID ?? "") === String(recordId)) {
          setMovieSearchResult(null);
        }

        setMovieApiNotice({
          type: "success",
          message: `La pelicula ${recordId} se elimino correctamente.`,
        });
      } catch (error) {
        setMovieApiNotice({
          type: "error",
          message: error instanceof Error
            ? error.message
            : "No se pudo eliminar la pelicula.",
        });
      }
    } else {
      setRecords((current) => ({
        ...current,
        [sectionKey]: current[sectionKey].filter(
          (row) => getRecordIdentifier(sectionKey, row) !== recordId
        ),
      }));
    }

    if (panelState.sectionKey === sectionKey && panelState.editingId === recordId) {
      closeForm();
    }
  }

  function handleMovieSearchInputChange(value) {
    setMovieSearchId(value);
    setMovieSearchError("");
    setMovieSearchResult(null);
  }

  async function handleMovieSearchSubmit() {
    const normalizedMovieId = movieSearchId.trim();

    if (!normalizedMovieId) {
      setMovieSearchResult(null);
      setMovieSearchError("");
      return;
    }

    setIsMovieSearchLoading(true);
    setMovieSearchError("");
    setMovieApiNotice({ type: "", message: "" });

    try {
      const movie = await getMovieById(normalizedMovieId);
      setMovieSearchResult(movie);
    } catch (error) {
      setMovieSearchResult(null);
      setMovieSearchError(
        error instanceof Error ? error.message : "No se encontro la pelicula solicitada."
      );
    } finally {
      setIsMovieSearchLoading(false);
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
  };
}
