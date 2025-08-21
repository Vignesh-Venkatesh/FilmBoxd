import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Title from "../Misc/Title";
import SmallList from "../List/SmallList";
import type { Movie } from "../../types";

import { FaFaceSadCry } from "react-icons/fa6";

const URL: string = import.meta.env.VITE_API_URL;

export default function UserRecent({
  list,
  title,
}: {
  list: string;
  title: string;
}) {
  const { username } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await fetch(`${URL}/user/${username}/${list}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Unknown error");

        const slicedList = json.data.slice(0, 8);
        if (!Array.isArray(slicedList) || slicedList.length === 0) {
          setMovies([]);
          return;
        }

        const movieDetails: Movie[] = await Promise.all(
          slicedList.map(async (item: any) => {
            const mRes = await fetch(`${URL}/movies/${item.tmdb_id}`);
            const mJson = await mRes.json();
            if (!mRes.ok)
              throw new Error(mJson?.error || "Failed to load movie");
            return mJson.msg;
          })
        );

        setMovies(movieDetails);
      } catch (err: any) {
        setError(err.message || "Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }

    if (username && list) fetchList();
  }, [username, list]);

  return (
    <div className="w-[630px]">
      <Title title={`recently ${title} films`} more={`/${list}/${username}`} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && movies.length > 0 && (
        <SmallList data={movies} columns={8} />
      )}
      {!loading && !error && movies.length === 0 && (
        <div className="h-[105px] bg-neutral rounded shadow-md w-full flex flex-col gap-2 justify-center items-center">
          <FaFaceSadCry className="text-4xl opacity-80" />
          <p>
            {username} has not{" "}
            <span className="underline underline-offset-4 font-bold">
              {title}
            </span>{" "}
            any films.
          </p>
        </div>
      )}
    </div>
  );
}
