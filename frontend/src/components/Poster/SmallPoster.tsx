interface SmallPosterProps {
  poster_path: string;
  movie_title: string;
  release_date: string;
}

export default function SmallPoster({
  poster_path,
  movie_title,
  release_date,
}: SmallPosterProps) {
  return (
    <div className="tooltip tooltip-bottom cursor-pointer">
      <div className="tooltip-content">
        <div className="text-md">
          {movie_title} ({release_date.slice(0, 4)})
        </div>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w342${poster_path}`}
        alt={movie_title}
        className="rounded shadow w-[70px] h-[105px] border-2 border-transparent hover:border-green-500 transition-colors duration-300"
        loading="lazy"
      />
    </div>
  );
}
