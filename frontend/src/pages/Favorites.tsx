import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie } from "../types";
import SmallList from "../components/List/SmallList";

const URL: string = import.meta.env.VITE_API_URL;

export default function Favorites() {
  const { username } = useParams();
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        setLoading(true);
        const res = await fetch(
          `${URL}/user/${username}/favorites?page=${page}`
        );
        const json = await res.json();

        if (!res.ok) throw new Error(json.msg || "Failed to fetch favorites");

        const { data, pagination } = json;

        // combine tmdbIds into full movie objects
        const movies: Movie[] = await Promise.all(
          data.map(async (item: { tmdb_id: number }) => {
            const movieRes = await fetch(`${URL}/movies/${item.tmdb_id}`);
            const movieJson = await movieRes.json();
            return movieRes.ok ? movieJson.msg : null;
          })
        );

        setFavorites(movies.filter((m) => m !== null));
        setTotalPages(pagination.totalPages);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, [username, page]);

  if (loading) {
    return (
      <div>
        <Navbar />

        <div className="w-[950px] mx-auto py-[30px]">
          <h1 className="text-lg font-bold">{username}'s Favorited Films</h1>
          <hr className="opacity-50 mt-2 mb-4" />
          <div className="flex justify-center text-accent">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="w-[950px] mx-auto py-[30px]">
          <h1 className="text-lg font-bold">{username}'s Favorited Films</h1>
          <hr className="opacity-50 mt-2 mb-4" />
          <div className="flex justify-center text-accent">
            <div className="text-red-500">Something went wrong (T-T)</div>
          </div>

          {/* error toast */}
          <div className="toast">
            <div className="alert alert-error">
              <span>Something went wrong (T-T)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="w-[950px] mx-auto py-[30px]">
        <h1 className="text-lg font-bold">{username}'s Favorited Films</h1>
        <hr className="opacity-50 mt-2 mb-4" />

        {favorites.length === 0 ? (
          <p>No movies in favorites.</p>
        ) : (
          <>
            {/* poster grid */}
            <SmallList data={favorites} columns={12} />

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
