import Poster from "./Poster";

export default function HorizontalMoviesList({
  data,
  poster_width,
  poster_height,
  poster_sizes,
  count, // number of posters to be displayed
}) {
  const currentYear = new Date().getFullYear(); // getting the current year

  return (
    <div className="flex justify-between">
      {data.slice(0, count).map((movie) => {
        // checking if the movie is a re-release
        const year_of_release = movie.release_date.slice(0, 4);
        const isReRelease = parseInt(year_of_release) < currentYear - 1;
        const displayYear = isReRelease
          ? `${year_of_release} Re-release`
          : year_of_release;

        return (
          <Poster
            key={movie.id}
            poster_path={movie.poster_path}
            movie_title={movie.title}
            width={poster_width}
            height={poster_height}
            text_size={poster_sizes}
            year_of_release={displayYear}
          />
        );
      })}
    </div>
  );
}
