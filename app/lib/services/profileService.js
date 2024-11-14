import supabase from "@/app/lib/supabaseClient";

export const getUserProfile = async (email) => {
  const { data, error } = await supabase.from("Users").select("*").eq("email", email).single();
  if (error) throw error;
  return data;
};

export const updateUserWatchlist = async (email, watchlist) => {
  const { error } = await supabase.from("Users").update({ watchlist }).eq("email", email);
  if (error) throw error;
};

export const updateUserFavorites = async (email, favorites) => {
  const { error } = await supabase.from("Users").update({ favorites }).eq("email", email);
  if (error) throw error;
};
