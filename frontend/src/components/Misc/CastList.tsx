import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingCast from "../Loading/LoadingCast";

const URL: string = import.meta.env.VITE_API_URL;

export default function CastList() {
  const { id } = useParams();
  const [cast, setCast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchCast() {
      try {
        const res = await fetch(`${URL}/movies/cast/${id}`);
        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Unknown error");

        setCast(json.msg);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [id]);

  return (
    <div className="mt-10">
      <h1 className="uppercase font-google underline underline-offset-6 font-semibold">
        Cast
      </h1>

      {loading && <LoadingCast />}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-wrap text-sm gap-x-1 gap-y-3 mt-4">
        {cast.map((actor) => (
          <div
            key={actor.id}
            className="text-center tooltip tooltip-bottom cursor-default"
          >
            <span className="py-1 px-2 bg-neutral rounded">{actor.name}</span>
            <p className="text-sm text-gray-300 bg-base-200 tooltip-content">
              {actor.character ? `as ${actor.character}` : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
