import axios from "axios";

const API_KEY = "63782fbca0fe61390d79a5375d4d5b59";
const BASE_URL = "https://api.themoviedb.org/3";

// To show only 95 word in biography
const truncateBiography = (biography, wordLimit) => {
  if (!biography) return ''; 
  const words = biography.split(' ');
  if (words.length <= wordLimit) return biography;
  return words.slice(0, wordLimit).join(' ') + '...'; 
};

// Fetch Actor's Data
export const fetchActorDetails = async (actorId) => {
    try {
      const res = await fetch(`${BASE_URL}/person/${actorId}?api_key=${API_KEY}&append_to_response=movie_credits`);
      if (!res.ok) throw new Error("Failed to fetch actor details");
      const data = await res.json();
      
      const truncatedBiography = truncateBiography(data.biography, 95);
      
      return { ...data, biography: truncatedBiography }; 
    } catch (error) {
      console.error(error);
      return null;
    }
};
