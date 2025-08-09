import { useEffect, useState } from "react";
import LargeList from "./List/LargeList";
import Title from "./Misc/Title";
import LoadingList from "./Loading/LoadingList";

import type { Movie } from "../types";

interface PopularMoviesProps {
  URL: string;
}

export default function PopularMovies({ URL }: PopularMoviesProps) {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPopular() {
      try {
        const res = await fetch(`${URL}/movies/popular`);
        const json = await res.json();

        if (!res.ok) throw new Error(json?.error || "Unknown error");

        setData(json.msg.results);
      } catch (err: any) {
        setError(err.message || "Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }

    fetchPopular();
  }, [URL]);

  return (
    <div>
      <Title title="popular films this week" />
      {loading && (
        <LoadingList
          quantity={4}
          height={"345px"}
          width={"230px"}
          columns={4}
        />
      )}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && <LargeList data={data.slice(0, 4)} />}
    </div>
  );
}
