import MovieSlider from "./_components/MovieSlider";
import CategoriesSection from "./_components/CategoriesSection";
import MovieSection from "./_components/MovieSection";

const Home = () => {
  return (
    <div className="bg-black-8">
      <MovieSlider />
      <CategoriesSection />
      <MovieSection id="new-releases" title="New Releases" categoryPath="/movie/now_playing" />
      <MovieSection id="trending-section" title="Trending Now" categoryPath="/trending/movie/day" />
      <MovieSection id="must-watch" title="Must Watch" categoryPath="/movie/popular" />
      <MovieSection id="top-rated" title="Top Rated Movies" categoryPath="/movie/top_rated" />
    </div>
  );
};

export default Home;
