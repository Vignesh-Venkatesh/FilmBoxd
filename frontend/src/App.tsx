import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Movie from "./pages/Movie";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="*" element={<NotFound />} /> {/* catch-all */}
      </Routes>
    </Router>
  );
}
