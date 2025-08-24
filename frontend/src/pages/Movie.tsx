import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import CastList from "../components/Misc/CastList";
import LoadingMovie from "../components/Loading/LoadingMovie";
import ActionButtons from "../components/Reviews/ActionButtons";
import Reviews from "../components/Reviews/Reviews";

import type { Movie, User } from "../types";
import { isFutureDate } from "../config/utils";

import { authClient } from "../lib/auth-client";

const URL: string = import.meta.env.VITE_API_URL;

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/not-found");
      return;
    }

    async function fetchMovie() {
      try {
        const res = await fetch(`${URL}/movies/${id}`);
        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Unknown error");

        setMovie(json.msg);
      } catch (err: any) {
        setError(err.message || "Failed to fetch movie.");
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  // fetch current user from better auth
  useEffect(() => {
    async function fetchUser() {
      const sessionResponse = await authClient.getSession();

      if ("data" in sessionResponse && sessionResponse.data) {
        setUser(sessionResponse.data.user || null);
      } else {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="relative">
      {/* backdrop image behind everything */}
      {movie && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] overflow-hidden z-0">
          <img
            src={`https://image.tmdb.org/t/p/w1920${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full opacity-70"
            loading="lazy"
          />
          {/* bottom fade */}
          <div className="absolute bottom-0 left-0 w-full h-82 bg-gradient-to-b from-transparent to-base-100" />
          {/* left fade */}
          <div className="absolute top-0 left-0 w-82 h-full bg-gradient-to-l from-transparent to-base-100" />
          {/* right fade */}
          <div className="absolute top-0 right-0 w-82 h-full bg-gradient-to-r from-transparent to-base-100" />
        </div>
      )}

      <div className="relative z-10">
        <Navbar />
        {loading && <LoadingMovie />}
        {error && <p className="text-red-500">{error}</p>}

        {movie && (
          <div className="w-[950px] mx-auto translate-y-100 ">
            <div className="flex justify-between">
              {/* poster */}
              <div className="w-[230px] relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded shadow-2xl border-1 border-gray-800"
                  loading="lazy"
                />
                <div className="absolute top-0 right-0 px-2 py-1 rounded-md bg-base-300 text-neutral-content text-sm m-1 shadow-2xl font-bold font-google">
                  {isFutureDate(movie.release_date) ? (
                    <h1>To Be Released</h1>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* title, overview, cast, rating */}
              <div className="w-[670px]">
                {/* movie title */}
                <div className="flex gap-3 items-end">
                  <h1 className="text-5xl font-black font-cormorant">
                    {movie.title}
                  </h1>
                  <h1 className="italic text-2xl font-cormorant">
                    {movie.release_date.slice(0, 4)}
                  </h1>
                </div>

                {/* overview, cast, rating */}
                <div className="flex justify-between mt-5">
                  {/* overview, cast */}
                  <div className="w-[390px]">
                    <p className="font-cormorant text-xl">{movie.overview}</p>

                    <CastList />
                  </div>

                  {/* rating */}
                  {user && <ActionButtons username={user.name} tmdbId={id!} />}
                </div>
              </div>
            </div>

            {/* reviews */}
            <Reviews tmdbId={id} />
          </div>
        )}
      </div>
    </div>
  );
}
