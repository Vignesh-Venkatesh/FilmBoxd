import type { Movie } from "../../types";
import SmallPoster from "../Poster/SmallPoster";

interface SmallListProps {
  data: Movie[];
  columns?: number; // defaults to 12
}

export default function SmallList({ data, columns = 12 }: SmallListProps) {
  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {data.map((movie) => (
        <SmallPoster
          key={movie.id}
          poster_path={movie.poster_path}
          movie_title={movie.title}
          release_date={movie.release_date}
        />
      ))}
    </div>
  );
}
