export default function SearchFilters({ form, setForm, onSearch, loading }) {
  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const clear = (key) => () => setForm({ ...form, [key]: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2 className="filters-heading">Search Filters</h2>

      <div className="field">
        <label htmlFor="movie">Movie</label>
        <div className="field-input">
          <span className="icon">🔍</span>
          <input
            id="movie"
            type="text"
            placeholder="e.g. Jawan"
            value={form.movie}
            onChange={update("movie")}
          />
          {form.movie && (
            <button type="button" className="clear-btn" onClick={clear("movie")}>
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="location">Location</label>
        <div className="field-input">
          <span className="icon">📍</span>
          <input
            id="location"
            type="text"
            placeholder="e.g. Bangalore"
            value={form.location}
            onChange={update("location")}
          />
          {form.location && (
            <button type="button" className="clear-btn" onClick={clear("location")}>
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="date">Date</label>
        <div className="field-input">
          <span className="icon">📅</span>
          <input
            id="date"
            type="text"
            placeholder="e.g. 15th Oct"
            value={form.date}
            onChange={update("date")}
          />
          {form.date && (
            <button type="button" className="clear-btn" onClick={clear("date")}>
              ✕
            </button>
          )}
        </div>
      </div>

      <button className="search-btn" type="submit" disabled={loading}>
        🔍 {loading ? "Searching..." : "Search Shows"}
      </button>
    </form>
  );
}
