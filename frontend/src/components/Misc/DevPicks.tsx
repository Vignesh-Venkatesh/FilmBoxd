import { useEffect, useState } from "react";
import SmallList from "../List/SmallList";
import Title from "./Title";
import { devPicks } from "../../config/devPicks";
import type { Movie } from "../../types";
import LoadingList from "../Loading/LoadingList";

interface DevPicksProps {
  URL: string;
}

export default function DevPicks({ URL }: DevPicksProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDevPicks() {
      try {
        const results: Movie[] = [];

        for (const id of devPicks) {
          const res = await fetch(`${URL}/movies/${id}`);
          if (!res.ok) throw new Error(`Failed to fetch movie with ID ${id}`);
          const json = await res.json();
          results.push(json.msg);
        }

        setMovies(results);
      } catch (err: any) {
        setError(err.message || "Failed to load Dev Picks.");
      } finally {
        setLoading(false);
      }
    }

    fetchDevPicks();
  }, []);

  return (
    <div className="">
      <Title title="Dev Picks" />
      {loading && (
        <LoadingList quantity={6} height={"105px"} width={"70px"} columns={3} />
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <SmallList data={movies} columns={3} />}
    </div>
  );
}
