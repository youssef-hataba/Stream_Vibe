"use client";

import React from "react";
import { useFetchMovieDetails , useFetchSuggestedMovies } from "@/app/hooks/useMovies";

export default function MovieDetailsPage({ params }) {
    const { movieId } = React.use(params);
  const movie = useFetchMovieDetails(movieId);
  const suggestedMovies = useFetchSuggestedMovies(movieId);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="mt-20 bg-black-8 text-white relative p-6">
      {/* Movie Pic   */}
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
        />

        {/*  Movie Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="mt-4"><strong>Release Date:</strong> {movie.release_date}</p>
          <p className="mt-4"><strong>Duration:</strong> {movie.runtime} mins</p>
          <p className="mt-4"><strong>Viewers:</strong> {movie.vote_count} votes</p>
          <p className="mt-4"><strong>Overview:</strong> {movie.overview}</p>
          <p className="mt-4"><strong>Actors:</strong> {movie.cast}</p>
          <p className="mt-4">Ratings: {movie.vote_average}</p>
          <p className="mt-4">Reviews: {movie.reviews}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Suggested Movies</h2>
        <div className="grid grid-cols-4 gap-6">
          {/* Map suggested movies to cards */}
          {suggestedMovies.map((suggestedMovie) => (
            <div key={suggestedMovie.id} className="movie-card bg-black-10 rounded-lg px-4 py-3 shadow-lg overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w200/${suggestedMovie.poster_path}`}
                alt={suggestedMovie.title}
                className="w-full rounded-lg object-cover"
              />
              <h3 className="mt-4 text-lg font-semibold">{suggestedMovie.title}</h3>
              <p className="text-gray-400">Rating: {suggestedMovie.vote_average}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
