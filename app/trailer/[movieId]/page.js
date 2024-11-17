"use client";
import React from 'react'; 
import { useEffect, useState } from "react";
import { fetchMovieTrailer } from '@/app/hooks/useMovies';
import { Spinner1 } from '@/app/_components/Spinner';



export default   function TrailerPage({ params }) {
  const { movieId } = React.use(params);
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
          <Spinner1/>
      )}
    </div>
  );
}