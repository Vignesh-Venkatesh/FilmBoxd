import { useEffect, useState } from "react";
import SmallList from "./List/SmallList";
import Title from "./Misc/Title";
import LoadingList from "./Loading/LoadingList";

import type { Movie } from "../types";

interface NowPlayingMoviesProps {
  URL: string;
}

export default function NowPlayingMovies({ URL }: NowPlayingMoviesProps) {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const res = await fetch(`${URL}/movies/now-playing`);
        const json = await res.json();

        if (!res.ok) throw new Error(json?.error || "Unknown error");

        setData(json.msg.results);
      } catch (err: any) {
        setError(err.message || "Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }

    fetchNowPlaying();
  }, [URL]);

  return (
    <div>
      <Title title="films playing this week" />
      {loading && (
        <LoadingList
          quantity={12}
          height={"105px"}
          width={"70px"}
          columns={12}
        />
      )}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && <SmallList data={data.slice(0, 12)} />}
    </div>
  );
}
