"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import HeroSectionButtons from "./buttons/HeroSectionButtons";

const MovieHeroBanner = ({ movie, classes }) => {
  const router = useRouter(); 
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  if (isMobile === null) return null;

 
  const handleMovieClick = () => {
    router.push(`/movie/${movie.id}`);
  };


  const handleTrailerClick = () => {
    router.push(`/trailer/${movie.id}`);
  };

  return (
    <div id="herosection" className="mb-20 relative">
      <div className="image-wrapper rounded-[1rem]" onClick={handleMovieClick}>
        <Image
          src={
            isMobile
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
          }
          alt={movie.title || "Movie poster"}
          layout="responsive"
          width={isMobile ? 500 : 1280}
          height={isMobile ? 150 : 720}
          className="embla__slide__img"
          priority
        />
        <div className="gradient-overlay"></div>
      </div>
      <div className="embla__slide__content">
        <h2>{movie.title}</h2>
        <p className="hidden lg:block">{movie.overview}</p>
        <div className="flex justify-center">
          <HeroSectionButtons classes={classes} movieId={movie.id} />
        </div>
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        <button
          onClick={handleTrailerClick} >
        </button>
      </div>
    </div>
  );
};

export default MovieHeroBanner;
