import MovieCard from "./MovieCard";

const Section = ({
  title,
  movies,
  isInWatchLater,
  isFavorite,
  toggleWatchLater,
  toggleFavorites,
  updating,
}) => {
  return (
    <div className={`${title.toLowerCase().replace(" ", "-")} mt-12`}>
      <h3 className="text-3xl font-semibold mb-7">{title}</h3>
      <div className="flex gap-5 overflow-x-auto scroll-smooth pb-4">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <MovieCard
              movie={movie}
              key={index}
              isInWatchlist={isInWatchLater(movie.movieId)}
              isFavorite={isFavorite(movie.movieId)}
              toggleWatchLater={toggleWatchLater}
              toggleFavorites={toggleFavorites}
              updating={updating}
            />
          ))
        ) : (
          <p>Your {title.toLowerCase()} is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Section;
