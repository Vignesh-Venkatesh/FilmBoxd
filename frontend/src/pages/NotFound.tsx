import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="font-google h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-3xl font-bold">
        Sorry, but this page doesn't exist.
      </h1>
      <Link to="/" className="flex gap-4 btn btn-primary text-xl">
        <FaHome />
        Go Home
      </Link>
    </div>
  );
}
