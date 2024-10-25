"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "63782fbca0fe61390d79a5375d4d5b59";
const BASE_URL = "https://api.themoviedb.org/3";

// Trending Movies Component
export default function TrendingSection() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
          params: { api_key: API_KEY },
        });
        setTrends(response.data.results);
      } catch (error) {
        console.error("Error fetching trends:", error);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div className="p-8 bg-[#1F1F1F] min-h-screen text-white relative">
      <h1 className="text-4xl font-bold mb-8">Trending Now</h1>

      {/* Scroll buttons */}
      <div className="absolute top-4 right-4 bg-black p-3 rounded-md flex space-x-2 z-10">
        <button
          className="bg-[#1F1F1F] hover:bg-gray-600 p-2 rounded-md"
          onClick={scrollLeft}
        >
          &larr;
        </button>
        <button
          className="bg-[#1F1F1F] hover:bg-gray-600 p-2 rounded-md"
          onClick={scrollRight}
        >
          &rarr;
        </button>
      </div>

      {/* Scrollable container */}
      <div
        id="scrollCont"
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth mt-12"
      >
        {trends.map((trendig) => (
          <TrendingCard key={trendig.id} trendig={trendig} />
        ))}
      </div>
    </div>
  );
}

// Trending Card Component
function TrendingCard({ trendig }) {
  return (
    <div className="bg-[#333333] rounded-lg p-4 min-w-[250px] shadow-lg">
      <h2 className="text-xl font-semibold mb-4">{trendig.title}</h2>
      <TrendingMovies trendId={trendig.id} />
    </div>
  );
}

// Movies by Category Component (with runtime and vote_count)
function TrendingMovies({ trendId }) {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${trendId}`, {
          params: { api_key: API_KEY },
        });
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [trendId]);

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <div className="grid gap-4">
      <div className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="w-full rounded-lg object-cover"
        />
      </div>
      <div className="text-white mt-2">
        <p><strong>Duration:</strong> {movieDetails.runtime} mins</p>
        <p><strong>Viewers:</strong> {movieDetails.vote_count} votes</p>
      </div>
    </div>
  );
}

// Scroll functions
function scrollLeft() {
  const container = document.getElementById("scrollCont");
  container.scrollBy({ left: -300, behavior: "smooth" });
}

function scrollRight() {
  const container = document.getElementById("scrollCont");
  container.scrollBy({ left: 300, behavior: "smooth" });
}
