"use client";

import { useFetchMovies } from "../hooks/useMovies";
import { PrevButton, NextButton } from "./Buttons";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

// Movie Section Component
export default function MovieSection({ title, categoryPath }) {
  const movies = useFetchMovies(categoryPath);

  // Generate a unique scroll ID based on the title
  const scrollId = title.toLowerCase().replace(/\s+/g, "_");

  return (
    <div className="mt-20 bg-black-8 text-white relative">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">{title}</h1>

        {/* Scroll buttons */}
        <div className="flex gap-4">
          <PrevButton onClick={() => scrollLeft(scrollId)} />
          <NextButton onClick={() => scrollRight(scrollId)} />
        </div>
      </div>

      {/* Scrollable container with dynamic id */}
      <div
        id={scrollId}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth mt-12"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

// Movie Card Component
function MovieCard({ movie }) {
  return (
    <div className="bg-black-10 rounded-lg px-4 min-w-[250px] shadow-lg overflow-hidden">
      <Link href={`/movie/${movie.id}`}>
        <h2 className="text-xl font-semibold my-3 whitespace-nowrap">{movie.title}</h2>
        <div className="grid gap-2">
          <div className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </Link>
      <div className="flex relative gap-10 mb-2">
            <h2 className="border border-gray-500 rounded-full w-fit bg-black text-sm font-semibold text-gray-400 p-2 flex flex-row-reverse items-center ml-auto space-x-reverse space-x-2 mt-3 " >
            <FaEye className="text-gray-400 " />{movie.vote_count}</h2>
        <div className="border border-gray-500 rounded-full w-fit bg-black text-sm font-semibold p-2 flex flex-row mt-3 text-red-500">★★★★☆ <span className="text-gray-500">{movie.vote_average}</span>
        </div>
        </div>
        </div>
  );
}

// Scroll functions with dynamic scrollId
function scrollLeft(scrollId) {
  const container = document.getElementById(scrollId);
  container.scrollBy({ left: -450, behavior: "smooth" });
}

function scrollRight(scrollId) {
  const container = document.getElementById(scrollId);
  container.scrollBy({ left: 450, behavior: "smooth" });
}
