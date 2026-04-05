import { ratingOptions, sectionMeta } from "../../config/adminConfig";

function FormField({ label, helper, children }) {
  return (
    <div className="col-12">
      <label className="admin-form-label d-block">
        <span className="d-block">{label}</span>
        {children}
      </label>
      {helper ? <p className="admin-field-helper mb-0 mt-2">{helper}</p> : null}
    </div>
  );
}

function renderFields(sectionKey, formData, onChange) {
  switch (sectionKey) {
    case "clients":
      return (
        <>
          <FormField label="First name">
            <input
              className="form-control admin-form-control"
              name="Fname"
              type="text"
              value={formData.Fname}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Middle initial">
            <input
              className="form-control admin-form-control"
              name="Minit"
              type="text"
              maxLength="1"
              value={formData.Minit}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Email">
            <input
              className="form-control admin-form-control"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Password">
            <input
              className="form-control admin-form-control"
              name="password"
              type="text"
              value={formData.password}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Birthdate">
            <input
              className="form-control admin-form-control"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Age" helper="Calculated automatically from the selected birthdate.">
            <input
              className="form-control admin-form-control"
              name="age"
              type="text"
              value={formData.age}
              readOnly
            />
          </FormField>
        </>
      );

    case "movies":
      return (
        <>
          <FormField label="Original name">
            <input
              className="form-control admin-form-control"
              name="originalName"
              type="text"
              value={formData.originalName}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Commercial name">
            <input
              className="form-control admin-form-control"
              name="commercialName"
              type="text"
              value={formData.commercialName}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Poster URL">
            <input
              className="form-control admin-form-control"
              name="imageURL"
              type="url"
              value={formData.imageURL}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Duration">
            <input
              className="form-control admin-form-control"
              name="duration"
              type="text"
              placeholder="1h 26m"
              value={formData.duration}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Director">
            <input
              className="form-control admin-form-control"
              name="director"
              type="text"
              value={formData.director}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Rating">
            <select
              className="form-select admin-form-control"
              name="rating"
              value={formData.rating}
              onChange={onChange}
            >
              {ratingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Protagonists" helper="Separate names with commas to match the backend list.">
            <textarea
              className="form-control admin-form-control admin-form-textarea"
              name="protagonists"
              value={formData.protagonists}
              onChange={onChange}
            />
          </FormField>
        </>
      );

    case "cinemas":
      return (
        <>
          <FormField label="Cinema name">
            <input
              className="form-control admin-form-control"
              name="name"
              type="text"
              value={formData.name}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Address">
            <input
              className="form-control admin-form-control"
              name="address"
              type="text"
              value={formData.address}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Province">
            <input
              className="form-control admin-form-control"
              name="province"
              type="text"
              value={formData.province}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Number of rooms">
            <input
              className="form-control admin-form-control"
              name="number_of_rooms"
              type="number"
              min="0"
              value={formData.number_of_rooms}
              onChange={onChange}
            />
          </FormField>
        </>
      );

    case "rooms":
      return (
        <>
          <FormField label="Cinema ID">
            <input
              className="form-control admin-form-control"
              name="Cinema_id"
              type="text"
              value={formData.Cinema_id}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Room number">
            <input
              className="form-control admin-form-control"
              name="room_number"
              type="number"
              min="0"
              value={formData.room_number}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Number of columns">
            <input
              className="form-control admin-form-control"
              name="number_of_columns"
              type="number"
              min="0"
              value={formData.number_of_columns}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Number of rows">
            <input
              className="form-control admin-form-control"
              name="number_of_rows"
              type="number"
              min="0"
              value={formData.number_of_rows}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Capacity factor" helper="Used to calculate the maximum allowed capacity.">
            <input
              className="form-control admin-form-control"
              name="capacity_factor"
              type="number"
              min="0"
              value={formData.capacity_factor}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Total capacity" helper="Calculated automatically from rows and columns.">
            <input
              className="form-control admin-form-control"
              name="total_capacity"
              type="text"
              value={formData.total_capacity}
              readOnly
            />
          </FormField>
          <FormField label="Max capacity" helper="Calculated automatically from total capacity and capacity factor.">
            <input
              className="form-control admin-form-control"
              name="max_capacity"
              type="text"
              value={formData.max_capacity}
              readOnly
            />
          </FormField>
        </>
      );

    case "functions":
      return (
        <>
          <FormField label="Movie ID">
            <input
              className="form-control admin-form-control"
              name="Movie_id"
              type="text"
              value={formData.Movie_id}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Room number">
            <input
              className="form-control admin-form-control"
              name="room_number"
              type="number"
              min="0"
              value={formData.room_number}
              onChange={onChange}
            />
          </FormField>
          <FormField label="Date and time">
            <input
              className="form-control admin-form-control"
              name="datetime"
              type="datetime-local"
              value={formData.datetime}
              onChange={onChange}
            />
          </FormField>
        </>
      );

    default:
      return null;
  }
}

export default function FormPanel({
  sectionKey,
  mode,
  formData,
  onChange,
  onCancel,
  onSubmit,
}) {
  const meta = sectionMeta[sectionKey];

  if (!meta || !formData) {
    return null;
  }

  return (
    <div className="admin-form-panel card border-0">
      <div className="card-body p-4">
        <div className="admin-alert admin-alert-info">
          {mode === "edit"
            ? `Editing a ${meta.title.toLowerCase()} record.`
            : `Preparing a new ${meta.title.toLowerCase()} record.`}
        </div>

        <div className="mb-4">
          <span className="admin-kicker">Form</span>
          <h3 className="admin-section-title mb-2">
            {mode === "edit" ? "Edit record" : meta.addLabel}
          </h3>
          <p className="admin-section-copy mb-0">{meta.subtitle}</p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="row g-3">{renderFields(sectionKey, formData, onChange)}</div>

          <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
            <button type="submit" className="btn admin-btn admin-btn-primary">
              {mode === "edit" ? "Save changes" : "Save record"}
            </button>
            <button
              type="button"
              className="btn admin-btn admin-btn-ghost"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
