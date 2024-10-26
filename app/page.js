import MovieSlider from "./_components/MovieSlider";
import CategoriesSection from "./_components/Categories";
import TrendingSection from "./_components/TrendingMovies";

const Home = () => {
  return (
    <div className="bg-black-8">
      <MovieSlider />
      <CategoriesSection/>
      <TrendingSection />

    </div>
  );
};

export default Home;
