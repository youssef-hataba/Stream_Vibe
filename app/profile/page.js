"use client";

import {useState, useEffect, useCallback} from "react";
import {useRouter} from "next/navigation";
import supabase from "@/app/lib/supabaseClient";
import {fetchMovieDetails} from "@/app/hooks/useMovies";
import {Spinner1} from "../_components/Spinner";
import Section from "../_components/profile/Section";
import ProfileHeader from "../_components/profile/ProfileHeader";
import {updateUserFavorites, updateUserWatchlist} from "../lib/services/profileService";
import {fetchMoviesFromIds} from "../lib/services/movieService";

function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [ratings, setRatings] = useState({});

  const handleError = (error) => {
    console.error("Error:", error);
  };

  const fetchMoviesFromWatchlist = useCallback(async (movieIds) => {
    try {
      const movies = await Promise.all(movieIds.map((movieId) => fetchMovieDetails(movieId)));
      setWatchlistMovies(movies.filter(Boolean));
    } catch (error) {
      handleError(error);
    }
  }, []);

  const fetchMoviesFromFavorites = useCallback(async (movieIds) => {
    try {
      const movies = await Promise.all(movieIds.map((movieId) => fetchMovieDetails(movieId)));
      setFavoriteMovies(movies.filter(Boolean));
    } catch (error) {
      handleError(error);
    }
  }, []);

  const fetchRatedMovies = useCallback(async (ratingsData) => {
    try {
      const ratedMovieIds = Object.keys(ratingsData);
      const movies = await Promise.all(
        ratedMovieIds.map(async (movieId) => {
          const movie = await fetchMovieDetails(movieId);
          return {...movie, rating: ratingsData[movieId]};
        })
      );
      setRatedMovies(movies.filter(Boolean));
    } catch (error) {
      handleError(error);
    }
  }, []);

  const fetchUserProfile = useCallback(async () => {
    try {
      const {
        data: {user},
      } = await supabase.auth.getUser();
      if (user) {
        const {data: profileData, error} = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();

        if (error) return handleError(error);

        setProfile(profileData);
        if (profileData.watchlist?.length > 0) fetchMoviesFromWatchlist(profileData.watchlist);
        if (profileData.favorites?.length > 0) fetchMoviesFromFavorites(profileData.favorites);
        if (profileData.ratings) {
          setRatings(profileData.ratings);
          fetchRatedMovies(profileData.ratings);
        }
      }
    } catch (error) {
      handleError(error);
    }
  }, [fetchMoviesFromFavorites, fetchMoviesFromWatchlist, fetchRatedMovies]);

  const handleAddToWatchlist = async (movieId) => {
    try {
      const updatedWatchlist = [...(profile.watchlist || []), movieId];
      await updateUserWatchlist(profile.email, updatedWatchlist);
      setProfile({...profile, watchlist: updatedWatchlist});
      setWatchlistMovies(await fetchMoviesFromIds(updatedWatchlist));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      const updatedWatchlist = (profile.watchlist || []).filter((id) => id !== movieId);
      await updateUserWatchlist(profile.email, updatedWatchlist);
      setProfile({...profile, watchlist: updatedWatchlist});
      setWatchlistMovies(await fetchMoviesFromIds(updatedWatchlist));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddToFavorites = async (movieId) => {
    try {
      const updatedFavorites = [...(profile.favorites || []), movieId];
      await updateUserFavorites(profile.email, updatedFavorites);
      setProfile({...profile, favorites: updatedFavorites});
      setFavoriteMovies(await fetchMoviesFromIds(updatedFavorites));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveFromFavorites = async (movieId) => {
    try {
      const updatedFavorites = (profile.favorites || []).filter((id) => id !== movieId);
      await updateUserFavorites(profile.email, updatedFavorites);
      setProfile({...profile, favorites: updatedFavorites});
      setFavoriteMovies(await fetchMoviesFromIds(updatedFavorites));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <div className="text-gray-80">
      <div>
        <div>
          <ProfileHeader name={profile?.name} email={profile?.email} handleLogout={handleLogout} />
        </div>
        {profile ? (
          <div>
            <Section
              title="Watchlist"
              movies={watchlistMovies}
              favoriteMovies={favoriteMovies}
              watchlistMovies={watchlistMovies}
              ratings={ratings}
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
              ratings={ratings}
              handleAddToWatchlist={handleAddToWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              handleAddToFavorites={handleAddToFavorites}
              handleRemoveFromFavorites={handleRemoveFromFavorites}
            />
            <Section
              title="Ratings"
              movies={ratedMovies}
              favoriteMovies={favoriteMovies}
              watchlistMovies={watchlistMovies}
              ratings={ratings}
              handleAddToWatchlist={handleAddToWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              handleAddToFavorites={handleAddToFavorites}
              handleRemoveFromFavorites={handleRemoveFromFavorites}
            />
          </div>
        ) : (
          <Spinner1 />
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
