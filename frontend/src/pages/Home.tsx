import WideAd from "../components/Advertisement/WideAd";
import Navbar from "../components/Navbar";
import NowPlayingMovies from "../components/NowPlaying";
import PopularMovies from "../components/PopularMovies";
import HomeSideBar from "../components/HomeSideBar";
import PopularReviews from "../components/Reviews/PopularReviews";

const URL: string = import.meta.env.VITE_API_URL;

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="w-[950px] mx-auto py-[30px]">
        <PopularMovies URL={URL} />
        <WideAd />
        <NowPlayingMovies URL={URL} />

        <div className="flex mt-6 justify-between">
          <PopularReviews />
          <HomeSideBar URL={URL} />
        </div>
      </div>
    </div>
  );
}
