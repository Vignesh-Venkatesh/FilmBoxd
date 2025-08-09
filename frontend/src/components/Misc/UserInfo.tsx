import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import type { UserDB } from "../../types";

import Navbar from "../Navbar";
import LoadingUserInfo from "../Loading/LoadingUserInfo";

const URL = "http://localhost:5000/api";

export default function UserInfo() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserDB | null>(null);
  const [watchedCount, setWatchedCount] = useState<number | null>(null);
  const [favoritedCount, setFavoritedCount] = useState<number | null>(null);
  const [watchlistedCount, setWatchListedCount] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      navigate("/not-found");
      return;
    }

    async function fetchUserData() {
      try {
        // fetch user info , watched count , favorited count, watchlisted count, reviews count in parallel
        const [userRes, watchedRes, favoritedRes, watchlistedRes, reviewedRes] =
          await Promise.all([
            fetch(`${URL}/user/${username}`),
            fetch(`${URL}/user/${username}/watched`),
            fetch(`${URL}/user/${username}/favorites`),
            fetch(`${URL}/user/${username}/watchlist`),
            fetch(`${URL}/user/${username}/reviews`),
          ]);

        const [
          userJson,
          watchedJson,
          favoritedJson,
          watchlistedJson,
          reviewedJson,
        ] = await Promise.all([
          userRes.json(),
          watchedRes.json(),
          favoritedRes.json(),
          watchlistedRes.json(),
          reviewedRes.json(),
        ]);

        // handling errors
        if (!userRes.ok) {
          if (userRes.status === 404) {
            navigate("/not-found");
            return;
          }
          throw new Error(userJson.msg || "Failed to fetch user");
        }

        if (!watchedRes.ok) {
          throw new Error("Failed to fetch watched data");
        }

        if (!favoritedRes.ok) {
          throw new Error("Failed to fetch favorited data");
        }

        if (!watchlistedRes.ok) {
          throw new Error("Failed to fetch watchlisted data");
        }

        if (!reviewedRes.ok) {
          throw new Error("Failed to fetch reviews data");
        }

        setUser(userJson.data || userJson.msg);
        setWatchedCount(watchedJson.pagination?.total ?? 0);
        setFavoritedCount(favoritedJson.pagination?.total ?? 0);
        setWatchListedCount(watchlistedJson.pagination?.total ?? 0);
        setReviewCount(reviewedJson.pagination?.total ?? 0);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [username, navigate]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <LoadingUserInfo />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <p className="text-center mt-10 text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="w-[950px] mx-auto translate-y-10 font-google">
        {user && (
          <div className="flex w-full justify-between items-center">
            {/* left side - avaatar and user info */}
            <div className="flex items-center gap-5">
              {/* Avatar */}
              {user.image ? (
                <div className="avatar w-20 h-20 rounded-full overflow-hidden shadow-lg">
                  <img src={user.image} alt="User Avatar" />
                </div>
              ) : (
                <div className="avatar avatar-placeholder w-20 h-20 shadow-lg">
                  <div className="bg-neutral text-neutral-content w-20 h-20 rounded-full flex items-center justify-center">
                    <span className="text-5xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              )}

              {/* username and join date */}
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <h1 className="text-sm italic opacity-50 mt-1">
                  Joined: {user.createdAt.slice(0, 10)}
                </h1>
              </div>
            </div>

            {/* right side - stats */}
            <div className="flex">
              {/* watched */}
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-semibold">{watchedCount}</h1>
                <h1 className="uppercase font-light text-sm">Watched</h1>
              </div>

              <div className="divider divider-horizontal"></div>

              {/* favorited */}
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-semibold">{favoritedCount}</h1>
                <h1 className="uppercase font-light text-sm">Favorites</h1>
              </div>

              <div className="divider divider-horizontal"></div>

              {/* watchlisted */}
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-semibold">{watchlistedCount}</h1>
                <h1 className="uppercase font-light text-sm">Watchlisted</h1>
              </div>

              <div className="divider divider-horizontal"></div>

              {/* reviewed */}
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-semibold">{reviewCount}</h1>
                <h1 className="uppercase font-light text-sm">Reviewed</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
