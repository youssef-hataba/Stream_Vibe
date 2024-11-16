import {CiCalendar} from "react-icons/ci";
import {IoLanguage} from "react-icons/io5";
import {TbLayoutGrid} from "react-icons/tb";
import {FaRegClock} from "react-icons/fa6";
import {FaEye} from "react-icons/fa";
import {FaRegStar} from "react-icons/fa";
import {fetchMovieDetails, fetchSuggestedMovies, fetchMovieCast} from "@/app/hooks/useMovies";
import MovieHeroBanner from "@/app/_components/MovieHeroBanner";
import {Spinner1} from "@/app/_components/Spinner";
import MovieCard from "@/app/_components/MovieCard";
import StarRating from "@/app/_components/StarRating";
import Link from "next/link";
import Rating from "@/app/_components/Rating";

export default async function MovieDetailsPage({params}) {
  const {movieId} = await params;

  const [movie, cast, suggestedMovies] = await Promise.all([
    fetchMovieDetails(movieId),
    fetchMovieCast(movieId),
    fetchSuggestedMovies(movieId),
  ]);

  if (!movie) return <Spinner1 />;

  return (
    <div className="bg-black-8 text-white">
      {/* Header Section with Image and Title */}
      <MovieHeroBanner movie={movie} />
      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row gap-5 mt-16">
        {/* Left Column */}
        <div className="md:w-[70%] flex-1">
          {/* Description Section */}
          <div className="bg-black-10 mb-5 p-8 rounded-lg border border-black-15">
            <h2 className="text-xl font-semibold text-gray-99">Description</h2>
            <p className="mt-2 text-gray-60 font-mediu text-[18px] leading-7">{movie.overview}</p>
          </div>

          {/* Cast Section */}
          {cast?.length > 0 && (
            <div className="bg-black-10 p-8 rounded-lg mb-6 border border-black-15">
              <h2 className="text-xl font-semibold">Cast</h2>
              <div className="flex gap-3 overflow-x-auto scroll-smooth pt-7">
                {cast
                  .filter((actor) => actor.profile_path) 
                  .map((actor) => (
                    <Link key={actor.cast_id} href={`/actors/${actor.id}`}>
                      <div className="max-w-[100px] min-w-[80px] overflow-hidden cursor-pointer">
                        <img
                          src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                          alt={actor.name}
                          className="h-28 w-[90px] object-cover rounded-lg border border-black-15"
                        />
                        <p className="mt-2 text-gray-300 text-xs mb-6">{actor.name}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}
          {/* Add Rating */}
          <Rating movieId={movieId}/>
        </div>

        {/* Right Column */}
        <div className="space-y- bg-black-10 p-8 rounded-lg border border-black-15">
          {/* Info Cards */}
          <div className="p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-60 mb-4">
              <CiCalendar className="inline-block" />
              Release Date:
            </h2>
            <p className="text-gray-90">{movie.release_date}</p>
          </div>

          <div className="p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-60 mb-4">
              <IoLanguage className="inline-block" />
              Available Language
            </h2>
            <div className="flex gap-1.5 flex-wrap">
              {movie.spoken_languages?.map((lang) => (
                <span
                  key={lang.english_name}
                  className="text-sm text-gray-90 border border-black-15 p-2 bg-black-8 rounded-md">
                  {lang.english_name}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-60 mb-4">
              <FaRegStar className="inline-block" size={18} />
              Ratings:
            </h2>
            <div className="flex items-center justify-between gap-1.5 border border-black-15 p-2 bg-black-8 rounded-md w-fit py-3">
              {movie.vote_average > 0 ? (
                <StarRating
                  actualRating={movie.vote_average / 1.95}
                  StartStyle="w-[20px] h-[8px] bg-blue flex items-center bg-black-8"
                  pStyle="hidden"
                />
              ) : (
                <span className="flex items-center text-red-45">
                  <FaRegStar className="inline-block" />
                  <FaRegStar className="inline-block" />
                  <FaRegStar className="inline-block" />
                  <FaRegStar className="inline-block" />
                  <FaRegStar className="inline-block" />
                  <span className="mx-2 text-gray-60">0</span>
                </span>
              )}
              <span className="text-gray-60">{parseFloat(movie.vote_average.toFixed(1)) / 2}</span>
            </div>
          </div>

          <div className="p-4 rounded-lg">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-60 mb-4">
              <TbLayoutGrid className="inline-block" />
              Genre
            </h2>
            <div className="flex gap-1.5 flex-wrap">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.name}
                  className="text-sm text-gray-90 border border-black-15 p-2 bg-black-8 rounded-md">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-60 mb-4">
              <FaRegClock className="inline-block" size={18} />
              Duration:
            </h2>
            <p className="text-gray-90">{formatRuntime(movie.runtime)}</p>
          </div>

          <div className="p-4 rounded-lg">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-60 mb-4">
              <FaEye className="inline-block" />
              Votes:
            </h2>
            <p className="text-gray-90">{movie.vote_count} votes</p>
          </div>
        </div>
      </div>

      {/* Suggested Movies Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Suggested Movies</h2>
        <div className="grid grid-cols-auto gap-5">
          {suggestedMovies?.slice(0, 10).map((suggestedMovie) => (
            <MovieCard movie={suggestedMovie} key={suggestedMovie.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

const formatRuntime = (runtimeInMinutes) => {
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;

  const hoursText = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
  const minutesText = minutes > 0 ? `${minutes} min${minutes > 1 ? "s" : ""}` : "";

  return `${hoursText}${hoursText && minutesText ? ", " : ""}${minutesText}`;
};
