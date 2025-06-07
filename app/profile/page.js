"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useUser} from "../context/UserContext";
import {Spinner1} from "../_components/Spinner";
import Section from "../_components/profile/Section";
import ProfileHeader from "../_components/profile/ProfileHeader";
import {useMovieActions} from "../hooks/useMoviesAction";

function ProfilePage() {
  const router = useRouter();
  const { user, setUser, reviews, loading } = useUser();
  const {updating, isInWatchLater, isFavorite, toggleWatchLater, toggleFavorites} =
    useMovieActions();

  // Redirect if user logs out or not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading && !user) return <Spinner1 />;

  const sections = [
    {title: "Watchlist", movies: user?.watchLater || []},
    {title: "Favorites", movies: user?.favorites || []},
  ];

  console.log("User data:", reviews);

  return (
    <div className="text-gray-80">
      <ProfileHeader
        name={`${user?.firstName} ${user?.lastName}`}
        email={user?.email}
        handleLogout={handleLogout}
      />

      {sections.map(({title, movies}) => (
        <Section
          key={title}
          title={title}
          movies={movies}
          reviews={reviews || []}
          favoriteMovies={user?.favorites || []}
          watchlistMovies={user?.watchLater || []}
          isInWatchLater={isInWatchLater}
          isFavorite={isFavorite}
          toggleWatchLater={toggleWatchLater}
          toggleFavorites={toggleFavorites}
          updating={updating}
        />
      ))}
    </div>
  );
}

export default ProfilePage;
