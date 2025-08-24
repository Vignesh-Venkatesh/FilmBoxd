import WideAd from "../components/Advertisement/WideAd";
import Navbar from "../components/Navbar";
import NowPlayingMovies from "../components/NowPlaying";
import PopularMovies from "../components/PopularMovies";
import HomeSideBar from "../components/HomeSideBar";
// import PopularReviews from "../components/Reviews/PopularReviews";
import HomeRecent from "../components/Misc/HomeRecent";
import Reviews from "../components/Reviews/Reviews";

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
          <div className="flex flex-col gap-4">
            {/* recently watched films */}
            <HomeRecent list="watched" title="watched" />
            {/* recently favorited films */}
            <HomeRecent list="favorites" title="favorited" />
            {/* recently watchlisted films */}
            <HomeRecent list="watchlisted" title="watchlisted" />
            {/* <PopularReviews /> */}

            <div className="w-[630px]">
              <Reviews />
            </div>
          </div>
          <HomeSideBar URL={URL} />
        </div>
      </div>
    </div>
  );
}
