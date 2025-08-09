import DevPicks from "./Misc/DevPicks";
import PopularReviewers from "./Reviews/PopularReviewers";
import SquareSmallAd from "./Advertisement/SquareSmallAd";

interface HomeSideBarProps {
  URL: string;
}

export default function HomeSideBar({ URL }: HomeSideBarProps) {
  return (
    <div className="w-[230px]">
      <DevPicks URL={URL} />
      <PopularReviewers />
      <SquareSmallAd />
    </div>
  );
}
