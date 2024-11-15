import {fetchCategories, fetchMoviesByCategory} from "../hooks/useCategories";
import SectionButtons from "./buttons/SectionButtons";
import Link from "next/link";

export default async function CategoriesSection() {
  const categories = await fetchCategories();

  return (
    <div id="categories-section" className="bg-black-8 mt-16 text-white relative">
      <div className="flex items-center justify-between">
        <h1 className="md:text-4xl text-[27px] font-bold">Movies Categories</h1>

        {/* Scroll buttons */}
        <SectionButtons scrollId="scrollContainer" />
      </div>

      {/* Scrollable container */}
      <div
        id="scrollContainer"
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth mt-12">
        {/* Looping through categories */}
        {categories.map((genre) => (
          <CategoryCard key={genre.id} genre={genre} />
        ))}
      </div>
    </div>
  );
}

// Category Card Component
async function CategoryCard({genre}) {
  const movies = await fetchMoviesByCategory(genre.id);

  return (
    <div className="bg-black-10 rounded-lg p-4 min-w-[240px]">
      <Link href={`/category/${genre.id}`}>
        <h2 className="text-2xl font-semibold mb-4">{genre.name}</h2>
        <MoviesDisplay movies={movies.slice(0, 4)} />
      </Link>
    </div>
  );
}

// Movies Display Component
function MoviesDisplay({movies}) {
  return (
    <div className="grid grid-cols-2 gap-2 ">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg object-cover"
          />
        </div>
      ))}
    </div>
  );
}
