import Link from "next/link";
import {FaStar} from "react-icons/fa";
import {BsBookmark, BsBookmarkFill} from "react-icons/bs";
import {FaRegHeart, FaHeart} from "react-icons/fa";



export default function MovieCard({
  movie,
  isInWatchlist,
  isFavorite,
  userRating,
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
  handleAddToFavorites,
  handleRemoveFromFavorites,
}) {

  return (
    <div className={`bg-black-10 w-[170px] overflow-hidden shrink-0`}>
      <Link href={`/movie/${movie.id}`}>
        <div className="overflow-hidden relative">
          {isInWatchlist ? (
            <BsBookmarkFill
              className="absolute top-1 left-1 text-yellow-600"
              size={32}
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation
                handleRemoveFromWatchlist(movie.id); // Call remove function here
              }}
            />
          ) : (
            <BsBookmark
              className="absolute top-1 left-1 text-yellow-600 cursor-pointer"
              size={32}
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation
                handleAddToWatchlist(movie.id);
              }}
            />
          )}
          {isFavorite ? (
            <FaHeart
              className={`absolute top-1 right-1 text-red-45`}
              size={22}
              onClick={(e) => {
                e.preventDefault();
                handleRemoveFromFavorites(movie.id);
              }}
            />
          ) : (
            <FaRegHeart
              className={`absolute top-1 right-1 text-red-45`}
              size={22}
              onClick={(e) => {
                e.preventDefault();
                handleAddToFavorites(movie.id);
              }}
            />
          )}
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full object-cover"
          />
        </div>

        <div className="my-2 flex flex-col gap-2 px-1.5 relative justify-between text-sm text-gray-60 font-semibold">
        <div className="overflow-hidden">
          <h2 className="cursor-text text-base font-semibold whitespace-nowrap">{movie.title}</h2>
        </div>
        
          <div className="flex items-center justify-between gap-5">
            <span className="flex text-red-45 gap-1 items-center">
              <FaStar />
              <span className="text-gray-60">{(movie.vote_average / 2).toFixed(1)}</span>
            </span>
            {userRating && (
              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-600" />
                <span>{userRating}</span>
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
