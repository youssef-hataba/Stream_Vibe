"use client";

import {BsBookmark, BsBookmarkFill} from "react-icons/bs";
import {FaHeart} from "react-icons/fa";
import {FaPlay} from "react-icons/fa6";
import {useUser} from "../../context/UserContext";
import {useMovieActions} from "@/app/hooks/useMoviesAction";

const HeroSectionButtons = ({classes, movieId, title, thumbnail}) => {
  const {user, loading} = useUser();
  const {updating, isInWatchLater, isFavorite, toggleWatchLater, toggleFavorites} =
    useMovieActions();

  const handlePlay = () => {
    window.location.href = `/trailer/${movieId}`;
  };

  if (loading) return <p>Loading...</p>;

  const watchLaterStatus = isInWatchLater(movieId);
  const favoriteStatus = isFavorite(movieId);

  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      <button
        onClick={handlePlay}
        className={`bg-red-45 flex text-white gap-2 justify-center rounded-lg 
                items-center w-[19.5rem] lg:w-[8rem] h-[3rem] group ${classes}`}>
        <FaPlay />
        Play Now
      </button>

      <div className="flex gap-4 justify-center">
        <button
          className="w-[3rem] h-[3rem] bg-black-6 rounded-lg flex items-center justify-center group"
          onClick={(e) => {
            e.preventDefault();
            toggleWatchLater({movieId, title, thumbnail});
          }}
          disabled={updating}
          title={watchLaterStatus ? "Remove from watch later" : "Add to watch later"}>
          {watchLaterStatus ? (
            <BsBookmarkFill
              className="text-yellow-600 duration-200 transition-all transform group-hover:scale-125"
              size={18}
            />
          ) : (
            <BsBookmark
              className="duration-200 transition-all transform group-hover:scale-125"
              size={18}
            />
          )}
        </button>

        <button
          className="w-[3rem] h-[3rem] bg-black-6 rounded-lg flex items-center justify-center group"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorites({movieId, title, thumbnail});
          }}
          disabled={updating}
          title={favoriteStatus ? "Remove from favorites" : "Add to favorites"}>
          <FaHeart
            className={`duration-200 transition-all transform group-hover:scale-125 ${
              favoriteStatus ? "text-red-45" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default HeroSectionButtons;
