import { fetchMoviesByCategory, fetchCategories } from '@/app/hooks/useCategories';
import MovieCard from "@/app/_components/MovieCard";

export default async function CategoryPage({ params }) {
    const { categoryId } = await params;
    const movies = await fetchMoviesByCategory(categoryId);
    const categories = await fetchCategories();
    const genre = categories.find((cat) => cat.id === parseInt(categoryId));

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
            <h2 className="text-2xl text-white font-semibold mb-12">
                {genre ? `Movies of ${genre.name} Category` : 'Loading...'}
            </h2>
        </div>
    );
}
