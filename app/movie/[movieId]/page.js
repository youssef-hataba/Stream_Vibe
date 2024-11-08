"use client";
import {CiCalendar} from "react-icons/ci";
import {IoLanguage} from "react-icons/io5";
import {TbLayoutGrid} from "react-icons/tb";
import { FaRegClock } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

import React from "react";
import {
  useFetchMovieDetails,
  useFetchSuggestedMovies,
  useFetchMovieCast,
} from "@/app/hooks/useMovies";
import Link from "next/link";
import MovieHeroBanner from "@/app/_components/MovieHeroBanner";

export default function MovieDetailsPage({params}) {
  const { movieId } = React.use(params);
  const movie = useFetchMovieDetails(movieId);
  const cast = useFetchMovieCast(movieId);
  const suggestedMovies = useFetchSuggestedMovies(movieId);

  if (!movie) return <div>Loading...</div>;
  if (!suggestedMovies) return <div>Loading suggested movies...</div>;


  const languages = movie.spoken_languages?.map((lang) => lang.english_name).join(", ");

  return (
    <div className=" bg-black-8 text-white">
      {/* Header Section with Image and Title */}
      <MovieHeroBanner movie={movie}/>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row gap-5 mt-16">
        {/* Left Column */}
        <div className="md:w-[70%]">
          {/* Description Section */}
          <div className="bg-black-10 mb-5 p-8 rounded-lg border border-black-15">
            <h2 className="text-xl font-semibold text-gray-99">Description</h2>
            <p className="mt-2 text-gray-60 font-mediu text-[18px] leading-7">{movie.overview}</p>
          </div>

          {/* Cast Section */}
          {cast.length > 0 ? (
            <div className="bg-black-10 p-8 rounded-lg mb-6 border border-black-15">
              <h2 className="text-xl font-semibold">Cast</h2>
              <div className="flex gap-2 overflow-x-auto pt-7">
                {cast
                  .filter((actor) => actor.profile_path) // Only display actors with profile images
                  .map((actor) => (
                    <div key={actor.cast_id} className="min-w-[100px]">
                      <img
                        src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                        alt={actor.name}
                        className="h-28 w-[90px] object-cover rounded-lg border border-black-15"
                      />
                      <p className="mt-2 text-gray-300 text-xs mb-6">{actor.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Reviews Section */}
          <div className="bg-black-10 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Reviews: {movie.reviews}</h2>
            <div className="mt-4 space-y-4">
              <div className="bg-black-10 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">
                  Ratings: <span className="text-sm text-gray-400"> {movie.vote_average}</span>
                </h3>
                <div className="mt-2 text-yellow-500">★★★★☆</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[30%] space-y- bg-black-10 p-8 rounded-lg border border-black-15">
          {/* Info Cards */}
          <div className="p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-60 mb-4">
              <CiCalendar className="inline-block" />
              Release Date:
            </h2>
            <p className="text-gray-90">{movie.release_date}</p>
          </div>
          <div className=" p-4">
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
          <div className=" p-4 rounded-lg">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-60 mb-4">
              <TbLayoutGrid className="inline-block" />
              Genre
            </h2>
            <div className="flex gap-1.5 flex-wrap">
              {movie.genres?.map((gener) => (
                <span
                  key={gener.name}
                  className="text-sm text-gray-90 border border-black-15 p-2 bg-black-8 rounded-md">
                  {gener.name}
                </span>
              ))}
            </div>
          </div>
          <div className=" p-4 rounded-lg">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-60 mb-4">
            <FaRegClock className="inline-block" size={18} />
              Duration:
            </h2>
            <p className="text-gray-90">{movie.runtime} mins</p>
          </div>
          <div className=" p-4 rounded-lg ">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-60 mb-4">
            <FaEye className="inline-block" />
              Viewers:
            </h2>
            <p className="text-gray-90">{movie.vote_count} votes</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Suggested Movies</h2>
        <div className="grid grid-cols-5 gap-6">
          {suggestedMovies.slice(0, 10).map((suggestedMovie) => (
            <Link key={suggestedMovie.id} href={`/movie/${suggestedMovie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${suggestedMovie.poster_path}`}
                alt={suggestedMovie.title}
                className="w-full rounded-lg object-cover"
              />
              <h3 className="mt-4 text-lg font-semibold">{suggestedMovie.title}</h3>
              <p className="text-gray-400">Rating: {suggestedMovie.vote_average}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
