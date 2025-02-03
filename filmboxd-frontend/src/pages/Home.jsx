import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { Link } from "react-router-dom";

import HorizontalMoviesList from "../components/HorizontalMoviesList";

const poster_sizes = {
  sm: { w: 75, h: 110, text_size: "xl" },
  md: { w: 130, h: 195, text_size: "4xl" },
  lg: { w: 185, h: 275, text_size: "6xl" },
};

export default function Home() {
  const [nowShowing, setNowShowing] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nowShowingURL = `http://localhost:8000/api/v1/movies/now-showing`;
    const upcomingURL = `http://localhost:8000/api/v1/movies/upcoming`;

    // using Promise.all to fetch both APIs concurrently
    Promise.all([
      fetch(nowShowingURL).then((res) => res.json()), // fetching now showing movies
      fetch(upcomingURL).then((res) => res.json()), // fetching upcoming movies
    ])
      .then(([nowShowingData, upcomingData]) => {
        console.log("Fetched Now Showing Data:", nowShowingData);
        console.log("Fetched Upcoming Data:", upcomingData);

        // setting the state for both responses
        setNowShowing(nowShowingData.results);
        setUpcoming(upcomingData.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="text-gray-500 w-[760px] m-auto mt-5">
      {/* Popular films this week section */}
      <div>
        <div className="flex justify-between items-end">
          <h1 className="text-sm text-gray-400 uppercase">
            Popular films this week
          </h1>
          <h1 className="text-xs hover:text-orange-400 transition-text duration-300 cursor-pointer">
            more
          </h1>
        </div>
        <hr className="opacity-25" />
        <div>
          {loading ? (
            <Loader
              color="orange"
              type="dots"
              size="sm"
              className="m-auto opacity-70 mt-5"
            />
          ) : (
            <HorizontalMoviesList
              data={nowShowing}
              poster_width={poster_sizes.lg.w}
              poster_height={poster_sizes.lg.h}
              poster_sizes={poster_sizes.lg.text_size}
              count={4}
            />
          )}
        </div>
      </div>

      {/* Now Showing films section */}
      <div>
        <div className="flex justify-between items-end mt-5">
          <h1 className="text-sm text-gray-400 uppercase">Now Showing</h1>
          <Link to="/movies/now-showing">
            <h1 className="text-xs hover:text-orange-400 transition-text duration-300 cursor-pointer">
              more
            </h1>
          </Link>
        </div>
        <hr className="opacity-25" />
        <div>
          {loading ? (
            <Loader
              color="orange"
              type="dots"
              size="sm"
              className="m-auto opacity-70 mt-5"
            />
          ) : (
            <HorizontalMoviesList
              data={nowShowing}
              poster_width={poster_sizes.sm.w}
              poster_height={poster_sizes.sm.h}
              poster_sizes={poster_sizes.sm.text_size}
              count={10}
            />
          )}
        </div>
      </div>

      {/* Upcoming films section */}
      <div>
        <div className="flex justify-between items-end mt-5">
          <h1 className="text-sm text-gray-400 uppercase">Upcoming films</h1>
          <h1 className="text-xs hover:text-orange-400 transition-text duration-300 cursor-pointer">
            more
          </h1>
        </div>
        <hr className="opacity-25" />
        <div>
          {loading ? (
            <Loader
              color="orange"
              type="dots"
              size="sm"
              className="m-auto opacity-70 mt-5"
            />
          ) : (
            <HorizontalMoviesList
              data={upcoming}
              poster_width={poster_sizes.sm.w}
              poster_height={poster_sizes.sm.h}
              poster_sizes={poster_sizes.sm.text_size}
              count={10}
            />
          )}
        </div>
      </div>
    </div>
  );
}
