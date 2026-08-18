export default function ResultsBanner({ movie, location, date, count }) {
  return (
    <div className="results-banner">
      <div className="results-banner-left">
        <div className="results-banner-icon">🎟️</div>
        <div>
          <div className="results-banner-title">Showing results for</div>
          <div className="results-banner-meta">
            {movie} &nbsp;•&nbsp; {location} &nbsp;•&nbsp; {date}
          </div>
        </div>
      </div>
      <div className="results-banner-count">
        {count} Show{count === 1 ? "" : "s"} Found
      </div>
    </div>
  );
}
