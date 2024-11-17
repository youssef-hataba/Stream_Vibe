"use client";

import Link from "next/link";
import { FaRegStar, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import StarRating from "./StarRating";

function MovieCard({ movie, style }) {
  if (!movie) return null; // Handle null/undefined movie object

  return (
    <motion.div
      className="bg-black-10 rounded-lg px-4 min-w-[240px] overflow-hidden relative"
    >
      {/* Original movie card content */}
      <Link href={`/movie/${movie.id}`}>
        <motion.div className="overflow-hidden">
          <h2 className="cursor-text text-l font-semibold my-3 whitespace-nowrap overflow-x-auto scrollbar-hide">
            {movie.title}
          </h2>
          <motion.img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/path/to/fallback/image.jpg'}
            alt={movie.title}
            className="w-full rounded-lg object-cover"
          />
          <motion.div className="flex relative my-3 justify-between text-sm text-gray-60">
            <h2 className="border border-black-15 rounded-full p-2 flex items-center gap-1">
              {formatNumber(movie.popularity)}
              <FaEye />
            </h2>
            <motion.div className="border border-black-15 rounded-full p-2 flex flex-row text-red-500 gap-1 items-center justify-center">
              {movie.vote_average > 0 ? (
                <StarRating
                  actualRating={movie.vote_average / 1.95}
                  StartStyle="w-[14px] h-[5px] bg-blue flex items-center bg-black-8"
                  pStyle="hidden"
                />
              ) : (
                <span className="flex items-center">
                  <FaRegStar className="inline-block" />
                  <FaRegStar className="inline-block" />
                  <FaRegStar className="inline-block" />
                  <FaRegStar className="inline-block" />
                  <FaRegStar className="inline-block" />
                </span>
              )}
              <span className="text-gray-60">{parseFloat(movie.vote_average.toFixed(1)) / 2}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </Link>

      {/* Movie details card (animated with movement and fantastic effect) */}
      <Link href={`/movie/${movie.id}`}>
      <motion.div
        className="bg-black-10 absolute top-0 left-0 right-0 bottom-0 rounded-lg flex items-center justify-center p-4"
        initial={{ opacity: 0, scale: 0.95, rotate: 30 ,x:0 , y:0 }} // Start with small scale, and some offset
        whileHover={{
          opacity: 1,           
          scale: 1,                 
          rotate: 0,         
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <div className="text-center w-full h-full flex flex-col justify-between py-4">
          <h3 className="text-xl font-semibold text-red-50">{movie.title}</h3>
          <p className="text-sm my-4 text-justify text-gray-70">
          {movie.overview.split(" ").slice(0, 65).join(" ")}{movie.overview.split(" ").length > 65 && "..."}
          </p>
          <div className="flex flex-col gap-2 text-gray-300">
            <span className="text-gray-60"><strong className="text-yellow-600">Release Date:</strong> {movie.release_date}</span>
          </div>
        </div>
      </motion.div>
      </Link>
    </motion.div>
  
  );
}

export function formatNumber(number) {
  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(1)}M`;
  }
  if (number >= 1_000) {
    return `${(number / 1_000).toFixed(1)}K`;
  }
  return parseFloat(number.toFixed());
}

export default MovieCard;
