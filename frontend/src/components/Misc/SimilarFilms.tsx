import { useState, useEffect } from "react";
import type { Movie } from "../../types";
import { useParams, Link } from "react-router-dom";
import SmallList from "../List/SmallList";

const URL: string = import.meta.env.VITE_API_URL;

export default function SimilarFilms() {
  const { username } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch a watched or random movie
  useEffect(() => {
    async function fetchWatched() {
      try {
        const res = await fetch(`${URL}/user/${username}/watched`);
        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Unknown error");

        if (json.length > 0) {
          const list_length = json.data.length;
          const index = Math.floor(Math.random() * list_length);
          setMovie(json.data[index]);
        } else {
          const res = await fetch(`${URL}/movies/random`);
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || "Unknown error");

          setMovie(json.msg);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch movie.");
      } finally {
        setLoading(false);
      }
    }

    fetchWatched();
  }, [username]);

  // fetch similar movies after movie is set
  useEffect(() => {
    if (!movie) return;

    async function fetchSimilar() {
      try {
        if (movie) {
          const res = await fetch(`${URL}/movies/similar/${movie.id}`);
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || "Unknown error");
          setSimilar(json.msg.results || []);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch similar movies.");
      }
    }

    fetchSimilar();
  }, [movie]);

  return (
    <div className="font-google">
      {movie && (
        <div className="opacity-80">
          <h1>
            <span className="uppercase">Similar films to </span>
            <Link className="font-bold text-accent" to={`/movie/${movie.id}`}>
              {movie.title}
            </Link>
          </h1>
          <hr className="mt-1 mb-4" />
        </div>
      )}

      {similar.length > 0 && (
        <SmallList data={similar.slice(0, 9)} columns={3} />
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
