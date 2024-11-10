"use client";

import {MediaActions} from "@/app/_components/Buttons";
import {useState, useEffect} from "react";
import Link from "next/link";

import Image from "next/image";

const MovieHeroBanner = ({movie,classes}) => {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  console.log(movie)

  return (
    <div className="mb-20 relative">
      <Link href={`/movie/${movie.id}`}>
        <div className="image-wrapper  rounded-[1rem] ">
          <Image
            src={
              isMobile
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` // Mobile image
                : `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` // Desktop image
            }
            alt={movie.title || "Movie poster"}
            layout="responsive"
            width={isMobile ? 500 : 1280} // Set width based on device
            height={isMobile ? 150 : 720} // Set height based on device
            className="embla__slide__img"
            priority
          />
          <div className="gradient-overlay"></div>
        </div>
        <div className="embla__slide__content ">
          <h2>{movie.title}</h2>
          <p className="hidden lg:block ">{movie.overview}</p>
          <div className="flex justify-center">
            <MediaActions classes={classes} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieHeroBanner;
