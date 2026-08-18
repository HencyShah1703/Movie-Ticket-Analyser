import { useState } from "react";
import Header from "./components/Header.jsx";
import SearchFilters from "./components/SearchFilters.jsx";
import TipCard from "./components/TipCard.jsx";
import ResultsBanner from "./components/ResultsBanner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {
  LoadingState,
  EmptyState,
  ErrorState,
  NoResultsState,
} from "./components/StateCard.jsx";
import { fetchShowtimes } from "./api.js";

export default function App() {
  const [form, setForm] = useState({ movie: "", location: "", date: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!form.movie.trim() || !form.location.trim()) {
      setError("Please enter both a movie name and a city.");
      setResult(null);
      setSearched(true);
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const data = await fetchShowtimes(form);
      setResult(data);
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />

      <div className="page">
        <h1 className="page-heading">🎟️ Find Movie Tickets</h1>
        <p className="page-subheading">
          Search and book tickets for your favorite movies
        </p>

        <div className="layout">
          <div>
            <SearchFilters
              form={form}
              setForm={setForm}
              onSearch={handleSearch}
              loading={loading}
            />
            <TipCard />
          </div>

          <div>
            {!searched && <EmptyState />}

            {searched && loading && <LoadingState />}

            {searched && !loading && error && <ErrorState message={error} />}

            {searched && !loading && !error && result && (
              <>
                <ResultsBanner
                  movie={result.movie}
                  location={result.location}
                  date={result.date}
                  count={result.count}
                />

                {result.theatres.length === 0 ? (
                  <NoResultsState />
                ) : (
                  <div className="results-list">
                    {result.theatres.map((theatre, idx) => (
                      <MovieCard
                        key={`${theatre.theatre}-${idx}`}
                        movie={result.movie}
                        theatre={theatre}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="footnote">
          ⓘ Showtimes are AI-generated estimates. Please check official
          sources before booking.
        </div>
      </div>
    </div>
  );
}
