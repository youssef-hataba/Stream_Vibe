
// Add to favorites
export const addToFavorites = async (movie) => {
  const res = await fetch("http://localhost:5000/api/user/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(movie), // movie = { movieId, title, thumbnail }
  });

  if (!res.ok) {
    throw new Error("Failed to add to favorites");
  }

  return res.json();
};

// Remove from favorites
export const removeFromFavorites = async (movieId) => {
  const res = await fetch(`http://localhost:5000/api/user/favorites/${movieId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to remove from favorites");
  }

  return res.json();
};

// Add to watch later
export const addToWatchLater = async (movie) => {
  const res = await fetch("http://localhost:5000/api/user/watchlater", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(movie),
  });

  if (!res.ok) {
    throw new Error("Failed to add to watch later");
  }

  return res.json();
};

// Remove from watch later
export const removeFromWatchLater = async (movieId) => {
  const res = await fetch(`http://localhost:5000/api/user/watchlater/${movieId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to remove from watch later");
  }

  return res.json();
};


// export const updateUserRatings = async (email, movieId, userRating) => {

//   const { data, error: fetchError } = await supabase
//     .from("users")
//     .select("ratings")
//     .eq("email", email)
//     .single();

//   if (fetchError) throw fetchError;

//   const currentRatings = data.ratings || {};

//   const updatedRatings = { ...currentRatings, [movieId]: userRating };

//   const { error: updateError } = await supabase
//     .from("users")
//     .update({ ratings: updatedRatings })
//     .eq("email", email);

//   if (updateError) throw updateError;
// };
