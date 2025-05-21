import {useState} from "react";
import {useUser} from "@/app/context/UserContext";
import {
  addToFavorites,
  removeFromFavorites,
  addToWatchLater,
  removeFromWatchLater,
} from "../lib/services/profileService";
import {useRouter} from "next/navigation";

export function useMovieActions() {
  const {user, setUser} = useUser();
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const isInWatchLater = (movieId) => user?.watchLater?.some((movie) => movie.movieId === movieId);

  const isFavorite = (movieId) => user?.favorites?.some((movie) => movie.movieId === movieId);

  const toggleWatchLater = async ({movieId, title, thumbnail}) => {
    if (!user) {
      alert("Please login to add movies to Watch Later.");
      router.push("/auth/login");
      return;
    }

    if (updating) return;

    setUpdating(true);
    try {
      let updatedList;
      if (isInWatchLater(movieId)) {
        await removeFromWatchLater(movieId);
        updatedList = user.watchLater.filter((m) => m.movieId !== movieId);
      } else {
        await addToWatchLater({movieId, title, thumbnail});
        updatedList = [...(user.watchLater || []), {movieId, title, thumbnail}];
      }

      setUser({...user, watchLater: updatedList});
    } catch (error) {
      alert("Error updating Watch Later list");
    } finally {
      setUpdating(false);
    }
  };

  const toggleFavorites = async ({movieId, title, thumbnail}) => {
    if (!user) {
      alert("Please login to add movies to Favorites.");
      router.push("/auth/login");
      return;
    }

    if (updating) return;

    setUpdating(true);
    try {
      let updatedList;
      if (isFavorite(movieId)) {
        await removeFromFavorites(movieId);
        updatedList = user.favorites.filter((m) => m.movieId !== movieId);
      } else {
        await addToFavorites({movieId, title, thumbnail});
        updatedList = [...(user.favorites || []), {movieId, title, thumbnail}];
      }

      setUser({...user, favorites: updatedList});
    } catch (error) {
      alert("Error updating Favorites list");
    } finally {
      setUpdating(false);
    }
  };

  return {
    updating,
    isInWatchLater,
    isFavorite,
    toggleWatchLater,
    toggleFavorites,
  };
}
