import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie } from "../types";
import SmallList from "../components/List/SmallList";

const URL: string = import.meta.env.VITE_API_URL;

export default function Watched() {
  const { username } = useParams();
  const [watched, setWatched] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchWatched() {
      try {
        setLoading(true);
        const res = await fetch(`${URL}/user/${username}/watched?page=${page}`);
        const json = await res.json();

        if (!res.ok) throw new Error(json.msg || "Failed to fetch watched");

        const { data, pagination } = json;

        // combine tmdbIds into full movie objects
        const movies: Movie[] = await Promise.all(
          data.map(async (item: { tmdb_id: number }) => {
            const movieRes = await fetch(`${URL}/movies/${item.tmdb_id}`);
            const movieJson = await movieRes.json();
            return movieRes.ok ? movieJson.msg : null;
          })
        );

        setWatched(movies.filter((m) => m !== null));
        setTotalPages(pagination.totalPages);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchWatched();
  }, [username, page]);

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
        <h1 className="text-lg font-bold">{username}'s Watched Films</h1>
        <hr className="opacity-50 mt-2 mb-4" />

        {watched.length === 0 ? (
          <p>No movies in Watched.</p>
        ) : (
          <>
            {/* poster grid */}
            <SmallList data={watched} columns={12} />

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
