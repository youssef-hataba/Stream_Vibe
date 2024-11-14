"use client";
import {useEffect, useState} from "react";
import axios from "axios";
import EmblaCarouselComponent from "./EmblaCarousel";
import { Spinner1 } from "./Spinner";

const OPTIONS = {loop: true};
const API_KEY = "79943043be1e365cc73bf3ac4a4e51cb";

const MovieSlider = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="h-[100%] m-0">
      {loading ? <Spinner1 /> : <EmblaCarouselComponent slides={movies} options={OPTIONS} />}
    </div>
  );
};

export default MovieSlider;
