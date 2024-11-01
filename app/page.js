import MovieSlider from "./_components/MovieSlider";
import CategoriesSection from "./_components/CategoriesSection";
import MovieSection from "./_components/MovieSection";

const Home = () => {
  return (
    <div className="bg-black-8">
      <MovieSlider />
      <CategoriesSection/>
      <MovieSection title="New Releases" categoryPath="/movie/now_playing" />
      <MovieSection title="Trending Now" categoryPath="/trending/movie/day"/>
      <MovieSection title="Must Watch" categoryPath="/movie/popular" />
      <MovieSection title="Top Rated Movies" categoryPath="/movie/top_rated" />
    </div>
  );
};

export default Home;
