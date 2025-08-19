import {
  FaRegEye,
  FaEye,
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { useEffect, useState } from "react";

interface Props {
  username: string;
  tmdbId: string;
}

const URL: string = import.meta.env.VITE_API_URL;

export default function ActionButtons({ username, tmdbId }: Props) {
  const [watched, setWatched] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [watchlisted, setWatchlisted] = useState(false);

  // check if movie is already watched on mount
  useEffect(() => {
    const checkWatched = async () => {
      try {
        const res = await fetch(
          `${URL}/user/${username}/watched?tmdbId=${tmdbId}`,
          { method: "GET", credentials: "include" }
        );
        const data = await res.json();
        if (res.ok && data.watched) {
          setWatched(true);
        }
      } catch (err) {
        console.error("Error checking watched:", err);
      }
    };

    const checkFavorited = async () => {
      try {
        const res = await fetch(
          `${URL}/user/${username}/favorites?tmdbId=${tmdbId}`,
          { method: "GET", credentials: "include" }
        );
        const data = await res.json();
        if (res.ok && data.favorited) {
          setFavorited(true);
        }
      } catch (err) {
        console.error("Error checking favorites:", err);
      }
    };

    const checkWatchlisted = async () => {
      try {
        const res = await fetch(
          `${URL}/user/${username}/watchlist?tmdbId=${tmdbId}`,
          { method: "GET", credentials: "include" }
        );
        const data = await res.json();
        if (res.ok && data.watchlisted) {
          setWatchlisted(true);
        }
      } catch (err) {
        console.error("Error checking watchlisted:", err);
      }
    };

    checkWatched();
    checkFavorited();
    checkWatchlisted();
  }, [username, tmdbId]);

  // ================= HANDLE WATCHED =================
  async function handleWatched() {
    try {
      if (!watched) {
        // mark as watched (POST)
        const res = await fetch(`${URL}/user/${username}/watched`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tmdbId }),
          credentials: "include",
        });
        if (res.ok) {
          setWatched(true);
        }
      } else {
        // remove from watched (DELETE)
        const res = await fetch(`${URL}/user/${username}/watched`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tmdbId }),
          credentials: "include",
        });
        if (res.ok) {
          setWatched(false);
        }
      }
    } catch (err) {
      console.error("Error updating watched:", err);
    }
  }

  // ================= HANDLE FAVORITED =================
  async function handleFavorited() {
    try {
      if (!favorited) {
        // mark as favorited (POST)
        const res = await fetch(`${URL}/user/${username}/favorites`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tmdbId }),
          credentials: "include",
        });
        if (res.ok) {
          setFavorited(true);
        }
      } else {
        // remove from favorites (DELETE)
        const res = await fetch(`${URL}/user/${username}/favorites`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tmdbId }),
          credentials: "include",
        });
        if (res.ok) {
          setFavorited(false);
        }
      }
    } catch (err) {
      console.error("Error updating favorited:", err);
    }
  }

  // ================= HANDLE WATCHLISTED =================
  async function handleWatchlisted() {
    try {
      if (!watchlisted) {
        // add to watchlist (POST)
        const res = await fetch(`${URL}/user/${username}/watchlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tmdbId }),
          credentials: "include",
        });
        if (res.ok) {
          setWatchlisted(true);
        }
      } else {
        // remove from watchlist (DELETE)
        const res = await fetch(`${URL}/user/${username}/watchlist`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tmdbId }),
          credentials: "include",
        });
        if (res.ok) {
          setWatchlisted(false);
        }
      }
    } catch (err) {
      console.error("Error updating watchlisted:", err);
    }
  }

  return (
    <div className="w-[230px] h-[130px] bg-neutral rounded p-4">
      <div className="flex justify-around items-center">
        <div className="tooltip tooltip-bottom">
          <div className="tooltip-content">
            <h1 className="text-sm p-1 font-bold">Watched</h1>
          </div>
          <div className="text-3xl cursor-pointer" onClick={handleWatched}>
            {watched ? <FaEye className="text-green-500" /> : <FaRegEye />}
          </div>
        </div>

        <div className="tooltip tooltip-bottom">
          <div className="tooltip-content">
            <h1 className="text-sm p-1 font-bold">Favorite</h1>
          </div>
          <div className="text-2xl cursor-pointer" onClick={handleFavorited}>
            {favorited ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </div>
        </div>

        <div className="tooltip tooltip-bottom">
          <div className="tooltip-content">
            <h1 className="text-sm p-1 font-bold">Watchlist</h1>
          </div>
          <div className="text-2xl cursor-pointer" onClick={handleWatchlisted}>
            {watchlisted ? (
              <FaBookmark className="text-amber-500" />
            ) : (
              <FaRegBookmark />
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-primary w-full" disabled={!watched}>
          Write a review
        </button>
      </div>
    </div>
  );
}
