"use client";

import { useFetchCategories, useFetchMoviesByCategory } from "../hooks/useCategories"; 
import { PrevButton ,NextButton } from "./Buttons";


export default function CategoriesSection() {
  const categories = useFetchCategories();

  return (
    <div className="bg-black-8 mt-20 text-white relative">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Movies Categories</h1>

        {/* Scroll buttons */}
        <div className="flex gap-4">
          <PrevButton onClick={() => scrollLeft()} />
          <NextButton onClick={() => scrollRight()} />
        </div>
      </div>

      {/* Scrollable container */}
      <div
        id="scrollContainer"
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth mt-12"
      >
        {/* Looping through categories */}
        {categories.map((genre) => (
          <CategoryCard key={genre.id} genre={genre} />
        ))}
      </div>
    </div>
  );
}

// Category Card Component
function CategoryCard({ genre }) {
  const movies = useFetchMoviesByCategory(genre.id);

  return (
    <div className="bg-black-10 rounded-lg p-4 min-w-[250px] shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{genre.name}</h2>
      <MoviesDisplay movies={movies} />
    </div>
  );
}

// Movies Display Component
function MoviesDisplay({ movies }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg object-cover"
          />
        </div>
      ))}
    </div>
  );
}

// JavaScript functions for smooth scrolling
function scrollLeft() {
  const container = document.getElementById("scrollContainer");
  container.scrollBy({ left: -450, behavior: "smooth" });
}

function scrollRight() {
  const container = document.getElementById("scrollContainer");
  container.scrollBy({ left: 450, behavior: "smooth" });
}
