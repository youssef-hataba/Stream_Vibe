"use client";

import React from "react";
import { useFetchMovieDetails } from "@/app/hooks/useMovies";

export default function MovieDetailsPage({ params }) {
    const { movieId } = React.use(params);
  const movie = useFetchMovieDetails(movieId);

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
          <p className="mt-4">
                Ratings: {movie.vote_average}
              </p>
        </div>
      </div>
    </div>
  );
}
