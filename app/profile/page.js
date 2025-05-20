"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { Spinner1 } from "../_components/Spinner";
import Section from "../_components/profile/Section";
import ProfileHeader from "../_components/profile/ProfileHeader";
import {
  addToFavorites,
  removeFromFavorites,
  addToWatchLater,
  removeFromWatchLater,
} from "../lib/services/profileService";

function ProfilePage() {
  const router = useRouter();
  const { user, setUser, loading } = useUser();

  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const handleError = (error) => {
    console.error("Error:", error);
  };

  useEffect(() => {
    if (!user) return;

    if (user.watchLater?.length > 0) {
      setWatchlistMovies(user.watchLater);
    }

    if (user.favorites?.length > 0) {
      setFavoriteMovies(user.favorites);
    }

  }, [user]);

  const handleAddToWatchlist = async (movie) => {
    try {
      await addToWatchLater(movie);
      const updatedList = [...(watchlistMovies || []), movie];
      setWatchlistMovies(updatedList);
      setUser({ ...user, watchLater: updatedList });
    } catch (error) {
      handleError(error);
    }
  };

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      await removeFromWatchLater(movieId);
      const updatedList = (watchlistMovies || []).filter(
        (movie) => movie.movieId !== movieId
      );
      setWatchlistMovies(updatedList);
      setUser({ ...user, watchLater: updatedList });
    } catch (error) {
      handleError(error);
    }
  };

  const handleAddToFavorites = async (movie) => {
    try {
      await addToFavorites(movie);
      const updatedList = [...(favoriteMovies || []), movie];
      setFavoriteMovies(updatedList);
      setUser({ ...user, favorites: updatedList });
    } catch (error) {
      handleError(error);
    }
  };

  const handleRemoveFromFavorites = async (movieId) => {
    try {
      await removeFromFavorites(movieId);
      const updatedList = (favoriteMovies || []).filter(
        (movie) => movie.movieId !== movieId
      );
      setFavoriteMovies(updatedList);
      setUser({ ...user, favorites: updatedList });
    } catch (error) {
      handleError(error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      router.push("/");
    } catch (error) {
      handleError(error);
    }
  };

  if (loading) return <Spinner1 />;

  return (
    <div className="text-gray-80">
      <div>
        <ProfileHeader
          name={user?.firstName + " " + user?.lastName}
          email={user?.email}
          handleLogout={handleLogout}
        />
        <Section
          title="Watchlist"
          movies={watchlistMovies}
          favoriteMovies={favoriteMovies}
          watchlistMovies={watchlistMovies}
          handleAddToWatchlist={handleAddToWatchlist}
          handleRemoveFromWatchlist={handleRemoveFromWatchlist}
          handleAddToFavorites={handleAddToFavorites}
          handleRemoveFromFavorites={handleRemoveFromFavorites}
        />
        <Section
          title="Favorites"
          movies={favoriteMovies}
          favoriteMovies={favoriteMovies}
          watchlistMovies={watchlistMovies}
          handleAddToWatchlist={handleAddToWatchlist}
          handleRemoveFromWatchlist={handleRemoveFromWatchlist}
          handleAddToFavorites={handleAddToFavorites}
          handleRemoveFromFavorites={handleRemoveFromFavorites}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
