import MovieSlider from "./_components/MovieSlider";
import CategoriesSection from "./_components/CategoriesSection";
import MovieSection from "./_components/MovieSection";
import StarRating from "./_components/StarRating";
import {Suspense} from "react";
import {Spinner2} from "./_components/Spinner";

const Home = () => {
  return (
    <div className="bg-black-8">
      <MovieSlider />
      <CategoriesSection />
      <MovieSection title="New Releases" categoryPath="/movie/now_playing" />
      <MovieSection title="Trending Now" categoryPath="/trending/movie/day" />
      <MovieSection title="Must Watch" categoryPath="/movie/popular" />
      <MovieSection title="Top Rated Movies" categoryPath="/movie/top_rated" />
      {/* <StarRating maxRating={5} /> */}
    </div>
  );
};

export default Home;
