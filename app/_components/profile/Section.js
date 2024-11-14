import MovieCard from "./MovieCard";

const Section = ({
  title,
  movies,
  favoriteMovies = [],
  watchlistMovies = [],
  ratings = {},
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
  handleAddToFavorites,
  handleRemoveFromFavorites
}) => (
  <div className={`${title.toLowerCase().replace(" ", "-")} mt-12`}>
    <h3 className="text-3xl font-semibold mb-7">{title}</h3>
    <div className="flex gap-5 overflow-x-auto scroll-smooth pb-4">
      {movies.length > 0 ? (
        movies.map((movie, index) => (
          <MovieCard
            movie={movie}
            key={index}
            isInWatchlist={watchlistMovies.some((m) => m.id === movie.id)}
            isFavorite={favoriteMovies.some((m) => m.id === movie.id)}
            userRating={ratings[movie.id]}
            handleAddToWatchlist={handleAddToWatchlist}
            handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            handleAddToFavorites={handleAddToFavorites}
            handleRemoveFromFavorites={handleRemoveFromFavorites}
          />
        ))
      ) : (
        <p>Your {title.toLowerCase()} is empty.</p>
      )}
    </div>
  </div>
);

export default Section;