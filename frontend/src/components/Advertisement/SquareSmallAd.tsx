import { FaGithubAlt } from "react-icons/fa";

export default function SquareSmallAd() {
  return (
    <a href="https://github.com/Vignesh-Venkatesh/FilmBoxd" target="_blank">
      <div className="w-[230px] h-[230px] bg-base-300 rounded font-google shadow-md p-4 opacity-70 hover:opacity-100 transition-opacity duration-400 cursor-pointer relative flex flex-col justify-end">
        <h1 className="text-lg">Check out</h1>
        <h1 className="text-3xl font-bold">FilmBoxd's</h1>
        <h1 className="text-lg">GitHub Repostiory</h1>
        <FaGithubAlt className="text-9xl absolute top-0 right-2" />
      </div>
    </a>
  );
}
