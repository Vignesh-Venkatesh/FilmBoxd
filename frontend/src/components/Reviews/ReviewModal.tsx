import { useState, useEffect } from "react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  tmdbId: string;
  username: string;
  initialReview?: string;
  initialRating?: number;
}

export default function ReviewModal({
  isOpen,
  onClose,
  tmdbId,
  username,
  initialReview = "",
  initialRating = 0,
}: ReviewModalProps) {
  const [review, setReview] = useState(initialReview);
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    if (isOpen) {
      setReview(initialReview);
      setRating(initialRating);
    }
  }, [isOpen, initialReview, initialRating]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${username}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            tmdbId,
            reviewText: review,
            rating,
          }),
        }
      );

      if (res.ok) {
        onClose(); //  close the modal
      }
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your review?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${username}/reviews`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ tmdbId }),
        }
      );

      if (res.ok) {
        onClose();
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* blurred background */}
      <div
        className="absolute inset-0  backdrop-blur-sm rounded shadow-2xl"
        onClick={onClose}
      />

      {/* modal box */}
      <div className="bg-neutral rounded-lg p-6 w-full relative z-10">
        <h2 className="text-xl font-bold mb-4">
          {initialReview ? "Edit Your Review" : "Write a Review"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="rating mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-orange-400"
                aria-label={`${star} star`}
                checked={rating === star}
                onChange={() => setRating(star)}
              />
            ))}
          </div>

          <textarea
            className="w-full h-32 p-2 rounded border border-gray-400 resize-none mb-4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            required
          />

          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            {initialReview && (
              <button
                type="button"
                className="btn btn-error"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
