export default function Footer() {
  return (
    <div className="text-gray-600 bg-gray-900 mt-10 py-8 flex justify-around items-center">
      <div className="text-xs">
        <h1 className="text-gray-400 font-bold text-lg mb-1">
          Check out the source code{" "}
          <a href="https://github.com/Vignesh-Venkatesh" target="_blank">
            <span className="text-gray-500 hover:text-orange-400 transition-text duration-300">
              here
            </span>
          </a>
        </h1>
        <h1>
          Data from{" "}
          <a href="https://www.themoviedb.org/" target="_blank">
            <span className="text-gray-500 hover:text-orange-400 transition-text duration-300">
              TMDb
            </span>
          </a>
        </h1>
        <h1>
          Inspired by{" "}
          <a href="https://letterboxd.com" target="_blank">
            <span className="text-gray-500 hover:text-orange-400 transition-text duration-300">
              LetterBoxd
            </span>
          </a>
        </h1>
      </div>
      <div className="text-xs">
        <h1>
          Made with 🧡 by{" "}
          <a href="https://github.com/Vignesh-Venkatesh" target="_blank">
            <span className="text-gray-500 hover:text-orange-400 transition-text duration-300">
              Vignesh
            </span>
          </a>
        </h1>
      </div>
    </div>
  );
}
