import { fetchMoviesByCategory, fetchCategories } from '@/app/hooks/useCategories';
import MovieCard from "@/app/_components/MovieCard";

export default async function CategoryPage({ categoryId }) {
    const movies = await fetchMoviesByCategory(categoryId);
    const genre = await fetchCategories(categoryId);

    return (
        <div className="mt-10">
            <CategoryDetails genre={genre} />
            <div className="grid grid-cols-auto gap-6 text-white overflow-y-auto">
                {movies?.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
}

function CategoryDetails({ genre }) {
    return (
        <div>
            <h2 className="text-2xl text-white font-semibold mb-4">
                {genre?.name ? `Movies of ${genre.name} Category` : 'Loading...'}
            </h2>
        </div>
    );
}