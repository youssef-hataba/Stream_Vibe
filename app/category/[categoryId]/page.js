"use client";
import { fetchMoviesByCategory, fetchCategories } from '@/app/hooks/useCategories';
import MovieCard from "@/app/_components/MovieCard";
import Link from 'next/link';
import { NextButton, PrevButton } from '@/app/_components/buttons/Buttons';

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
    const handlePrevPage = () => {
      if (currentPage > 1) {
        window.location.href = `/category/${categoryId}?page=${currentPage - 1}`;
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        window.location.href = `/category/${categoryId}?page=${currentPage + 1}`;
      }
    };
  
    return (
      <div className="embla__dots justify-center mt-8 flex items-center">
        {currentPage > 1 && (
          <PrevButton onClick={handlePrevPage} />
        )}
        
        <span className="embla__dot mx-2">{currentPage}</span>
        {currentPage < totalPages && (
          <NextButton onClick={handleNextPage} />
        )}
      </div>
    );
  }