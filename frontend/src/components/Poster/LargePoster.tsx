import { Link } from "react-router-dom";

interface LargePosterProps {
  movie_id: number;
  poster_path: string;
  movie_title: string;
  release_date: string;
}

export default function LargePoster({
  poster_path,
  movie_title,
  release_date,
  movie_id,
}: LargePosterProps) {
  return (
    <Link to={`/movie/${movie_id}`}>
      <div className="tooltip tooltip-bottom cursor-pointer">
        <div className="tooltip-content font-google">
          <div className="text-md">
            {movie_title} ({release_date.slice(0, 4)})
          </div>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w342${poster_path}`}
          alt={movie_title}
          className="font-google rounded shadow w-[230px] h-[345px] border-2 border-transparent hover:border-green-500 transition-colors duration-300"
          loading="lazy"
        />
      </div>
    </Link>
  );
}
