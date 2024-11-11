import axios from "axios";

const API_KEY = "63782fbca0fe61390d79a5375d4d5b59";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: API_KEY },
    });
    return response.data.genres; // Returns array of categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchMoviesByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: categoryId,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};