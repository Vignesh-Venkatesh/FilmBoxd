import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Title from "./Title";
import LoadingRecentMembers from "../Loading/LoadingRecentMembers";

import type { UserDB } from "../../types";

const URL: string = `${import.meta.env.VITE_API_URL}/recent/users`;

export default function RecentlyJoinedMembers() {
  const [recentUsers, setRecentUsers] = useState<UserDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecentUsers() {
      try {
        const res = await fetch(URL);
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.error || "Unknown error");
        }

        setRecentUsers(json.msg.data);
      } catch (err: any) {
        setError(err.message || "Failed to load recent users.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecentUsers();
  }, []);

  return (
    <div className="my-5">
      <Title title="Welcome our new members" />
      {loading && <LoadingRecentMembers />}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && recentUsers.length > 0 && (
        <div className="flex flex-col gap-1 ">
          {recentUsers.map((user) => (
            <Link to={`/user/${user.name}`}>
              <div
                key={user.name}
                className="flex items-center gap-1 hover:bg-base-300 transition-colors duration-300 p-2 rounded"
              >
                {/* user avatar */}
                {user.image ? (
                  <div className="avatar w-10 h-10 rounded-full overflow-hidden shadow-lg">
                    <img src={user.image} alt="User Avatar" />
                  </div>
                ) : (
                  <div className="avatar avatar-placeholder w-10 h-10 shadow-lg">
                    <div className="bg-neutral text-neutral-content w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
                {/* name and joining date */}
                <div>
                  <h1>{user.name}</h1>
                  <h1 className="text-xs italic opacity-50">
                    Joined {user.createdAt.slice(0, 10)}
                  </h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {!loading && !error && recentUsers.length === 0 && (
        <p>No recent users found.</p>
      )}
    </div>
  );
}
