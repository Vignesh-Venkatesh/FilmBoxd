import WideAd from "./components/Advertisement/WideAd";
import Navbar from "./components/Navbar";
import NowPlayingMovies from "./components/NowPlaying";
import PopularMovies from "./components/PopularMovies";
import HomeSideBar from "./components/HomeSideBar";

const URL: string = "http://localhost:5000/api";

export default function App() {
  return (
    <div>
      <Navbar />

      <div className="w-[950px] mx-auto py-[30px]">
        <PopularMovies URL={URL} />
        <WideAd />
        <NowPlayingMovies URL={URL} />
        <HomeSideBar URL={URL} />
      </div>
    </div>
  );
}
