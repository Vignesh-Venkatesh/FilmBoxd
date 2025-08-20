import { Link } from "react-router-dom";
import { GoUnlink } from "react-icons/go";
import type { Movie } from "../../types";

interface Props {
  movie: Movie;
}

export default function MovieInfoCard({ movie }: Props) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="card card-side bg-base-100 shadow-md hover:shadow-lg transition rounded-lg overflow-hidden border-2 border-transparent hover:border-green-500 hover:bg-neutral">
        {/* poster */}
        <figure className="w-32 min-w-[128px] h-[190px] bg-neutral flex items-center justify-center shadow-lg">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center text-3xl text-gray-500">
              <GoUnlink />
            </div>
          )}
        </figure>

        {/* details */}
        <div className="card-body p-4 ">
          <h2 className="card-title text-lg font-semibold">{movie.title}</h2>
          <p className="text-sm text-gray-400">
            {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
          </p>
          <p className="text-sm text-gray-300 line-clamp-5">
            {movie.overview || "No overview available."}
          </p>
        </div>
      </div>
    </Link>
  );
}
