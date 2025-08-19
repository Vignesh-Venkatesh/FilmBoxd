import {
  FaRegEye,
  FaEye,
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { useState } from "react";

export default function ActionButtons() {
  const [watched, setWatched] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [watchlisted, setWatchlisted] = useState(false);

  return (
    <div className="w-[230px] bg-neutral rounded p-4">
      <div className="flex justify-around items-center">
        <div className="text-3xl cursor-pointer" onClick={handleWatched}>
          {watched ? <FaEye /> : <FaRegEye />}
        </div>
        <div className="text-2xl cursor-pointer" onClick={handleFavorited}>
          {favorited ? <FaHeart /> : <FaRegHeart />}
        </div>
        <div className="text-2xl cursor-pointer" onClick={handleWatchlisted}>
          {watchlisted ? <FaBookmark /> : <FaRegBookmark />}
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-primary w-full" disabled={!watched}>
          Write a review
        </button>
      </div>
    </div>
  );

  function handleWatched() {
    setWatched(!watched);
  }

  function handleFavorited() {
    setFavorited(!favorited);
  }

  function handleWatchlisted() {
    setWatchlisted(!watchlisted);
  }
}
