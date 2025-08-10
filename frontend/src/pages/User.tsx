import Navbar from "../components/Navbar";
import UserInfo from "../components/Misc/UserInfo";
import UserSideBar from "../components/UserSidebar";
import UserRecent from "../components/User/UserRecent";

export default function User() {
  return (
    <div>
      <Navbar />
      <div className="w-[950px] mx-auto py-[30px]">
        <UserInfo />

        <div className="flex mt-6 justify-between">
          <div className="flex flex-col gap-6">
            {/* recently watched */}
            <UserRecent list="watched" title="watched" />
            {/* recently favorited */}
            <UserRecent list="favorites" title="favorited" />
            {/* recently watchlisted */}
            <UserRecent list="watchlist" title="watchlisted" />
          </div>
          <UserSideBar />
        </div>
      </div>
    </div>
  );
}
