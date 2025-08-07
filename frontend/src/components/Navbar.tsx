// import { FaSun, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
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

        {/* search */}
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

        {/* log in and sign up buttons */}
        <div className="flex items-end">
          <button className="btn btn-soft">Log In</button>
          <div className="divider divider-horizontal"></div>
          <button className="btn btn-soft">Sign Up</button>
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
