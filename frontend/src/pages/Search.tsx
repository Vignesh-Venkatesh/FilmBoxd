import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import type { Movie } from "../types";

import MovieInfoCard from "../components/Search/MovieInfoCard";

const URL: string = import.meta.env.VITE_API_URL;

export default function Search() {
  const { film } = useParams();
  const [films, setFilms] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (!film) {
      navigate("/not-found");
      return;
    }

    async function fetchMovie() {
      try {
        const res = await fetch(
          `${URL}/movies/search?movie=${film}&page=${page}`
        );
        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Unknown error");

        setFilms(json.msg.results);
        setTotalPages(json.msg.total_pages);
      } catch (err: any) {
        setError(err.message || "Failed to fetch movie search results.");
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [film, page, navigate]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="w-[950px] mx-auto py-[30px]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="w-[950px] mx-auto py-[30px] text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="w-[950px] mx-auto py-[30px]">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold mb-4">
            Search Results for "{film}"
          </h1>

          {/* page info */}
          {films.length > 0 && (
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
          )}
        </div>

        {films.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4">
              {films.map((movie) =>
                movie.overview ? (
                  <MovieInfoCard key={movie.id} movie={movie} />
                ) : null
              )}
            </div>

            {/* pagination */}
            <div className="flex justify-center mt-6">
              <div className="join">
                <button
                  className="join-item btn"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                >
                  «
                </button>
                <button className="join-item btn">
                  Page {page} of {totalPages}
                </button>
                <button
                  className="join-item btn"
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  »
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
