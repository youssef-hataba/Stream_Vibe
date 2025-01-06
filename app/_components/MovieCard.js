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
