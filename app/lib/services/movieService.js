import { fetchMovieDetails } from "@/app/hooks/useMovies";

export const fetchMoviesFromIds = async (movieIds) => {
  const movies = await Promise.all(movieIds.map((movieId) => fetchMovieDetails(movieId)));
  return movies.filter(Boolean);
};

export const getMovieReviews = async (movieId) => {
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "63782fbca0fe61390d79a5375d4d5b59";
  const BACKEND_API = "http://localhost:5000/api";

  try {
    // 1. Get reviews from  backend
    const backendRes = await fetch(`${BACKEND_API}/reviews/${movieId}`, {
      method: "GET",
      credentials: "include",
    });

    const backendData = await backendRes.json();
    if (!backendRes.ok) {
      throw new Error("Failed to fetch reviews from backend");
    }

    // 2. Get reviews from TMDB
    const tmdbRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}`);
    const tmdbData = await tmdbRes.json();



    const allReviews = [
      ...(backendData.results || []),
      ...(tmdbData.results || []).map((review) => ({
        author: review.author_details,
        content: review.content,
        created_at: review.created_at,
        source: "tmdb",
      })),
      ];

      

      console.log("all data :",allReviews);
    return allReviews;
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    throw new Error("Could not load movie reviews");
  }
};
