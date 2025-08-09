import Navbar from "../components/Navbar";
import UserInfo from "../components/Misc/UserInfo";
import UserSideBar from "../components/UserSidebar";
import UserWatched from "../components/User/UserWatched";

export default function User() {
  return (
    <div>
      <Navbar />
      <div className="w-[950px] mx-auto py-[30px]">
        <UserInfo />

        <div className="flex mt-6 justify-between">
          <UserWatched />
          <UserSideBar />
        </div>
      </div>
    </div>
  );
}
