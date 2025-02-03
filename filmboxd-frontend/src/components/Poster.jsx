import { Tooltip } from "@mantine/core";

import { PiImageBrokenDuotone } from "react-icons/pi";

export default function Poster({
  skeleton,
  poster_path,
  movie_title,
  year_of_release,
  width,
  height,
  text_size,
}) {
  return (
    <>
      {skeleton ? (
        // if skeleton is true we render the skeleton component or loader
        <div
          className={`bg-gray-900 rounded-sm mt-2 mr-2 flex justify-center items-center text-${text_size}`}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <PiImageBrokenDuotone />
        </div>
      ) : (
        // if skeleton is false we render the poster
        <div className="mt-2">
          <Tooltip
            position="bottom"
            withArrow
            arrowSize={6}
            label={`${movie_title} (${year_of_release})`}
            color="#121417"
            className="font-semibold text-xs"
            style={{ color: "#d4c6c1" }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={movie_title}
              style={{ width: `${width}px`, height: `${height}px` }}
              className="rounded-sm border-2 border-transparent hover:border-orange-400 transition-all duration-300"
            />
          </Tooltip>
        </div>
      )}
    </>
  );
}
