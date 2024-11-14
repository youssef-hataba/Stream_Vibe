import { fetchMovieDetails } from "@/app/hooks/useMovies";

export const fetchMoviesFromIds = async (movieIds) => {
  const movies = await Promise.all(movieIds.map((movieId) => fetchMovieDetails(movieId)));
  return movies.filter(Boolean);
};
