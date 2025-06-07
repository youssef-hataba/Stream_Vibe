import Link from "next/link";
import {FaStar} from "react-icons/fa";
import {BsBookmark, BsBookmarkFill} from "react-icons/bs";
import {FaRegHeart, FaHeart} from "react-icons/fa";
import Image from "next/image";

export default function MovieCard({
  movie,
  isInWatchlist,
  isFavorite,
  toggleWatchLater,
  toggleFavorites,
  updating,
  userRating,
}) {
  return (
    <div className="bg-black-10 w-[200px] overflow-hidden shrink-0 relative rounded-sm">
      <Link href={`/movie/${movie.movieId}`}>
        <div className="overflow-hidden relative">
          {isInWatchlist ? (
            <BsBookmarkFill
              className="absolute top-1 left-1 text-yellow-600 cursor-pointer"
              size={32}
              onClick={(e) => {
                e.preventDefault();
                if (!updating) toggleWatchLater(movie);
              }}
            />
          ) : (
            <BsBookmark
              className="absolute top-1 left-1 text-yellow-600 cursor-pointer"
              size={32}
              onClick={(e) => {
                e.preventDefault();
                if (!updating) toggleWatchLater(movie);
              }}
            />
          )}
          {isFavorite ? (
            <FaHeart
              className="absolute top-1 right-1 text-red-45 cursor-pointer"
              size={22}
              onClick={(e) => {
                e.preventDefault();
                if (!updating) toggleFavorites(movie);
              }}
            />
          ) : (
            <FaRegHeart
              className="absolute top-1 right-1 text-red-45 cursor-pointer"
              size={22}
              onClick={(e) => {
                e.preventDefault();
                if (!updating) toggleFavorites(movie);
              }}
            />
          )}
          <Image
            src={`${movie.thumbnail}`}
            alt={movie.title}
            width={500}
            height={500}
            className="w-full object-cover"
          />
        </div>

        <div className="my-2 flex flex-col gap-2 px-1.5 relative justify-between text-sm text-gray-60 font-semibold">
          <div className="overflow-hidden">
            <h2 className="cursor-text text-base font-semibold whitespace-nowrap">{movie.title}</h2>
          </div>

          <div className="flex items-center justify-between gap-5">
            <span className="flex items-center gap-1" title="IMDb Rating">
              <FaStar className="text-red-45" />
              <span>{(movie.vote_average / 2).toFixed(1)}</span>
            </span>
            {userRating !== null && userRating !== undefined && (
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
