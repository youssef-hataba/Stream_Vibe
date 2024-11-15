"use client";
import { useEffect, useState } from "react";
import { fetchMovieTrailer } from '@/app/hooks/useMovies';

export default function TrailerPage({ params }) {
  const { movieId } = params;
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      const url = await fetchMovieTrailer(movieId);
      setTrailerUrl(url);
    };
    fetchTrailer();
  }, [movieId]);

  return (
    <div className="flex justify-center text-center">
      <h1>Movie Trailer</h1>
      {trailerUrl ? (
        <iframe
          width="1080"
          height="500"
          src={trailerUrl}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Trailer not available</p>
      )}
    </div>
  );
}