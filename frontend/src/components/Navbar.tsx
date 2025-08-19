// import { FaSun, FaMoon } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";

import type { User } from "../types";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const sessionResponse = await authClient.getSession();

      if ("data" in sessionResponse && sessionResponse.data) {
        setUser(sessionResponse.data.user || null);
      } else {
        setUser(null);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    setUser(null);
  };

  return (
    <div className="p-4 font-google font-bold flex justify-between bg-transparent w-[1200px] mx-auto">
      <div className="text-3xl w-1/2">
        <Link to="/">
          <h1>FilmBoxd</h1>
        </Link>
      </div>

      <div className="flex justify-end gap-5 w-1/2">
        <Link to="/" className="flex gap-4 btn btn-accent">
          Home
        </Link>

        {/* Search */}
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" className="grow" placeholder="Search" />
        </label>

        {/* User area */}
        <div className="flex items-center gap-4">
          {loading ? null : user ? (
            <div className="dropdown dropdown-hover dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer">
                {user.image ? (
                  <div className="avatar w-10 h-10 rounded-full overflow-hidden">
                    <img src={user.image} alt="User Avatar" />
                  </div>
                ) : (
                  <div className="avatar avatar-placeholder w-10 h-10">
                    <div className="bg-neutral text-neutral-content w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-xl">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-200 rounded-box z-10 w-32 p-2 shadow-md"
              >
                <li>
                  <Link to={`/user/${user.name}`}>
                    <div className="p-1">Profile</div>
                  </Link>
                </li>
                <li>
                  <Link to={`/user/${user.name}/settings`}>
                    <div className="p-1">Settings</div>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="btn bg-red-500 hover:bg-red-600 font-bold"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-soft cursor-pointer">
                <button>Log In</button>
              </Link>
              <div className="divider divider-horizontal"></div>
              <Link to="/signup" className="btn btn-soft cursor-pointer">
                <button>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// light mode, plan on adding later
// {/* theme controller */}
// <div className="flex items-center">
//   <label className="swap swap-rotate">
//     {/* this hidden checkbox controls the state */}
//     <input type="checkbox" className="theme-controller" value="light" />

//     {/* moon icon */}
//     <FaMoon className="swap-off h-6 w-6 fill-current" />

//     {/* sun icon */}
//     <FaSun className="swap-on h-6 w-6 fill-current" />
//   </label>
// </div>
