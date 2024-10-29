"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import EmblaCarouselComponent from "../_components/EmblaCarousel";

const OPTIONS = { loop: true };
const API_KEY = "79943043be1e365cc73bf3ac4a4e51cb";

const Page = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch popular movies from TMDB
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results.slice(0, 5)); // Only take the first 5 movies
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Welcome to Stream-Vibe</h1>
      <EmblaCarouselComponent slides={movies} options={OPTIONS} />
    </div>
  );
};

export default Page;