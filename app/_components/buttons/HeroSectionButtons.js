"use client";
import { useState, useEffect } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import supabase from "@/app/lib/supabaseClient";
import { updateUserFavorites, updateUserWatchlist } from "@/app/lib/services/profileService";

const HeroSectionButtons = ({ classes, movieId }) => {
  const [userLists, setUserLists] = useState({ watchlist: [], favorites: [] });


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profileData, error } = await supabase
            .from("users")
            .select("watchlist, favorites")
            .eq("email", user.email)
            .single();

          if (error) throw error;
          setUserLists({
            watchlist: profileData.watchlist || [],
            favorites: profileData.favorites || []
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [movieId]);

  const toggleWatchlist = async () => {
    const newWatchlist = userLists.watchlist.includes(movieId)
      ? userLists.watchlist.filter(id => id !== movieId)
      : [...userLists.watchlist, movieId];

    setUserLists(prev => ({ ...prev, watchlist: newWatchlist }));

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await updateUserWatchlist(user.email, newWatchlist);
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  };

  const toggleFavorites = async () => {
    const newFavorites = userLists.favorites.includes(movieId)
      ? userLists.favorites.filter(id => id !== movieId)
      : [...userLists.favorites, movieId];

    setUserLists(prev => ({ ...prev, favorites: newFavorites }));

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await updateUserFavorites(user.email, newFavorites);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const handleClick = () => {
    window.location.href = `/trailer/${movieId}`;
  };

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
            toggleWatchlist();
          }}
        >
          {userLists.watchlist.includes(movieId) ? (
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
