import { fetchMoviesByCategory, fetchCategories } from '@/app/hooks/useCategories';
import MovieCard from "@/app/_components/MovieCard";
import Link from 'next/link';

export default async function CategoryPage({ params, searchParams }) {
    const { categoryId } = await  params;
    const currentPage =  await  parseInt(searchParams.page || '1', 10);
    const itemsPerPage = 10; ``

    const movies = await fetchMoviesByCategory(categoryId);
    const categories = await fetchCategories();
    const genre = categories.find((cat) => cat.id === parseInt(categoryId));

    // Movies count
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMovies = movies.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(movies.length / itemsPerPage);

    return (
        <div className="mt-10">
            <CategoryDetails genre={genre} />
            <div className="grid grid-cols-auto gap-6 text-white overflow-y-auto">
                {paginatedMovies.map((movie) => (
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

