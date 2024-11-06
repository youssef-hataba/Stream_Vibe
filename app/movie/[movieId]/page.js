"use client";

import React from "react";
import { useFetchMovieDetails, useFetchSuggestedMovies } from "@/app/hooks/useMovies";
import Link from "next/link";

export default function MovieDetailsPage({ params }) {
  const { movieId } = React.use(params)
  const movie = useFetchMovieDetails(movieId);
  const suggestedMovies = useFetchSuggestedMovies(movieId);

  if (!movie) return <div>Loading...</div>;
  if (!suggestedMovies) return <div>Loading suggested movies...</div>;

  const genres = movie.genres?.map((genre) => genre.name).join(", ");
  const languages = movie.spoken_languages?.map((lang) => lang.english_name).join(", ");

  return (
    <div className=" bg-black-8 text-white">
      <div className="bg-black-10  text-white p-8">
        {/* Header Section with Image and Title */}
        <div className="w-1.5/2 h-[500px] overflow-hidden rounded-lg relative mb-8">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/path/to/default-image.jpg'}
            alt={movie.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black-8 bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              <p className="mt-2 text-gray-300"> {movie.overview}</p>
              <button className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full">
                Play Now
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="md:w-2/3">
            {/* Description Section */}
            <div className="bg-black-10 p-4 rounded-lg mb-6 shadow">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="mt-2 text-gray-300"><strong>Overview:</strong> {movie.overview}</p>
            </div>

            {/* Cast Section */}
            <div className="bg-black-10 p-4 rounded-lg mb-6 shadow">
              <h2 className="text-xl font-semibold"><strong>Actors:</strong> {movie.cast}</h2>
            </div>
            
            {/* Reviews Section */}
            <div className="bg-black-10 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">Reviews: {movie.reviews}</h2>
              <div className="mt-4 space-y-4">
                <div className="bg-black-10 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Ratings: <span className="text-sm text-gray-400"> {movie.vote_average}</span></h3>
                  <div className="mt-2 text-yellow-500">★★★★☆</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-1/3 space-y-6">
            {/* Info Cards */}
            <div className="bg-black-8 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">Release Date:</h2>
              <p className="mt-1 text-gray-300">{movie.release_date}</p>
            </div>
            <div className="bg-black-8 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">Language</h2>
              <p className="mt-1 text-gray-300">{languages}</p>
            </div>
            <div className="bg-black-8 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">Genre</h2>
              <p className="mt-1 text-gray-300">{genres}</p>
            </div>
            <div className="bg-black-8 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">Duration:</h2>
              <p className="mt-1 text-gray-300">{movie.runtime} mins</p>
            </div>
            <div className="bg-black-8 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">Viewers:</h2>
              <p className="mt-1 text-gray-300">{movie.vote_count} votes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
  <h2 className="text-3xl font-bold mb-6">Suggested Movies</h2>
  <div className="grid grid-cols-5 gap-6">
    {suggestedMovies.slice(0, 10).map((suggestedMovie) => (
      <Link key={suggestedMovie.id} href={`/movie/${suggestedMovie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${suggestedMovie.poster_path}`}
            alt={suggestedMovie.title}
            className="w-full rounded-lg object-cover"
          />
          <h3 className="mt-4 text-lg font-semibold">{suggestedMovie.title}</h3>
          <p className="text-gray-400">Rating: {suggestedMovie.vote_average}</p>
      </Link>
    ))}
  </div>
</div>

    </div>
  );
}
