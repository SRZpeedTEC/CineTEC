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
  getRecordIdentifier,
  normalizeSectionRecord,
} from "../utils/adminHelpers";

/**
 * Drives the admin experience for section state and movie workflows.
 *
 * @returns {{
 *   activeTab: string,
 *   activeSection: Record<string, unknown> | null,
 *   records: Record<string, Array<Record<string, unknown>>>,
 *   panelState: { isOpen: boolean, sectionKey: string | null, mode: "add" | "edit", editingId: string | number | null },
 *   formData: Record<string, unknown> | null,
 *   dashboardMetrics: Array<unknown>,
 *   projectionHighlights: Array<unknown>,
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
  const [activeTab, setActiveTab] = useState("peliculas");
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

  const activeSection = sectionMeta[activeTab] ?? null;
  const dashboardMetrics = useMemo(() => [], []);
  const projectionHighlights = useMemo(() => [], []);

  useEffect(() => {
    let isMounted = true;

    async function loadMovies() {
      try {
        const movies = await getMovies();

        if (!isMounted) {
          return;
        }

        // We keep the local seed data as a safety net so the admin view still has rows if the API returns nothing.
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
          message: error instanceof Error ? error.message : "No se pudo cargar la cartelera.",
        });
      }
    }

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Releases temporary object URLs created for local image previews.
   *
   * @param {string | undefined | null} previewUrl
   * @returns {void}
   */
  function revokePreviewUrl(previewUrl) {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
  }

  /**
   * Opens the side form for a given section and mode.
   *
   * @param {string} sectionKey
   * @param {"add" | "edit"} mode
   * @param {Record<string, unknown> | null} [record]
   * @returns {void}
   */
  function openForm(sectionKey, mode, record = null) {
    if (formData?.imagePreviewURL) {
      revokePreviewUrl(formData.imagePreviewURL);
    }

    // Resetting the form from section state here keeps add/edit flows predictable even after tab switches.
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

  /**
   * Closes the side form and clears any temporary preview resources.
   *
   * @returns {void}
   */
  function closeForm() {
    revokePreviewUrl(formData?.imagePreviewURL);

    setPanelState({
      isOpen: false,
      sectionKey: null,
      mode: "add",
      editingId: null,
    });
    setFormData(null);
  }

  /**
   * Clears the movie-by-ID search state.
   *
   * @returns {void}
   */
  function clearMovieSearch() {
    setMovieSearchId("");
    setMovieSearchResult(null);
    setMovieSearchError("");
  }

  /**
   * Switches the active admin tab and resets tab-specific UI state when needed.
   *
   * @param {string} nextTab
   * @returns {void}
   */
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

  /**
   * Handles changes from every admin form field.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} event
   * @returns {Promise<void>}
   */
  async function handleFormChange(event) {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      const selectedFile = files?.[0] ?? null;

      if (!selectedFile) {
        setFormData((current) => {
          revokePreviewUrl(current?.imagePreviewURL);

          return {
            ...current,
            imageFileName: "",
            imagePreviewURL: "",
            imageURL: "",
          };
        });

        return;
      }

      setFormData((current) => {
        revokePreviewUrl(current?.imagePreviewURL);

        return {
          ...current,
          // Heads up: The API payload only keeps the filename, while the blob URL exists just for this local preview session.
          imageFileName: selectedFile.name,
          imagePreviewURL: URL.createObjectURL(selectedFile),
          imageURL: selectedFile.name,
        };
      });

      return;
    }

    setFormData((current) => {
      const next = { ...current, [name]: value };

      if (name === "birthdate") {
        // Age is derived to avoid mismatches between what the user enters and what we actually store.
        const age = calculateAge(value);
        next.age = age === "" ? "" : age;
      }

      if (name === "number_of_rows" || name === "number_of_columns" || name === "capacity_factor") {
        // Capacity-related fields move together, so we recompute them on every structural room change.
        const capacities = calculateRoomCapacities(
          name === "number_of_rows" ? value : next.number_of_rows,
          name === "number_of_columns" ? value : next.number_of_columns,
          name === "capacity_factor" ? value : next.capacity_factor
        );

        next.total_capacity = capacities.total_capacity;
        next.max_capacity = capacities.max_capacity;
      }

      return next;
    });
  }

  /**
   * Submits the current admin form for either API-backed movies or local sections.
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   * @returns {Promise<void>}
   */
  async function handleSubmit(event) {
    event.preventDefault();

    if (!panelState.sectionKey || !formData) {
      return;
    }

    if (panelState.sectionKey === "peliculas") {
      setIsMovieSubmitting(true);

      try {
        // Normalization keeps form-friendly strings aligned with the stricter movie contract expected by the API.
        const moviePayload = normalizeMovie({
          ...formData,
          movieID: Number(formData.movieID),
          protagonists: formData.protagonists,
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
          message: error instanceof Error ? error.message : "No se pudo guardar la pelicula.",
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

  /**
   * Deletes one record from the active section.
   *
   * @param {string} sectionKey
   * @param {string | number} recordId
   * @returns {Promise<void>}
   */
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
          message: error instanceof Error ? error.message : "No se pudo eliminar la pelicula.",
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

  /**
   * Updates the movie-by-ID search input and clears stale feedback.
   *
   * @param {string} value
   * @returns {void}
   */
  function handleMovieSearchInputChange(value) {
    setMovieSearchId(value);
    setMovieSearchError("");
    setMovieSearchResult(null);
  }

  /**
   * Fetches a single movie by the ID typed in the search box.
   *
   * @returns {Promise<void>}
   */
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
      // Searching against the API gives the admin the exact persisted record instead of a client-side guess.
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
