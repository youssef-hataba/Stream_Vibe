'use client';
import React, { useState, useEffect } from 'react';
import { fetchMoviesByCategory, fetchCategories } from '@/app/hooks/useCategories';
import MovieCard from "@/app/_components/MovieCard";
import Link from 'next/link';
import { NextButton, PrevButton } from '@/app/_components/buttons/Buttons';

export default function CategoryPage({ params, searchParams }) {
    const { categoryId } = React.use(params);  
    const { page } = React.use(searchParams); 
    const currentPage = parseInt(page || '1', 10);  
    const itemsPerPage = 10;

    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);

            const fetchedMovies = await fetchMoviesByCategory(categoryId);
            setMovies(fetchedMovies);

            const foundGenre = fetchedCategories.find((cat) => cat.id === parseInt(categoryId));
            setGenre(foundGenre);
        };

        loadData();
    }, [categoryId]);

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
            <h2 className="text-[27px] md:text-4xl font-bold text-white mb-12">
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
  
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <span
              key={pageNumber}
              className={`embla__dot mx-2 ${currentPage === pageNumber ? 'embla__dot--selected' : ''}`}
              onClick={() => window.location.href = `/category/${categoryId}?page=${pageNumber}`}
            >
              {pageNumber}
            </span>
          );
        })}
  
        {currentPage < totalPages && (
          <NextButton onClick={handleNextPage} />
        )}
      </div>
    );
  }
