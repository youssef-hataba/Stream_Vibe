// hooks/useMovies.js

import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "63782fbca0fe61390d79a5375d4d5b59";
const BASE_URL = "https://api.themoviedb.org/3";

export const useFetchMovies = (categoryPath) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${categoryPath}`, {
          params: { api_key: API_KEY },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error(`Error fetching movies:`, error);
      }
    };

    fetchMovies();
  }, [categoryPath]);

  return movies;
};

export const useFetchMovieDetails = (movieId) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: { api_key: API_KEY },
        });
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return movieDetails;
};
