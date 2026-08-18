import { useState } from "react";

export default function MovieCard({ movie, theatre }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const showtimes = theatre.showtimes || [];
  const selected = showtimes[selectedIdx] || showtimes[0];

  const lowestPrice = showtimes.length
    ? Math.min(...showtimes.map((s) => Number(s.price) || 0))
    : null;

  const bookingUrl = `https://in.bookmyshow.com/explore/movies-${encodeURIComponent(
    (theatre.location || "").toLowerCase()
  )}?q=${encodeURIComponent(movie)}`;

  return (
    <div className="movie-card">
      <div className="poster">
        <span className="poster-emoji">🎬</span>
        <span className="poster-label">{movie}</span>
      </div>

      <div className="movie-info">
        <div className="movie-title-row">
          <h3 className="movie-title">{movie}</h3>
          {theatre.language && <span className="badge">{theatre.language}</span>}
        </div>
        <div className="movie-meta">Showtimes generated for your search</div>

        <div className="theatre-name">
          <span className="pin">📍</span> {theatre.theatre}
        </div>
        {theatre.location && (
          <div className="theatre-location">{theatre.location}</div>
        )}

        <div className="shows-label">Available Shows</div>
        <div className="shows-grid">
          {showtimes.map((s, idx) => (
            <button
              key={`${s.time}-${idx}`}
              type="button"
              className={`show-time ${idx === selectedIdx ? "selected" : ""}`}
              onClick={() => setSelectedIdx(idx)}
            >
              {s.time}
            </button>
          ))}
        </div>

        {selected && (
          <div className={`availability ${selected.availability}`}>
            {selected.availability}
          </div>
        )}
      </div>

      <div className="card-side">
        <div>
          <div className="price-label">From</div>
          <div className="price-value">
            ₹{lowestPrice != null ? lowestPrice : "—"}
          </div>
        </div>
        <a
          className="view-seats-btn"
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
        >
          View Seats
        </a>
      </div>
    </div>
  );
}
