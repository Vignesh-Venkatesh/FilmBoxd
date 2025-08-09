import DevPicks from "./Misc/DevPicks";
import PopularReviewers from "./Reviews/PopularReviewers";
import SquareSmallAd from "./Advertisement/SquareSmallAd";
import RecentlyJoinedMembers from "./Misc/RecentlyJoinedMembers";

interface HomeSideBarProps {
  URL: string;
}

export default function HomeSideBar({ URL }: HomeSideBarProps) {
  return (
    <div className="w-[230px]">
      <SquareSmallAd />
      <DevPicks URL={URL} />
      {/* <PopularReviewers /> */}
      <RecentlyJoinedMembers />
    </div>
  );
}
