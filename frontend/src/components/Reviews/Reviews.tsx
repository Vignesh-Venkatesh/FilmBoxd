import { useEffect, useState } from "react";
import type { Review } from "../../types";
import Rating from "./Rating";
import Title from "../Misc/Title";
import LoadingList from "../Loading/LoadingList";
import SmallPoster from "../Poster/SmallPoster";

type ReviewsProps = {
  tmdbId?: string;
};

const URL: string = import.meta.env.VITE_API_URL;

export default function Reviews({ tmdbId }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        let fetch_url = `${URL}/movies/reviews?page=1`;
        if (tmdbId) {
          fetch_url += `&tmdbId=${tmdbId}`;
        }

        const res = await fetch(fetch_url);
        if (!res.ok) {
          throw new Error(`Error fetching reviews: ${res.status}`);
        }

        const data = await res.json();
        setReviews(data.data);
      } catch (err: any) {
        setError(err.message || "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [tmdbId]);

  if (loading)
    return (
      <div className="mt-15">
        <Title title="latest reviews" />
        <LoadingList quantity={1} width="950px" height="150px" columns={1} />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-15">
      <Title title="latest reviews" />

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="my-4 hover:bg-neutral p-4 transition-colors duration-300 rounded border-2 border-transparent hover:border-green-500"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-5">
                  <SmallPoster
                    movie_id={review.tmdb_id}
                    movie_title={review.title}
                    poster_path={review.poster_path}
                  />

                  <div className="flex flex-col justify-center gap-2">
                    <h1 className="text-3xl font-bold font-cormorant">
                      {review.title}
                    </h1>

                    {/* user avatar */}
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={`${review.image}`} alt="" />
                      </div>
                      {/* reviewer and rating */}
                      <p className="ml-2">
                        <p>{review.name}</p>
                        <Rating value={review.rating} />
                      </p>
                    </div>
                  </div>
                </div>

                {/* review creationg */}
                <p className="italic text-sm">
                  {review.created_at.slice(0, 10)}
                  {/* {review.like_count} likes */}
                </p>
              </div>
              {/* review */}
              <p className="mt-5">{review.review_text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
