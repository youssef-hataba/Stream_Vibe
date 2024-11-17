"use client";
import React from 'react'; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchMovieTrailer } from '@/app/hooks/useMovies';
import { Spinner1 } from '@/app/_components/Spinner';
import { PrevButton } from '@/app/_components/buttons/Buttons';



export default   function TrailerPage({ params }) {
  const { movieId } = React.use(params);
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await params;
      setMovieId(resolvedParams.movieId); 
    }

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (movieId) {
      const fetchTrailer = async () => {
        const url = await fetchMovieTrailer(movieId);
        setTrailerUrl(url);
      };
      fetchTrailer();
    }
  }, [movieId]);

  const handlePrevPage = () => {
    router.push(`/movie/${movieId}`); 
  };

  return (
    <div className="flex gap-4 justify-center text-center">
      <PrevButton onClick={handlePrevPage} />
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
