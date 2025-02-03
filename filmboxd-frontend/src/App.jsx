import { Link, Route, Routes } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import Home from "./pages/Home";
import Users from "./pages/Users";
import NowShowing from "./pages/NowShowing";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <MantineProvider>
        <div className="bg-gray-950 min-h-screen flex flex-col">
          {/* Navigation */}
          <nav className="text-gray-200 py-3 px-5 bg-gray-900 mb-2">
            <div className="flex justify-between items-center">
              <Link to="/">
                <h1 className="font-bold text-2xl">
                  Film<span className="text-orange-400">Boxd</span>
                </h1>
              </Link>
              <div className="flex">
                <Link to="/">
                  <h1 className="text-sm text-gray-400 mx-2 uppercase font-bold hover:text-orange-400 transition-text duration-300">
                    Home
                  </h1>
                </Link>

                {/* Temporary */}
                <Link to="/users/VIGIII">
                  <h1 className="text-sm text-gray-400 mx-2 uppercase font-bold hover:text-orange-400 transition-text duration-300">
                    Profile
                  </h1>
                </Link>
              </div>
            </div>
          </nav>

          {/* Main content */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users/:id" element={<Users />} />
              <Route path="/movies/now-showing" element={<NowShowing />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </MantineProvider>
    </>
  );
}

export default App;
