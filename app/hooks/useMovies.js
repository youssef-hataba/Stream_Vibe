import axios from "axios";

const API_KEY = "63782fbca0fe61390d79a5375d4d5b59";
const BASE_URL = "https://api.themoviedb.org/3";
const YOUTUBE_API_KEY =' AIzaSyBeFXu14AWzzOA2q6MWMdgqtppBNLHghUQ ';

// Fetch Movies by Category
export async function fetchMovies(categoryPath) {
  try {
    const response = await axios.get(`${BASE_URL}${categoryPath}`, {
      params: { api_key: API_KEY },
    });
    return response.data.results || [];
  } catch (error) {
    console.error(`Error fetching movies:`, error.message);
    return [];
  }
}

// Fetch Movie Details
export async function fetchMovieDetails(movieId) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: { api_key: API_KEY },
    });
    return response.data || null;
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    return null;
  }
}

// Fetch Movie Cast
export async function fetchMovieCast(movieId) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: { api_key: API_KEY },
    });
    // Filter and limit the cast
    return response.data.cast
      .filter((actor) => actor.profile_path)
      .slice(0, 10);
  } catch (error) {
    console.error("Error fetching movie cast:", error.message);
    return [];
  }
}

// Fetch Suggested Movies
export async function fetchSuggestedMovies(movieId) {
  if (!movieId) return [];
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/recommendations`,
      {
        params: { api_key: API_KEY },
      }
    );
    return response.data.results || [];
  } catch (error) {
    console.error(`Error fetching suggested movies:`, error.message);
    return [];
  }
}

// Fetch Movie Trailer
export async function fetchMovieTrailer(movieId) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      params: { api_key: API_KEY },
    });

    const trailers = response.data.results.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    return trailers.length > 0
      ? `https://www.youtube.com/embed/${trailers[0].key}`
      : null;
  } catch (error) {
    console.error("Error fetching movie trailer:", error.message);
    return null;
  }
}

