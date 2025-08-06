import type { Movie } from "../../types";
import LargePoster from "../Poster/LargePoster";

interface LargeListProps {
  data: Movie[];
  columns?: number; // defaults to 4
}

export default function LargeList({ data, columns = 4 }: LargeListProps) {
  return (
    <div
      className="grid gap-2 w-full"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {data.map((movie) => (
        <LargePoster
          key={movie.id}
          poster_path={movie.poster_path}
          movie_title={movie.title}
          release_date={movie.release_date}
        />
      ))}
    </div>
  );
}
