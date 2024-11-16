import supabase from "@/app/lib/supabaseClient";

export const getUserProfile = async (email) => {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single();
  if (error) throw error;
  return data;
};


export const updateUserWatchlist = async (email, watchlist) => {
  const { error } = await supabase.from("users").update({ watchlist }).eq("email", email);
  if (error) throw error;
};


export const updateUserFavorites = async (email, favorites) => {
  const { error } = await supabase.from("users").update({ favorites }).eq("email", email);
  if (error) throw error;
};


export const updateUserRatings = async (email, movieId, userRating) => {

  const { data, error: fetchError } = await supabase
    .from("users")
    .select("ratings")
    .eq("email", email)
    .single();

  if (fetchError) throw fetchError;

  const currentRatings = data.ratings || {};

  const updatedRatings = { ...currentRatings, [movieId]: userRating };

  const { error: updateError } = await supabase
    .from("users")
    .update({ ratings: updatedRatings })
    .eq("email", email);

  if (updateError) throw updateError;
};
