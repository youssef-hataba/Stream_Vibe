"use client";
import { useParams } from "next/navigation";
import { fetchMoviesByCategory } from '@/app/hooks/useCategories';
import { useEffect, useState } from 'react';
import MovieCard from "@/app/_components/MovieCard";

export default function CategoryPage() {
    const { categoryId } = useParams();
    const [movies, setMovies] = useState([]);
  
    useEffect(() => {
      const fetchMovies = async () => {
        const moviesData = await fetchMoviesByCategory(categoryId);
        setMovies(moviesData);
    };
  
    if (categoryId) {
        fetchMovies();
    }
    }, [categoryId]);

    return (
<div className="mt-10">
  <h2 className="text-3xl text-white font-bold mb-6">Movies of Category</h2>
  <div className="grid grid-cols-auto gap-6 text-white overflow-y-auto">
    {movies?.map((movie) => (
    <MovieCard movie={movie} key={movie.id} />
    ))}
  </div>
</div>
    );
  }

