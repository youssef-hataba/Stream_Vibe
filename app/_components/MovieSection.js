import { fetchMovies } from "../hooks/useMovies";
import Link from "next/link";
import SectionButtons from "./SectionButtons";

export default async function MovieSection({ title, categoryPath }) {
  const movies = await fetchMovies(categoryPath);
  const scrollId = title.toLowerCase().replace(/\s+/g, "_");

  return (
    <div className="mt-20 bg-black-8 text-white relative">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">{title}</h1>
        <SectionButtons scrollId={scrollId}/>
      </div>

      <div
        id={scrollId}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth mt-12"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}


function MovieCard({ movie }) {
  return (
    <div className="bg-black-10 rounded-lg px-4 min-w-[250px] shadow-lg overflow-hidden">
      <Link href={`/movie/${movie.id}`}>
        <h2 className="text-xl font-semibold my-3 whitespace-nowrap">{movie.title}</h2>
        <div className="grid gap-2">
          <div className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

