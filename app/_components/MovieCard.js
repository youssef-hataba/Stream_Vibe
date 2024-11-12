import Link from "next/link";
import {FaEye} from "react-icons/fa";
import StarRating from "./StarRating";

function MovieCard({movie}) {
  return (
    <div className="bg-black-10 hover:animate-shadow-black bg-black-500 rounded-lg px-4 min-w-[240px] 
    overflow-hidden">
      <Link href={`/movie/${movie.id}`}>
      <div className="overflow-hidden">
        <h2 className="cursor-text text-l font-semibold my-3 whitespace-nowrap overflow-x-auto scrollbar-hide">{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg object-cover"
            />
        </div>
      
      <div className="flex relative my-3 justify-between text-sm text-gray-60 before: font-semibold ">
        <h2 className="border border-black-15 rounded-full p-2 flex items-center gap-1">
          {formatNumber(movie.popularity)}
          <FaEye />
        </h2>
        <div
          className="border border-black-15 rounded-full p-2 flex flex-row text-red-45 gap-1 items-center justify-center">
          <StarRating
            actualRating={(movie.vote_average / 1.95)}
            StartStyle="w-[14px] h-[5px] bg-blue flex items-center bg-black-8"
            pStyle="hidden"
          />
          <span className="text-gray-60">{parseFloat(movie.vote_average.toFixed(1)) / 2}</span>
        </div>
      </div>
      </Link>
    </div>
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
