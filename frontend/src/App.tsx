import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import NotFound from "./pages/NotFound";
import User from "./pages/User";
import Search from "./pages/Search";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/search/:film" element={<Search />} />
        <Route path="/user/:username" element={<User />} />
        <Route path="*" element={<NotFound />} /> {/* catch-all */}
      </Routes>
    </Router>
  );
}
