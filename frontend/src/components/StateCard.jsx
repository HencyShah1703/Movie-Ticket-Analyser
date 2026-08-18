export function LoadingState() {
  return (
    <div className="state-card">
      <div className="spinner" />
      Searching official sources...
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="state-card">
      Enter a movie and a city, then hit "Search Shows" to see showtimes.
    </div>
  );
}

export function ErrorState({ message }) {
  return <div className="state-card error">{message}</div>;
}

export function NoResultsState() {
  return (
    <div className="state-card">
      No showtimes found for that search. Try a different movie, city, or date.
    </div>
  );
}
