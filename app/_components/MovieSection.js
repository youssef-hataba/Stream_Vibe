import {fetchMovies} from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import SectionButtons from "./buttons/SectionButtons";

export default async function MovieSection({title, categoryPath, id}) {
  const movies = await fetchMovies(categoryPath);
  const scrollId = title.toLowerCase().replace(/\s+/g, "_");
  const Id = id;
  return (
    <div id={Id} className="mt-20 bg-black-8 text-white relative">
      <div className="flex items-center justify-between">
        <h1 className="text-[27px] md:text-4xl font-bold">{title}</h1>
        <SectionButtons scrollId={scrollId} />
      </div>

      <div id={scrollId} className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth mt-12">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
