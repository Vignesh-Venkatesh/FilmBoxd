import SquareSmallAd from "./Advertisement/SquareSmallAd";
import SimilarFilms from "../components/Misc/SimilarFilms";

export default function UserSideBar() {
  return (
    <div className="w-[230px]">
      <SquareSmallAd />
      <SimilarFilms />
    </div>
  );
}
