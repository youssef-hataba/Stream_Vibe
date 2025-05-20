"use client";

import { useState, useEffect } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { useUser } from "../../context/UserContext";

import {
  addToFavorites,
  removeFromFavorites,
  addToWatchLater,
  removeFromWatchLater,
} from "@/app/lib/services/profileService";

const HeroSectionButtons = ({ classes, movieId, title, thumbnail }) => {
  const { user, loading } = useUser();

  const [userLists, setUserLists] = useState({ watchLater: [], favorites: [] });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setUserLists({
        watchLater: user.watchLater?.map(item => item.movieId) || [],
        favorites: user.favorites?.map(item => item.movieId) || [],
      });
    } else {
      setUserLists({ watchLater: [], favorites: [] });
    }
  }, [user]);

  const toggleWatchLater = async () => {
    if (!user) return alert("Please log in to manage your watch later list");
    if (updating) return;

    const isInWatchLater = userLists.watchLater.includes(movieId);

    setUpdating(true);
    try {
      if (isInWatchLater) {
        await removeFromWatchLater(movieId);
        setUserLists(prev => ({
          ...prev,
          watchLater: prev.watchLater.filter(id => id !== movieId),
        }));
      } else {
        await addToWatchLater({ movieId, title, thumbnail });
        setUserLists(prev => ({
          ...prev,
          watchLater: [...prev.watchLater, movieId],
        }));
      }
    } catch (error) {
      alert("Failed to update watch later list");
    } finally {
      setUpdating(false);
    }
  };

  const toggleFavorites = async () => {
    if (!user) return alert("Please log in to manage your favorites");
    if (updating) return;

    const isFavorite = userLists.favorites.includes(movieId);

    setUpdating(true);
    try {
      if (isFavorite) {
        await removeFromFavorites(movieId);
        setUserLists(prev => ({
          ...prev,
          favorites: prev.favorites.filter(id => id !== movieId),
        }));
      } else {
        await addToFavorites({ movieId, title, thumbnail });
        setUserLists(prev => ({
          ...prev,
          favorites: [...prev.favorites, movieId],
        }));
      }
    } catch (error) {
      alert("Failed to update favorites");
    } finally {
      setUpdating(false);
    }
  };

  const handleClick = () => {
    window.location.href = `/trailer/${movieId}`;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      <button
        onClick={handleClick}
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
            toggleWatchLater();
          }}
          disabled={updating}
          title={userLists.watchLater.includes(movieId) ? "Remove from watch later" : "Add to watch later"}
        >
          {userLists.watchLater.includes(movieId) ? (
            <BsBookmarkFill className="text-yellow-600 duration-200 transition-all transform group-hover:scale-125" size={18} />
          ) : (
            <BsBookmark className="duration-200 transition-all transform group-hover:scale-125" size={18} />
          )}
        </button>

        <button
          className="w-[3rem] h-[3rem] bg-black-6 rounded-lg flex items-center justify-center group"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorites();
          }}
          disabled={updating}
          title={userLists.favorites.includes(movieId) ? "Remove from favorites" : "Add to favorites"}
        >
          <FaHeart
            className={`duration-200 transition-all transform group-hover:scale-125 ${
              userLists.favorites.includes(movieId) ? "text-red-45" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default HeroSectionButtons;
