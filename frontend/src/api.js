export async function fetchShowtimes({ movie, location, date }) {
  const params = new URLSearchParams({ movie, location, date });
  const response = await fetch(`/api/movies?${params.toString()}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }

  return data;
}
