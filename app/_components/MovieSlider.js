"use client";
import Image from "next/image";
import React, {useEffect, useState, useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Navigation, Pagination, Mousewheel, Keyboard} from "swiper/modules";
import Loader from "./Loader";
import axios from "axios"; // Import Axios

const MovieSlider = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "79943043be1e365cc73bf3ac4a4e51cb";
  const swiperRef = useRef(null); // Store Swiper instance

  const fetchMovies = async () => {
    setLoading(true); // Set loading state
    setError(null); // Reset error state

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      setMovies(response.data.results);
    } catch (error) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(); // Fetch movies on component mount
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center text-xl">
        Error: {error}
        <button onClick={fetchMovies} className="bg-red-600 text-white mt-4 px-4 py-2 rounded">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative mt-12 h-screen"> {/* Ensure the container has full height */}
      <Swiper
        cssMode={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        loop={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="w-full h-full" // Ensure the swiper takes full height
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}>
        {movies.slice(0, 10).map((movie) => (
          <SwiperSlide key={movie.id} className="relative"> {/* Ensure each slide takes full height and width */}
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                : "/path/to/placeholder-image.jpg" // Fallback image
            }
            alt={movie.title || "Movie poster"}
            className="absolute h-full rounded-xl" // Ensure the image fills the slide completely
          />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 items-center">
            <div className="p-6 rounded-lg flex flex-col items-center bg-black bg-opacity-60">
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
        </SwiperSlide>
        ))}
      </Swiper>
  
      {/* Custom Navigation Buttons */}
      <div className="custom-prev absolute bottom-0 left-4 transform -translate-y-1/2 z-10 cursor-pointer bg-black-6 border rounded-lg border-black-12">
        <button
          className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full rotate-180"
          onClick={() => swiperRef.current?.slidePrev()} // Manually trigger slidePrev()
        >
          <img src="/vector.png" alt="vector png " className="text-black-6" />
        </button>
      </div>
  
      <div className="custom-next absolute bottom-6 right-4 transform bg-black-6 border rounded-lg border-black-12 -translate-y-1/2 z-10 cursor-pointer">
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
