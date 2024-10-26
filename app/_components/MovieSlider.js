"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Loader from "./Loader";

const MovieSlider = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "79943043be1e365cc73bf3ac4a4e51cb";

  const swiperRef = useRef(null); // Store Swiper instance

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [API_KEY]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center text-xl">Error: {error}</div>;
  }

  return (
    <div className="relativ">
      <Swiper
        cssMode={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        loop={true} // Enable looping
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="w-full h-screen"
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // Store the swiper instance
        }}
      >
        {movies.slice(0, 10).map((movie, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                  : "path/to/placeholder-image.jpg"
              }
              alt={movie.title || "Movie poster"}
              className="w-full h-full object-cover"
            />
            {/* Black gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 items-center">
              <div className="p-6 rounded-lg flex flex-col items-center bg-black bg-opacity-60"> {/* Optional: Add background to content */}
                <h2 className="text-4xl font-bold text-white mb-4">{movie.title}</h2>
                <p className="text-lg text-gray-300 mb-4 max-w-2xl">{movie.overview}</p>
                <div className="flex space-x-4 items-center">
                  <button className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg text-lg">
                    Play Now
                  </button>
                  <p className="text-gray-300">Rating: {movie.vote_average}</p>
                </div>
              </div>
            </div>
            <div className="w-full h-[50%] bg-gradient-to-t from-black-8 via-transparent to-transparent
                  z-50 bottom-0 right-0 absolute"></div>
            <div className="w-full h-[50%] bg-gradient-to-t to-black-8 via-transparent from-transparent
                  z-50 top-0 right-0 absolute"></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Left Arrow */}
      <div className="custom-prev absolute bottom-0 left-4 transform -translate-y-1/2 z-10 cursor-pointer bg-black-6 border rounded-lg border-black-12">
        <button
          className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full rotate-180"
          onClick={() => swiperRef.current?.slidePrev()} // Manually trigger slidePrev()
        >
          <img src="/vector.png" alt="vector png " className="text-black-6" />
        </button>
      </div>

      {/* Custom Right Arrow */}
      <div className="custom-next absolute bottom-0 right-4 transform bg-black-6 border rounded-lg border-black-12 -translate-y-1/2 z-10 cursor-pointer">
        <button
          className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full"
          onClick={() => swiperRef.current?.slideNext()} // Manually trigger slideNext()
        >
          <img src="/vector.png" alt="vector png " />
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
