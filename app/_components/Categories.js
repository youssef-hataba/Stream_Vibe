"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "63782fbca0fe61390d79a5375d4d5b59";
const BASE_URL = "https://api.themoviedb.org/3";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: { api_key: API_KEY },
      });
      setCategories(response.data.genres);
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-8 bg-black-8 min-h-scre text-white relative">
      <h1 className="text-4xl font-bold mb-8">Movies Categories</h1>

      {/* Scroll button on the top-right */}
      <div className="absolute top-4 right-4 bg-black p-3 rounded-md flex space-x-2 z-10">
        <button
          className="bg-[#1F1F1F] hover:bg-gray-600 p-2 rounded-md"
          onClick={() => scrollLeft()}
        >
          &larr;
        </button>
        <button
          className="bg-[#1F1F1F] hover:bg-gray-600 p-2 rounded-md"
          onClick={() => scrollRight()}
        >
          &rarr;
        </button>
      </div>

      {/* Scrollable container */}
      <div
        id="scrollContainer"
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth mt-12"
      >

      {/* For lopping into movies */}
        {categories.map((genre) => (
          <CategoryCard key={genre.id} genre={genre} />
        ))}
      </div>
    </div>
  );
}

// Category Card Component
function CategoryCard({ genre }) {
  return (
    <div className="bg-black-10 rounded-lg p-4 min-w-[250px] shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{genre.name}</h2>
      <MoviesByCategory categoryId={genre.id} />
    </div>
  );
}

// Movies by Category Component
function MoviesByCategory({ categoryId }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            with_genres: categoryId,
          },
        });
        setMovies(response.data.results.slice(0, 4));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [categoryId]);

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
  container.scrollBy({ left: -300, behavior: "smooth" });
}

function scrollRight() {
  const container = document.getElementById("scrollContainer");
  container.scrollBy({ left: 300, behavior: "smooth" });
}