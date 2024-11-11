"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

const API_KEY = "63782fbca0fe61390d79a5375d4d5b59";
const BASE_URL = "https://api.themoviedb.org/3";

const Search = ({classes}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchData, setSearchData] = useState({
    results: [],
    loading: false,
    error: "",
    searched: false,
  });


  const handleSearch = async (event) => {
    event.preventDefault();
    if (query.trim() === "") return;

    setSearchData((prev) => ({ ...prev, loading: true, error: "", searched: true }));

    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`
      );
      setSearchData((prev) => ({
        ...prev,
        results: response.data.results,
        loading: false,
      }));
    } catch (err) {
      setSearchData((prev) => ({
        ...prev,
        error: "Failed to fetch search results.",
        loading: false,
      }));
    }
  };

  const handleBlur = () => {
    // Delay hiding the result to avoid closing while navigating
    setTimeout(() => setIsFocused(false), 100);
  };

  return (
    <div className={`relative flex items-center z-10 ${classes}`}>
      <form onSubmit={handleSearch} className="flex items-center border-4 border-black-12 rounded-full overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="px-4 py-2 w-[14rem] bg-transparent text-white placeholder-gray-60 focus:outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />
        <button
          type="submit"
          className="px-4 py-2 text-red-800 hover:text-red-45 transition-all duration-150"
          onClick={() => setIsFocused(true)}
          onBlur={handleBlur}
        >
          Search
        </button>
      </form>

      {isFocused && (
        <div className="absolute top-16 left-0 w-full bg-black-10 rounded-md max-h-80 overflow-y-auto">
          {searchData.loading && <p className="text-red-50 p-2 font-semibold">Loading...</p>}

          {searchData.error && <p className="text-red-50 p-2 font-semibold">{searchData.error}</p>}

          {searchData.results.length > 0
            ? searchData.results.map((movie) => (
                <Link href={`/movie/${movie.id}`} key={movie.id} passHref>
                  <div className="flex items-center p-2 hover:bg-black-15 cursor-pointer">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-16 h-24 object-cover rounded-md mr-4"
                    />
                    <div className="text-white">
                      <h3 className="font-semibold">{movie.title}</h3>
                      <p className="text-sm text-gray-400">{movie.release_date}</p>
                    </div>
                  </div>
                </Link>
              ))
            : searchData.searched && (
                <p className="text-red-50 p-2 font-semibold">No results found ...</p>
              )}
        </div>
      )}
    </div>
  );
};

export default Search;
