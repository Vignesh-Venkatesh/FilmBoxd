import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Avatar } from "@mantine/core";
import Poster from "../components/Poster";

// Icons
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaThreads } from "react-icons/fa6";
import { IoIosGlobe } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";

const poster_sizes = {
  sm: { w: 75, h: 110, text_size: "xl" },
  md: { w: 130, h: 195, text_size: "4xl" },
  lg: { w: 185, h: 275, text_size: "6xl" },
};

export default function Users() {
  const { id } = useParams();

  return (
    <div>
      <div className="text-gray-300 w-[760px] m-auto mt-5">
        {/* top bar - [avatar,username,socials], [films watched] */}
        <div className="flex items-center w-full justify-between">
          {/* Avatar, username and socials */}
          <div className="flex items-center">
            {/* Avatar */}
            <Avatar name={id} color="initials" size="xl">
              {id.charAt(0).toUpperCase()}
            </Avatar>

            {/* Name and socials */}
            <div className="ml-2">
              <Link to={`/users/${id}`}>
                {" "}
                <h1 className="font-bold text-xl">{id}</h1>
              </Link>
              {/* Socials */}
              <div className="mt-2 flex items-center">
                {/* Instagram */}
                <a href="#" target="_blank">
                  <FaInstagram className="text-gray-400 text-lg mr-4 hover:text-orange-400 transition-text duration-300" />
                </a>
                {/* Threads */}
                <a href="#" target="_blank">
                  <FaThreads className="text-gray-400 text-lg mr-4 hover:text-orange-400 transition-text duration-300" />
                </a>
                {/* X.com - former twitter :( */}
                <a href="#" target="_blank">
                  <FaXTwitter className="text-gray-400 text-lg mr-4 hover:text-orange-400 transition-text duration-300" />
                </a>
                {/* Website */}
                <a href="#" target="_blank">
                  <IoIosGlobe className="text-gray-400 text-xl mr-4 hover:text-orange-400 transition-text duration-300" />
                </a>
                {/* Youtube */}
                <a href="#" target="_blank">
                  <FaYoutube className="text-gray-400 text-xl mr-4 hover:text-orange-400 transition-text duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Number of films */}
          <div className="flex text-gray-400">
            {/* Total Films Watched */}
            <div className="text-center">
              <h1 className="text-orange-400 font-bold text-2xl">243</h1>
              <h1 className="uppercase font-thin text-xs">Films</h1>
            </div>
            {/* Separator */}
            <div className="w-[1px] mx-2 bg-gray-700"></div>
            {/* Total Films Watched this year*/}
            <div className="text-center">
              <h1 className="text-orange-400 font-bold text-2xl">10</h1>
              <h1 className="uppercase font-thin text-xs">This year</h1>
            </div>
          </div>
        </div>

        {/* mid section */}
        <div className="flex mt-4 text-gray-500">
          {/* first 3/4th section */}
          <div className="w-3/4 pr-4">
            {/* Favorite films */}
            <div>
              <div className="flex justify-between items-end">
                <h1 className="uppercase font-bold text-sm">Favorite Films</h1>
                <h1 className="uppercase text-xs hover:text-orange-400 cursor-pointer transition-all duration-300">
                  more
                </h1>
              </div>
              <hr className="opacity-25" />
              {/* films itself */}
              <div className="flex">
                <Poster
                  skeleton={true}
                  width={poster_sizes.md.w}
                  height={poster_sizes.md.h}
                  text_size={poster_sizes.md.text_size}
                ></Poster>
                <Poster
                  skeleton={true}
                  width={poster_sizes.md.w}
                  height={poster_sizes.md.h}
                  text_size={poster_sizes.md.text_size}
                ></Poster>
                <Poster
                  skeleton={true}
                  width={poster_sizes.md.w}
                  height={poster_sizes.md.h}
                  text_size={poster_sizes.md.text_size}
                ></Poster>
                <Poster
                  skeleton={true}
                  width={poster_sizes.md.w}
                  height={poster_sizes.md.h}
                  text_size={poster_sizes.md.text_size}
                ></Poster>
              </div>
            </div>

            {/* Recently Watched films */}
            <div className="mt-3">
              <div className="flex justify-between items-end">
                <h1 className="uppercase font-bold text-sm">
                  Recently Watched
                </h1>
                <h1 className="uppercase text-xs hover:text-orange-400 cursor-pointer transition-all duration-300">
                  more
                </h1>
              </div>
              <hr className="opacity-25" />
              {/* films itself */}
              <div className="flex">
                <Poster
                  skeleton={true}
                  width={poster_sizes.md.w}
                  height={poster_sizes.md.h}
                  text_size={poster_sizes.md.text_size}
                ></Poster>
                <Poster
                  skeleton={true}
                  width={poster_sizes.md.w}
                  height={poster_sizes.md.h}
                  text_size={poster_sizes.md.text_size}
                ></Poster>
                <Poster
                  skeleton={true}
                  width={poster_sizes.md.w}
                  height={poster_sizes.md.h}
                  text_size={poster_sizes.md.text_size}
                ></Poster>
                <Poster
                  skeleton={true}
                  width={poster_sizes.md.w}
                  height={poster_sizes.md.h}
                  text_size={poster_sizes.md.text_size}
                ></Poster>
              </div>
            </div>
          </div>

          {/* last 1/4th section */}
          <div className="w-1/4 pl-4">
            {/* Bio section */}
            <div>
              <h1 className="text-sm uppercase font-bold">Bio</h1>
              <hr className="opacity-25" />
              <p className="text-gray-400 text-xs mt-2">
                Currently lost in a film galaxy where every movie is a new
                adventure. Sometimes I come back for seconds (and thirds) if I
                really love a film. 🌠
              </p>
            </div>
            {/* films itself */}
            <div className="flex flex-wrap">
              <Poster
                skeleton={true}
                width={poster_sizes.sm.w}
                height={poster_sizes.sm.h}
                text_size={poster_sizes.sm.text_size}
              ></Poster>
              <Poster
                skeleton={true}
                width={poster_sizes.sm.w}
                height={poster_sizes.sm.h}
                text_size={poster_sizes.sm.text_size}
              ></Poster>
              <Poster
                skeleton={true}
                width={poster_sizes.sm.w}
                height={poster_sizes.sm.h}
                text_size={poster_sizes.sm.text_size}
              ></Poster>
              <Poster
                skeleton={true}
                width={poster_sizes.sm.w}
                height={poster_sizes.sm.h}
                text_size={poster_sizes.sm.text_size}
              ></Poster>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
