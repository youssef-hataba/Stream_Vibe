import MovieCard from "./MovieCard";

const Section = ({
  title,
  movies,
  reviews,
  isInWatchLater,
  isFavorite,
  toggleWatchLater,
  toggleFavorites,
  updating,
}) => {
  return (
    <div className={`${title.toLowerCase().replace(" ", "-")} mt-12 px-4`}>
      <h3 className="text-3xl font-semibold mb-7">{title}</h3>
      <div className="flex gap-5 overflow-x-auto pb-4">
        {movies.length > 0 ? (
          movies.map((movie, index) => {
            const userReview = reviews.find(
              (review) => review.movieId === movie.movieId
            );

            return (
              <MovieCard
                key={index}
                movie={movie}
                isInWatchlist={isInWatchLater(movie.movieId)}
                isFavorite={isFavorite(movie.movieId)}
                toggleWatchLater={toggleWatchLater}
                toggleFavorites={toggleFavorites}
                updating={updating}
                userRating={userReview ? userReview.rating : null}
              />
            );
          })
        ) : (
          <p>Your {title.toLowerCase()} is empty 😕.</p>
        )}
      </div>
    </div>
  );
};

export default Section;
