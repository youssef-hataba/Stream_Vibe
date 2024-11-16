import { fetchMoviesByCategory, fetchCategories } from '@/app/hooks/useCategories';
import MovieCard from "@/app/_components/MovieCard";
import Link from 'next/link';

export default async function CategoryPage({ params, searchParams }) {
    const { categoryId } = await params; // Fix this line
    const currentPage = await parseInt(searchParams.page || '1', 10);
    const itemsPerPage = 10; // Removed extra backtick

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
            <div className="grid grid-cols-auto gap-4 text-white">
                {paginatedMovies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                categoryId={categoryId} 
            />
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

function Pagination({ currentPage, totalPages, categoryId }) {
    return (
        <div className="flex justify-center mt-6">
            {currentPage > 1 && (
                <Link 
                    href={`/category/${categoryId}?page=${currentPage - 1}`} // Fixed here
                    className="px-4 py-2 mx-1 bg-red-45 text-white rounded"
                >
                    Previous
                </Link>
            )}
            <span className="px-4 py-2 mx-1 text-white">
                Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
                <Link 
                    href={`/category/${categoryId}?page=${currentPage + 1}`} // Fixed here
                    className="px-4 py-2 mx-1 bg-red-45 text-white rounded"
                >
                    Next
                </Link>
            )}
        </div>
    );
}
